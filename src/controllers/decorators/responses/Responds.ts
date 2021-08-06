import { ResponsePropertyDefinition, RouteDefinition } from "../RouteDefinition";

// TODO: Automate testing
const Responds = <R>(status: number, ResponseType?: { new (...args: any[]): R } | null, description?: string): MethodDecorator => {
  return (target, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const schema: { [key: string]: { type: string, format?: string } } = {};

    if (ResponseType != null) {
      // TODO: Find a better name.
      const keys = Object.keys(new ResponseType());

      const properties = Reflect.getMetadata(
        "properties",
        ResponseType
      ) as Array<ResponsePropertyDefinition>;

      for (const key of keys) {
        const property = properties.find(p => p.name === key);

        if (property != null) {
          schema[key] = {
            type: property.type!,
            format: property.format,
          };
        } 
        else {
          schema[key] = {
            type: 'string'
          };
        }
      }      
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor
    ) as Array<RouteDefinition>;

    const index = routes.findIndex(route => route.name === propertyKey); 
    if (index != -1) {
      routes[index].name = propertyKey.toString();
      routes[index].responses = routes[index].responses || [];
      routes[index].responses?.push({
        description,
        status,
        ResponseType: ResponseType,
        schema,
      });
    } else {
      routes.push({
        responses: [{
          description,
          status,
          ResponseType: ResponseType,
          schema,
        }],
        name: propertyKey.toString(),
      });
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export default Responds;
