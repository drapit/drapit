import "reflect-metadata";
import { RouteDefinition } from "infrastructure/openapi/decorators";
import RouteHelper from "infrastructure/helpers/Route";
import PathRouter from "./PathRouter";
import IRoute from "./IRoute";
import RequestHandlerWrapper from "./RequestHandlerWrapper";

/**
 * Routes PATCH requests.
 *
 * @export
 * @class PatchRouter
 * @extends {PathRouter}
 * @implements {IRoute}
 */
export default class PatchRouter extends PathRouter implements IRoute {
  public route(route: RouteDefinition): void {
    const path = RouteHelper.sanitize(`${route.path}`);
    const handler = new RequestHandlerWrapper();

    this.router.patch(
      path,
      handler.handle(this.instance[route.name], route)
    );
  }
}
