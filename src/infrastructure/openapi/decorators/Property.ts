import { PropertyDefinition } from "./Definitions";

/**
 * Property decorator factory.
 * It allows to easily create new decorators for resources' properties.
 *
 * @param {Partial<PropertyDefinition>} property
 */
const Property =
  (property: Partial<PropertyDefinition>) => (): PropertyDecorator => {
    return (target: Object, propertyKey: string | symbol): void => {
      if (!Reflect.hasMetadata("properties", target.constructor)) {
        Reflect.defineMetadata("properties", [], target.constructor);
      }

      const properties = Reflect.getMetadata(
        "properties",
        target.constructor
      ) as Array<PropertyDefinition>;

      const index = properties.findIndex((route) => route.name === propertyKey);

      if (index !== -1) {
        properties[index] = {
          ...properties[index],
          ...property,
          type:
            property.type ||
            properties[index].type ||
            (propertyKey === "password" ? "password" : undefined),
          name: propertyKey.toString(),
        };
      } else {
        properties.push({
          ...property,
          name: propertyKey.toString(),
        });
      }

      Reflect.defineMetadata("properties", properties, target.constructor);
    };
  };

export default Property;
