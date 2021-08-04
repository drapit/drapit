import { ResponsePropertyDefinition } from "../RouteDefinition";

// TODO: enum for types
const Type = (type: string, format?: string) => (): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata("properties", target.constructor)) {
      Reflect.defineMetadata("properties", [], target.constructor);
    }

    const properties = Reflect.getMetadata(
      "properties",
      target.constructor
    ) as Array<ResponsePropertyDefinition>;

    const index = properties.findIndex(route => route.name === propertyKey); 
    if (index != -1) {
      properties[index].name = propertyKey.toString();
      properties[index].type = type;
      properties[index].format = format;
    } else {
      properties.push({
        name: propertyKey.toString(),
        type: type,
        format: format,
      });
    }

    Reflect.defineMetadata("properties", properties, target.constructor);
  };
};
export default Type;
