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

type VersionMetadata = {
  name: string;
  docs: object;
  controllers: string[];
};

export default class Server implements ISetup {
  private static readonly API_DIR: string = config.directories.api;
  private static readonly SWAGGER_DIR: string = config.directories.swagger;
  private static readonly NAME_CONVENTION_REGEX = /v[.0-9]+/; // matches: v1, v1.2, v.2.3.4

  private app: Application;
  private versions: VersionMetadata[];

  public constructor() {
    this.app = express();
    this.versions = this.getVersions();
  }

  public setup(): void {
    this.app.disable("x-powered-by");

    this.setUpCors();
    this.setUpSecurityMiddleWare();
    this.setUpParsers();
    this.setUpCompression();
    this.mountVersions();
    this.mountDocs();
    this.run();
  }

  private getVersions(): VersionMetadata[] {
    return glob
      .sync(`${Server.API_DIR}/v*`)
      .filter((filepath: string) => this.isVersionDirectory(filepath))
      .map((versionDir: string) => {
        const version = this.getVersionName(versionDir);
        const controllersDir = `${versionDir}/controllers`;

        return {
          name: version,
          docs: require(`${Server.SWAGGER_DIR}/swagger.${version}.json`),
          controllers: fs
            .readdirSync(controllersDir)
            .map((filename: string) => `${controllersDir}/${filename}`)
            .filter((filepath) => !this.isDirectory(filepath)),
        };
      });
  }

  private isVersionDirectory(filepath: string): boolean {
    return this.isDirectory(filepath) && this.isWellNamed(filepath);
  }

  private isWellNamed(filepath: string): boolean {
    return Server.NAME_CONVENTION_REGEX.test(filepath);
  }

  private isDirectory(filepath: string): boolean {
    return fs.lstatSync(path.resolve(filepath)).isDirectory();
  }

  private getVersionName(versionDir: string): string {
    const regex = /v[.0-9]+/;
    const match = versionDir.match(regex);

    if (match == null) {
      throw new Error("API version directory not following naming conventing");
    }

    return match[0];
  }

  private setUpCors(): void {
    this.app.use(cors());
  }

  private setUpSecurityMiddleWare(): void {
    this.app.use(lusca.xframe("SAMEORIGIN"));
    this.app.use(lusca.xssProtection(true));
  }

  private setUpParsers(): void {
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

  private setUpCompression(): void {
    this.app.use(
      compression({
        filter: (req: Request, res: Response): boolean => {
          if (req.headers["x-no-compression"]) return false;

          return compression.filter(req, res);
        },
      })
    );
  }

  private mountVersions(): void {
    for (const version of this.versions) {
      const router = Router().get("/docs", (_: Request, res: Response) =>
        res.status(200).json(version.docs)
      );

      this.app.use(`/api/${version.name}`, router);

      for (const controller of version.controllers) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        new AutoRouter(require(controller).default, router).route();
      }
    }
  }

  private mountDocs(): void {
    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        explorer: true,
        swaggerOptions: {
          urls: this.versions.map((version) => ({
            url: `/api/${version.name}/docs`,
            name: `${version.name} Specification`,
          })),
        },
      })
    );

    // TODO: Make this redirect configurable
    this.app.get("/", (_: Request, res: Response) => {
      res.redirect("/api/docs");
    });
  }

  private run(): void {
    this.app.listen(config.api.port, () => {
      Logger.info(
        `Example app listening at http://localhost:${config.api.port}`
      );
    });
  }
}
