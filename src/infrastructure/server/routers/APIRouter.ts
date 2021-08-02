import "reflect-metadata";
import BaseController from "controllers/BaseController";
import { RouteDefinition } from "controllers/decorators/RouteDefinition";
import { Router, Request, Response } from "express";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import ControllerAction from "./ControllerAction";

export default class APIRouter {
  private path: string;
  private router: Router;
  private Controller: typeof BaseController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private instance: any;

  public constructor(Controller: typeof BaseController, router: Router) {
    this.Controller = Controller;
    this.instance = new Controller();
    this.path = Reflect.getMetadata("prefix", Controller);
    this.router = Router();

    router.use(this.sanitize(this.path), this.router);
  }

  public route(): void {
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      "routes",
      this.Controller
    );

    routes.forEach((route) => {
      const path = this.sanitize(`${route.path}`);
      Logger.debug(route);

      switch (route.requestMethod) {
        case "get":
          this.router.get(
            path,
            handler(this.instance[route.actionName], route)
          );
          break;
        case "post":
          this.router.post(
            path,
            handler(this.instance[route.actionName], route)
          );
          break;
        case "patch":
          this.router.patch(
            path,
            handler(this.instance[route.actionName], route)
          );
          break;
        case "put":
          this.router.put(
            path,
            handler(this.instance[route.actionName], route)
          );
          break;
        case "delete":
          this.router.delete(
            path,
            handler(this.instance[route.actionName], route)
          );
          break;
        default:
          throw "Http method not supported";
          break;
      }
    });
  }

  private sanitize(path: string) {
    path = this.addBeginningSlash(path);
    path = this.removeTrailingSlash(path);

    return path;
  }

  private removeTrailingSlash(value: string): string {
    if (value.lastIndexOf("/") === value.length - 1) {
      return value.substring(0, value.length - 1);
    }

    return value;
  }

  private addBeginningSlash(value: string): string {
    if (value[0] !== "/") {
      return `/${value}`;
    }

    return value;
  }
}

const handler =
  (action: ControllerAction, route: RouteDefinition) =>
  async (req: Request, res: Response) => {
    try {
      const params = (route.parameters || []).map(({ in: from, Type }) => {
        switch (from) {
          case "query":
            return new Type(req.query || {});
          case "path":
            return new Type(req.params || {});
          case "body":
          default:
            return new Type(req.body || {});
        }
      });
      const response = await action(...params /*, req.User */);

      return res.status(response.status).json(response);
    } catch (e) {
      const response = HttpResponse.internalError(e.message);

      return res.status(response.status).json(response);
    }
  };
