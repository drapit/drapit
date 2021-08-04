import { ParametersDefinition, RouteDefinition } from "../RouteDefinition";

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
  <T>(ParameterType: { new (...args: any[]): T }, description?: string): ParameterDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      parameterIndex: number
    ) => {
      const parameter = { in: from, ParameterType: ParameterType, description };

      if (!Reflect.hasMetadata("routes", target.constructor)) {
        Reflect.defineMetadata("routes", [], target.constructor);
      }

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
