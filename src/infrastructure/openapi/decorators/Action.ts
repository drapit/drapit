import { RouteDefinition } from "./Definitions";

// TODO: automate testing

/**
 * Controller action decorator factory.
 *
 * @param {Partial<RouteDefinition>} route
 * @return {*}  {MethodDecorator}
 */
const Action = (route: Partial<RouteDefinition>): MethodDecorator => {
  return (target, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor
    ) as Array<RouteDefinition>;

    const index = routes.findIndex((route) => route.name === propertyKey);

    if (index !== -1) {
      routes[index] = {
        ...routes[index],
        ...route,
        parameters: [
          ...routes[index].parameters || [],
          ...route.parameters || [],
        ],
        responses: [
          ...routes[index].responses || [],
          ...route.responses || [],
        ],
        contentTypes: [
          ...routes[index].contentTypes || [],
          ...route.contentTypes || [],
        ],
        name: propertyKey.toString(),
      };
    } else {
      routes.push({
        ...route,
        name: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};


export default Action;
