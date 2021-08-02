import { AllowedHttpMethod, RouteDefinition } from "./RouteDefinition";

// TODO: automate testing
const Route = (path: string, httpMethod: AllowedHttpMethod): MethodDecorator => {
  return (target, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor
    ) as Array<RouteDefinition>;


    const index = routes.findIndex(route => route.actionName === propertyKey); 
    if (index != -1) {
      routes[index].requestMethod = httpMethod,
      routes[index].path = path;
      routes[index].actionName = propertyKey.toString();
    } else {
      routes.push({
        requestMethod: httpMethod,
        path,
        actionName: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export default Route;
