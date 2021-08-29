import "reflect-metadata";
import { RouteDefinition } from ".framework/api/definitions";
import RouteHelper from "../helpers/Route";
import PathRouter from "./PathRouter";
import IRoute from "./IRoute";
import RequestHandlerWrapper from "./RequestHandlerWrapper";

/**
 * Routes PUT requests.
 *
 * @export
 * @class PutRouter
 * @extends {PathRouter}
 * @implements {IRoute}
 */
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
