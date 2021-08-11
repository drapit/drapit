import "reflect-metadata";
import { RouteDefinition } from "infrastructure/openapi/decorators";
import RouteHelper from "infrastructure/helpers/Route";
import PathRouter from "./PathRouter";
import IRoute from "./IRoute";
import RequestHandlerWrapper from "./RequestHandlerWrapper";

/**
 * Routes DELETE requests.
 *
 * @export
 * @class DeleteRouter
 * @extends {PathRouter}
 * @implements {IRoute}
 */
export default class DeleteRouter extends PathRouter implements IRoute {
  public route(route: RouteDefinition): void {
    const path = RouteHelper.sanitize(`${route.path}`);
    const handler = new RequestHandlerWrapper();

    this.router.delete(
      path,
      handler.handle(this.instance[route.name], route)
    );
  }
}
