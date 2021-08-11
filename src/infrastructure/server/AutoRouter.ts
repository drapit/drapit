import "reflect-metadata";
import {
  Constructor,
  HttpMethods,
  RouteDefinition,
} from "infrastructure/openapi/decorators";
import { Router } from "express";
import RouteHelper from "infrastructure/helpers/Route";
import IRoute from "./routers/IRoute";
import GetRouter from "./routers/GetRouter";
import PostRouter from "./routers/PostRouter";
import PatchRouter from "./routers/PatchRouter";
import PutRouter from "./routers/PutRouter";
import DeleteRouter from "./routers/DeleteRouter";

/**
 * This mount routes automatically.
 * It uses the metadata provided by the routing decorators. 
 *
 * @export
 * @class AutoRouter
 */
export default class AutoRouter {
  private path: string;
  private router: Router;
  private Controller: Constructor;

  /**
   * Creates an instance of AutoRouter.
   * @param {Constructor} Controller
   * @param {Router} router
   * @memberof AutoRouter
   */
  public constructor(Controller: Constructor, router: Router) {
    this.Controller = Controller;
    this.path = Reflect.getMetadata("prefix", Controller);
    this.router = Router();

    router.use(RouteHelper.sanitize(this.path), this.router);
  }

  /**
   * Mounts all routes for a controller.
   *
   * @memberof AutoRouter
   */
  public route(): void {
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      "routes",
      this.Controller
    );

    routes.forEach((route) => {
      Logger.verbose(route);

      this.getRouter(route.requestMethod).route(route);
    });
  }

  /**
   * Gets the proper router depending on the http method.
   *
   * @private
   * @param {HttpMethods} [method]
   * @return {*}  {IRoute}
   * @memberof AutoRouter
   */
  private getRouter(method?: HttpMethods): IRoute {
    switch (method) {
      case HttpMethods.get:
        return new GetRouter(this.Controller, this.router);
      case HttpMethods.post:
        return new PostRouter(this.Controller, this.router);
      case HttpMethods.patch:
        return new PatchRouter(this.Controller, this.router);
      case HttpMethods.put:
        return new PutRouter(this.Controller, this.router);
      case HttpMethods.delete:
        return new DeleteRouter(this.Controller, this.router);
      default:
        throw "Http method not supported";
    }
  }
}
