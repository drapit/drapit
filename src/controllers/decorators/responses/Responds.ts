import { PropertyDefinition, TypedConstructor } from "../Types";
import Route from "../routes/Route";

const Responds = <R>(
  status: number,
  ResponseType?: TypedConstructor<R> | null,
  description?: string
): MethodDecorator => {
  let keys: string[] = [];
  let properties: PropertyDefinition[] = [];

  if (ResponseType != null) {
    keys = Object.keys(new ResponseType());
    properties = Reflect.getMetadata("properties", ResponseType);
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
            },
          };
        }, {}),
      },
    ],
  });
};

export default Responds;
