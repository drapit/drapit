/**
 * Methods to help with routing logic.
 *
 * @export
 * @class RouteHelper
 */
export default class RouteHelper {
  /**
   * Makes sure a route path has no conflicting slashes.
   *
   * @static
   * @param {string} [route=""]
   * @return {*}  {string}
   * @memberof RouteHelper
   */
  public static sanitize(route = ""): string {
    // Remove trailing "/".
    if (route.lastIndexOf("/") === route.length - 1) {
      route = route.substring(0, route.length - 1);
    }

    // Adds beginning "/" 
    if (route[0] !== "/") {
      route = `/${route}`;
    }

    return route;
  }
}
