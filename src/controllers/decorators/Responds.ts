import { PropertyDefinition, Constructor } from "./Definitions";
import Route from "./Route";

const Responds = <R>(
  status: number,
  ResponseType?: Constructor<R> | null,
  description?: string
): MethodDecorator => {
  let keys: string[] = [];
  let properties: PropertyDefinition[] = [];

  if (ResponseType != null) {
    keys = Object.keys(new ResponseType());
    properties = Reflect.getMetadata("properties", ResponseType);
    description = description || Reflect.getMetadata("description", ResponseType);
  }


  return Route({
    responses: [
      {
        description,
        status,
        ResponseType,
        schema: keys.reduce((schema, key) => {
          const property = properties.find(({ name }) => name === key);

          return {
            ...schema,
            [key]: {
              type: property?.type || "string",
              format: property?.format,
              example: property?.example,
              description: property?.description
            },
          };
        }, {}),
      },
    ],
  });
};

export default Responds;
