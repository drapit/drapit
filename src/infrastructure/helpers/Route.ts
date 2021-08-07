export default class RouteHelper {
  public static sanitize(route = ""): string {
    if (route.lastIndexOf("/") === route.length - 1) {
      route = route.substring(0, route.length - 1);
    }

    if (route[0] !== "/") {
      route = `/${route}`;
    }

    return route;
  }
}
