import { AllowedHttpMethod, RouteDefinition } from "../RouteDefinition";

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


    const index = routes.findIndex(route => route.name === propertyKey); 
    if (index != -1) {
      routes[index].requestMethod = httpMethod,
      routes[index].path = path;
      routes[index].name = propertyKey.toString();
    } else {
      routes.push({
        requestMethod: httpMethod,
        path,
        name: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export default Route;
