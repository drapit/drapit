import express, { Response, Request, Router, Application } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import Logger from "application/services/Logger";
import ISetup from "infrastructure/ISetup";
import APIRouter from "infrastructure/server/routers/APIRouter";
import fs from "fs";
import path from "path";
import glob from "glob";

const { API_PAYLOAD_MAX_SIZE, API_PORT } = process.env;

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
        limit: API_PAYLOAD_MAX_SIZE,
      })
    );
    app.use(
      bodyParser.json({
        limit: API_PAYLOAD_MAX_SIZE,
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

    app.get("/", (_: Request, res: Response) => {
      res.redirect("/api/v1");
    });

    app.listen(API_PORT, () => {
      Logger.verbose(`Example app listening at http://localhost:${API_PORT}`);
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

      this.mountControllers(directoryPath, router);
    });
  }

  private mountControllers(directoryPath: string, api: Router): void {
    fs.readdirSync(directoryPath).forEach((fileName: string) => {
      const fullPath = `${directoryPath}/${fileName}`;

      if (fs.lstatSync(fullPath).isDirectory()) return;

      new APIRouter(this.import(fullPath), api).route();
    });
  }

  private import(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(path).default;
  }
}
