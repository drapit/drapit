import express, { Response, Request, Router, Application } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import lusca from "lusca";
import ISetup from "infrastructure/ISetup";
import AutoRouter from "infrastructure/server/AutoRouter";
import fs from "fs";
import path from "path";
import glob from "glob";
import swaggerUi from "swagger-ui-express";
import * as config from "config";

// TODO: move this type to a different file.
type VersionMetadata = {
  number: string;
  docs: object;
  controllers: string[];
};

/**
 * This class sets up and un the express server.
 *
 * @export
 * @class Server
 * @implements {ISetup}
 */
export default class Server implements ISetup {
  /**
   * Directory where api versions live.
   *
   * @private
   * @static
   * @type {string}
   * @memberof Server
   */
  private static readonly API_DIR: string = config.directories.api;

  /**
   * Directory where the swagger documentation files live.
   *
   * @private
   * @static
   * @type {string}
   * @memberof Server
   */
  private static readonly SWAGGER_DIR: string = config.directories.swagger;

  /**
   * Regex that matches the version number.
   *
   * @private
   * @static
   * @memberof Server
   */
  private static readonly NAME_CONVENTION_REGEX = /v[.0-9]+/; // matches: v1, v1.2, v.2.3.4

  /**
   * Express application.
   *
   * @private
   * @type {Application}
   * @memberof Server
   */
  private app: Application;

  /**
   * Information about the versions of the API.
   *
   * @private
   * @type {VersionMetadata[]}
   * @memberof Server
   */
  private versions: VersionMetadata[];

  /**
   * Creates an instance of Server.
   * @memberof Server
   */
  public constructor() {
    this.app = express();
    this.versions = this.getVersions();
  }

  /**
   * Sets up and run the express server.
   *
   * @memberof Server
   */
  public setup(): void {
    this.app.disable("x-powered-by");

    this.setupCors();
    this.setupSecurityMiddleWares();
    this.setupParsers();
    this.setupCompression();
    this.setupAPI();
    this.setupSwaggerUI();
    this.run();
  }

  /**
   * Get versions with their documentation and the path to the controllers.
   *
   * @private
   * @return {*}  {VersionMetadata[]}
   * @memberof Server
   */
  private getVersions(): VersionMetadata[] {
    return glob
      .sync(`${Server.API_DIR}/v*`)
      .filter((filepath: string) => this.isVersionDirectory(filepath))
      .map((versionDir: string) => {
        const version = this.getVersionNumber(versionDir);
        const controllersDir = `${versionDir}/controllers`;

        return {
          number: version,
          docs: require(`${Server.SWAGGER_DIR}/swagger.${version}.json`),
          controllers: fs
            .readdirSync(controllersDir)
            .map((filename: string) => `${controllersDir}/${filename}`)
            .filter((filepath) => !this.isDirectory(filepath)),
        };
      });
  }

  /**
   * Checks whether the path is a version directory. 
   *
   * @private
   * @param {string} filepath
   * @return {*}  {boolean}
   * @memberof Server
   */
  private isVersionDirectory(filepath: string): boolean {
    return this.isDirectory(filepath) && this.isWellNamed(filepath);
  }

  /**
   * Checks whether the path has proper name for a api version.
   *
   * @private
   * @param {string} filepath
   * @return {*}  {boolean}
   * @memberof Server
   */
  private isWellNamed(filepath: string): boolean {
    return Server.NAME_CONVENTION_REGEX.test(filepath);
  }

  /**
   * Checks whether path is a directory.
   *
   * @private
   * @param {string} filepath
   * @return {*}  {boolean}
   * @memberof Server
   */
  private isDirectory(filepath: string): boolean {
    return fs.lstatSync(path.resolve(filepath)).isDirectory();
  }

  /**
   * Extracts version number from directory path.
   *
   * @private
   * @param {string} versionDir
   * @return {*}  {string}
   * @memberof Server
   */
  private getVersionNumber(versionDir: string): string {
    const match = versionDir.match(Server.NAME_CONVENTION_REGEX);

    if (match == null) {
      throw new Error("API version directory not following naming conventing");
    }

    return match[0];
  }

  /**
   * Sets up CORS for express.
   *
   * @private
   * @memberof Server
   */
  private setupCors(): void {
    this.app.use(cors());
  }

  /**
   * Sets up security middlewares for xframe and xss.
   *
   * @private
   * @memberof Server
   */
  private setupSecurityMiddleWares(): void {
    this.app.use(lusca.xframe("SAMEORIGIN"));
    this.app.use(lusca.xssProtection(true));
  }

  /**
   * Sets up parsers for cookies, url encoded body and json body.
   *
   * @private
   * @memberof Server
   */
  private setupParsers(): void {
    this.app.use(cookieParser());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: config.api.payloadSize,
      })
    );
    this.app.use(
      bodyParser.json({
        limit: config.api.payloadSize,
      })
    );
  }

  /**
   * Sets up response compression.
   *
   * @private
   * @memberof Server
   */
  private setupCompression(): void {
    this.app.use(
      compression({
        filter: (req: Request, res: Response): boolean => {
          if (req.headers["x-no-compression"]) return false;

          return compression.filter(req, res);
        },
      })
    );
  }

  /**
   * Sets up all versions of the API.
   *
   * @private
   * @memberof Server
   */
  private setupAPI(): void {
    for (const version of this.versions) {
      const router = Router().get("/docs", (_: Request, res: Response) =>
        res.status(200).json(version.docs)
      );

      this.app.use(`/api/${version.number}`, router);

      for (const controller of version.controllers) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        new AutoRouter(require(controller).default, router).route();
      }
    }
  }

  /**
   * Sets up swagger UI.
   *
   * @private
   * @memberof Server
   */
  private setupSwaggerUI(): void {
    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        explorer: true,
        swaggerOptions: {
          urls: this.versions.map((version) => ({
            url: `/api/${version.number}/docs`,
            name: `${version.number} Specification`,
          })),
        },
      })
    );

    // TODO: Make this redirect configurable
    this.app.get("/", (_: Request, res: Response) => {
      res.redirect("/api/docs");
    });
  }

  /**
   * Runs the api in the configured port.
   *
   * @private
   * @memberof Server
   */
  private run(): void {
    this.app.listen(config.api.port, () => {
      Logger.info(
        `${config.api.name} listening at http://localhost:${config.api.port}`
      );
    });
  }
}
