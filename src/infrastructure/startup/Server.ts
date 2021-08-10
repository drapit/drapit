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

export default class Server implements ISetup {
  private static readonly API_DIR: string = config.directories.api;
  private static readonly SWAGGER_DIR: string = config.directories.swagger;

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
      res.redirect("/api/docs");
    });

    app.listen(config.api.port, () => {
      Logger.info(
        `Example app listening at http://localhost:${config.api.port}`
      );
    });
  }

  private loadVersions(app: Application) {
    const versions: string[] = [];

    glob.sync(`${Server.API_DIR}/v*`).forEach((versionDir: string) => {
      if (!fs.lstatSync(path.resolve(versionDir)).isDirectory()) return;
      const controllersDir = `${versionDir}/controllers`;
      const router = Router();
      const version = this.getVersion(versionDir);

      versions.push(version);
      app.use(`/api/${version}`, router);

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const docs = require(`${Server.SWAGGER_DIR}/swagger.${version}.json`);
      
      router.get("/docs", (_: Request, res: Response) => {
        return res.status(200).json(docs);
      });

      fs.readdirSync(controllersDir).forEach((fileName: string) => {
        const fullPath = `${controllersDir}/${fileName}`;
  
        if (fs.lstatSync(fullPath).isDirectory()) return;
  
        new AutoRouter(this.import(fullPath), router).route();
      });
    });

    app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        explorer: true,
        swaggerOptions: {
          urls: versions.map((version) => ({
            url: `/api/${version}/docs`,
            name: `${version} Specification`,
          })),
        },
      })
    );
  }

  private getVersion(directoryPath: string): string {
    const directories = directoryPath.split("/");

    return directories[directories.length - 1];
  }

  private import(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(path).default;
  }
}
