import {
  RouteDefinition,
  ParameterDefinition,
  Constructor,
} from ".framework/api/definitions";
import { HttpInput } from ".framework/api/enums";

export type Primitive = "string" | "number" | "boolean";
export type PrimitiveConstructor =
  | Constructor<String>
  | Constructor<Number>
  | Constructor<Boolean>;

// TODO: Automate testing

/**
 * Parameter decorator factory
 *
 * @param {HttpInput} from
 */
const Parameter =
  (from: HttpInput, defaultType: Primitive) =>
  (name: string, Type?: PrimitiveConstructor): ParameterDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      parameterIndex: number
    ) => {
      if (!Reflect.hasMetadata("routes", target.constructor)) {
        Reflect.defineMetadata("routes", [], target.constructor);
      }

      const type = Type?.name.toLowerCase() || defaultType;

      const parameter: ParameterDefinition = {
        in: from,
        name,
        type,
      };

      if (from === HttpInput.path) parameter.required = true;

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
