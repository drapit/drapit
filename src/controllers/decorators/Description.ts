import { ParameterPropertyDefinition, RouteDefinition } from "./RouteDefinition";

function Description(description: string): PropertyDecorator;
function Description(description: string): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): void => {
    const isMethodDecorator = descriptor != null;

    const metadata = isMethodDecorator ? "routes" : "properties";

    if (!Reflect.hasMetadata(metadata, target.constructor)) {
      Reflect.defineMetadata(metadata, [], target.constructor);
    }

    const properties = Reflect.getMetadata(
      metadata,
      target.constructor
    ) as Array<RouteDefinition | ParameterPropertyDefinition>;

    const index = properties.findIndex((route) => route.name === propertyKey);

    if (index != -1) {
      properties[index].name = propertyKey.toString();
      properties[index].description = description;
    } else {
      properties.push({
        name: propertyKey.toString(),
        description,
      });
    }

    Reflect.defineMetadata(metadata, properties, target.constructor);
  };
}

export default Description;
