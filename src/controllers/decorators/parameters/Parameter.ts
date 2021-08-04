import {
  ParameterPropertyDefinition,
  ParametersDefinition,
  ResponsePropertyDefinition,
  RouteDefinition,
} from "../RouteDefinition";

const setParameter = (
  parameters: ParametersDefinition[] = [],
  index: number,
  parameter: ParametersDefinition
) => {
  parameters = parameters || [];
  parameters[index] = parameter;

  return parameters;
};

// TODO: Automate testing
// TODO: Create enum for parameter types
const Parameter =
  (from: "query" | "body" | "path" | "header" | "cookie") =>
  <T>(
    ParameterType: { new (...args: any[]): T },
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

      let parameters: ParameterPropertyDefinition[] = [];

      if (ParameterType != null) {
        // TODO: Find a better name.
        const keys = Object.keys(new ParameterType());

        const properties = Reflect.getMetadata(
          "properties",
          ParameterType
        ) as Array<ResponsePropertyDefinition>;

        parameters = keys.map((key): ParameterPropertyDefinition  => {
          const property = properties.find((p) => p.name === key);

          if (property != null) {
            return {
              name: property.name,
              required: false, // NOTICE: hard coded for now
              type: property.type!,
              format: property.format,
            };
          } else {
            return {
              name: key,
              required: false, // NOTICE: hard coded for now
              type: "string",
            };
          }
        });
      }

      const parameter = {
        in: from,
        ParameterType: ParameterType,
        description,
        properties: parameters,
      };

      const routes = Reflect.getMetadata(
        "routes",
        target.constructor
      ) as Array<RouteDefinition>;

      const index = routes.findIndex(
        (route) => route.actionName === propertyKey
      );

      if (index != -1) {
        routes[index].parameters = setParameter(
          routes[index].parameters,
          parameterIndex,
          parameter
        );
      } else {
        const parameters = setParameter([], parameterIndex, parameter);

        routes.push({
          parameters: parameters,
          actionName: propertyKey.toString(),
        });
      }

      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };

export default Parameter;
