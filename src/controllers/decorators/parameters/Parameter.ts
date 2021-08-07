import {
  ParameterContainers,
  Constructor,
  PropertyDefinition,
  RouteDefinition,
} from "../Types";

// TODO: Automate testing
const Parameter =
  (from: ParameterContainers) =>
  <T>(
    ParameterType: Constructor<T>,
    description?: string
  ): ParameterDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      parameterIndex: number
    ) => {
      if (!Reflect.hasMetadata("routes", target.constructor)) {
        Reflect.defineMetadata("routes", [], target.constructor);
      }

      let keys: string[] = [];
      let properties: PropertyDefinition[] = [];

      if (ParameterType != null) {
        keys = Object.keys(new ParameterType());
        properties = Reflect.getMetadata("properties", ParameterType);
      }

      const parameter = {
        in: from,
        ParameterType: ParameterType,
        description,
        properties: keys.map((key) => {
          const property = properties.find((p) => p.name === key);
  
          return {
            name: key,
            required: false, // TODO: hard coded for now remember to use the proper value when available
            type: property?.type || "string",
            format: property?.format,
            description: property?.description,
            example: property?.example,
          };
        }),
      };

      const routes = Reflect.getMetadata(
        "routes",
        target.constructor
      ) as Array<RouteDefinition>;

      const index = routes.findIndex((route) => route.name === propertyKey);

      if (index != -1) {
        const parameters = routes[index].parameters || [];
        parameters[parameterIndex] = parameter;
        routes[index].parameters = parameters;
      } else {
        const parameters = [];
        parameters[parameterIndex] = parameter;

        routes.push({
          parameters: parameters,
          name: propertyKey.toString(),
        });
      }

      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };

export default Parameter;
