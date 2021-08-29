import "reflect-metadata";
import { RouteDefinition } from ".framework/api/definitions";

/**
 * Interface of request routers.
 *
 * @export
 * @interface IRoute
 */
export default interface IRoute {
  /**
   * Routes a request with right Http method.
   *
   * @param {RouteDefinition} route
   * @memberof IRoute
   */
  route(route: RouteDefinition): void;
}
