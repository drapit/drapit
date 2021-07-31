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

    routes.push({
      requestMethod: httpMethod,
      path,
      actionName: propertyKey.toString(),
    });

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Get = (path: string): MethodDecorator => Route(path, 'get');
export const Post = (path: string): MethodDecorator => Route(path, 'post');
export const Patch = (path: string): MethodDecorator => Route(path, 'patch');
export const Put = (path: string): MethodDecorator => Route(path, 'put');
export const Delete = (path: string): MethodDecorator => Route(path, 'delete');

