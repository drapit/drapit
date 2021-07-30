import express, { Response, Request, Router } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import Logger from "application/services/Logger";
import ISetup from "infrastructure/ISetup";
import HomeRouter from "infrastructure/server/routers/HomeRouter";

export default class Server implements ISetup {
  public setup(): void {
    const { API_PAYLOAD_MAX_SIZE, API_PORT } = process.env;

    const app = express();
    const port = API_PORT;
    const router = Router();

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
    // TODO: Think about API versioning
    app.use("/api/v1", router);

    app.get("/", (_: Request, res: Response) => {
      res.redirect("/api/v1");
    });

    this.mount(router);

    app.listen(port, () => {
      Logger.verbose(`Example app listening at http://localhost:${port}`);
    });

  }

  private mount(router: Router): void {
    // Instantiate your routers here.
    new HomeRouter(router);
  }
}
