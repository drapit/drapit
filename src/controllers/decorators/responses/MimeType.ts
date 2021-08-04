import { RouteDefinition } from "../RouteDefinition";

const MimeType = (mimeType: 'application/json' | 'application/xml') => (): MethodDecorator => {
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
      routes[index].contentTypes = routes[index].contentTypes || [];
      routes[index].contentTypes?.push(mimeType);
    } else {
      routes.push({
        contentTypes: [mimeType],
        actionName: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export default MimeType;