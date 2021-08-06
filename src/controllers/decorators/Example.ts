import { Property } from "./RouteDefinition";

const Example = (example: string | number | boolean): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata("properties", target.constructor)) {
      Reflect.defineMetadata("properties", [], target.constructor);
    }

    const properties = Reflect.getMetadata(
      "properties",
      target.constructor
    ) as Array<Property>;

    const index = properties.findIndex(route => route.name === propertyKey); 
    if (index != -1) {
      properties[index].name = propertyKey.toString();
      properties[index].example = example;
    } else {
      properties.push({
        name: propertyKey.toString(),
        example,
      });
    }

    Reflect.defineMetadata("properties", properties, target.constructor);
  };
};

export default Example;
