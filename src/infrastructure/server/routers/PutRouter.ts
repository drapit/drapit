import "reflect-metadata";
import { RouteDefinition } from "infrastructure/openapi/decorators";
import RouteHelper from "infrastructure/helpers/Route";
import PathRouter from "./PathRouter";
import IRoute from "./IRoute";
import RequestHandlerWrapper from "./RequestHandlerWrapper";

export default class PutRouter extends PathRouter implements IRoute {
  public route(route: RouteDefinition): void {
    const path = RouteHelper.sanitize(`${route.path}`);
    const handler = new RequestHandlerWrapper();

    this.router.put(
      path,
      handler.handle(this.instance[route.name], route)
    );
  }
}
