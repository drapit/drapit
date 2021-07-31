import "reflect-metadata";
import BaseController from "controllers/BaseController";
import { RouteDefinition } from "decorators/RouteDefinition";
import { Router, Request, Response } from "express";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import ControllerAction from "./ControllerAction";

export default class APIRouter {
  private path: string;
  private router: Router;
  private controller: typeof BaseController;
  private instance: BaseController;

  public constructor(controller: typeof BaseController, router: Router) {
    this.controller = controller;
    this.instance = new controller();
    this.path = Reflect.getMetadata("prefix", controller);
    this.router = Router();

    router.use(this.sanitize(this.path), this.router);
  }

  public route(): void {
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      "routes",
      this.controller
    );

    routes.forEach((route) => {
      const path = this.sanitize(route.path);

      switch (route.requestMethod) {
        case "get":
          this.router.get(
            path,
            handler(
              (this.instance as any)[route.actionName] as ControllerAction
            )
          );
          break;
        case "post":
          this.router.post(
            path,
            handler(
              (this.instance as any)[route.actionName] as ControllerAction
            )
          );
          break;
        case "patch":
          this.router.patch(
            path,
            handler(
              (this.instance as any)[route.actionName] as ControllerAction
            )
          );
          break;
        case "put":
          this.router.put(
            path,
            handler(
              (this.instance as any)[route.actionName] as ControllerAction
            )
          );
          break;
        case "delete":
          this.router.delete(
            path,
            handler(
              (this.instance as any)[route.actionName] as ControllerAction
            )
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
  (action: ControllerAction) => async (req: Request, res: Response) => {
    try {
      const params = { ...req.query, ...req.body };
      const response = await action(params /*, req.User */);

      return res.status(response.status).json(response);
    } catch (e) {
      const response = HttpResponse.internalError(e.message);

      return res.status(response.status).json(response);
    }
  };
