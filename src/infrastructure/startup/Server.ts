import express, { Response, Request, Router, Application } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import ISetup from "infrastructure/ISetup";
import APIRouter from "infrastructure/server/routers/APIRouter";
import fs from "fs";
import path from "path";
import glob from "glob";
import OpenApiGenerator from "infrastructure/server/openapi/OpenApiGenerator";
import { OpenApiBuilder } from 'openapi3-ts';
import * as config from 'config';

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
      Logger.info(`Example app listening at http://localhost:${config.api.port}`);
    });
  }

  private loadVersions(app: Application) {
    const directory = path.join(__dirname, "../../controllers");

    glob.sync(`${directory}/v*`).forEach((directoryPath: string) => {
      if (!fs.lstatSync(path.resolve(directoryPath)).isDirectory()) return;
      const directories = directoryPath.split("/");
      const version = directories[directories.length - 1];
      const router = Router();
      app.use(`/api/${version}`, router);

      const documentation = new OpenApiBuilder();
      documentation.addTitle(config.api.name);
      documentation.addVersion(version);
      documentation.addContact({
        name: config.maintainer.name,
        email: config.maintainer.email,
        url: config.maintainer.url,
      });

      this.mountControllers(directoryPath, router, documentation);
    });
  }

  private mountControllers(directoryPath: string, api: Router, documentation: OpenApiBuilder): void {
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
