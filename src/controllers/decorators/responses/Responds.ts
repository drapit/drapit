import { RouteDefinition } from "../RouteDefinition";

// TODO: Automate testing
const Responds = <R>(status: number, ResponseType?: { new (...args: any[]): R } | null, description?: string): MethodDecorator => {
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
      routes[index].actionName = propertyKey.toString();
      routes[index].responses = routes[index].responses || [];
      routes[index].responses?.push({
        description,
        status,
        ResponseType: ResponseType
      });
    } else {
      routes.push({
        responses: [{
          description,
          status,
          ResponseType: ResponseType
        }],
        actionName: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export default Responds;
