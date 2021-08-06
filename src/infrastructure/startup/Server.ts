import express, { Response, Request, Router, Application } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import lusca from "lusca";
import ISetup from "infrastructure/ISetup";
import APIRouter from "infrastructure/server/routers/APIRouter";
import fs from "fs";
import path from "path";
import glob from "glob";
import OpenApiGenerator from "infrastructure/server/openapi/OpenApiGenerator";
import { OpenApiBuilder } from "openapi3-ts";
import swaggerUi from "swagger-ui-express";
import * as config from "config";

export default class Server implements ISetup {
  public setup(): void {
    const app = express();

    app.disable("x-powered-by");
    app.use(cors());
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: config.api.payloadSize,
      })
    );
    app.use(cookieParser());
    app.use(
      bodyParser.json({
        limit: config.api.payloadSize,
      })
    );
    app.use(
      compression({
        filter: (req: Request, res: Response): boolean => {
          if (req.headers["x-no-compression"]) return false;

          return compression.filter(req, res);
        },
      })
    );

    this.loadVersions(app);

    // TODO: Make this redirect configurable
    app.get("/", (_: Request, res: Response) => {
      res.redirect("/api/v1");
    });

    app.listen(config.api.port, () => {
      Logger.info(
        `Example app listening at http://localhost:${config.api.port}`
      );
    });
  }

  private loadVersions(app: Application) {
    const directory = path.join(__dirname, "../../controllers");

    const versions: string[] = [];
    glob.sync(`${directory}/v*`).forEach((directoryPath: string) => {
      if (!fs.lstatSync(path.resolve(directoryPath)).isDirectory()) return;
      const directories = directoryPath.split("/");
      const version = directories[directories.length - 1];
      versions.push(version);
      const router = Router();
      app.use(`/api/${version}`, router);

      // TODO: add server info
      const documentation = new OpenApiBuilder();
      documentation.addTitle(config.api.name);
      documentation.addVersion(version);
      documentation.addContact({
        name: config.maintainer.name,
        email: config.maintainer.email,
        url: config.maintainer.url,
      });

      documentation.addServer({
        url: `/api/${version}`,
        description: 'Current environment'
      });

      this.mountControllers(directoryPath, router, documentation);
    });

    app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        explorer: true,
        swaggerOptions: {
          urls: versions.map((version) => ({
            url: `/api/${version}/docs`,
            name: `${version} Spec`,
          })),
        },
      })
    );
  }

  private mountControllers(
    directoryPath: string,
    api: Router,
    documentation: OpenApiBuilder
  ): void {
    fs.readdirSync(directoryPath).forEach((fileName: string) => {
      const fullPath = `${directoryPath}/${fileName}`;

      if (fs.lstatSync(fullPath).isDirectory()) return;

      new APIRouter(this.import(fullPath), api).route();
      new OpenApiGenerator(this.import(fullPath), documentation).generate();

      api.get("/docs", (_: Request, res: Response) => {
        return res.status(200).json(documentation.getSpec());
      });
    });
  }

  private import(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(path).default;
  }
}
