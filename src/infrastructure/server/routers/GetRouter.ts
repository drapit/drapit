import "reflect-metadata";
import { RouteDefinition } from "controllers/decorators/Types";
import RouteHelper from "infrastructure/helpers/Route";
import PathRouter from "./PathRouter";
import IRoute from "./IRoute";
import RequestHandlerWrapper from "./RequestHandlerWrapper";

export default class GetRouter extends PathRouter implements IRoute {
  public route(route: RouteDefinition): void {
    const path = RouteHelper.sanitize(`${route.path}`);
    const handler = new RequestHandlerWrapper();

    this.router.get(
      path,
      handler.handle(this.instance[route.name], route)
    );
  }
}
