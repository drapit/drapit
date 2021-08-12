import Action from "./Action";
import { PropertyDefinition, Constructor } from "./Definitions";

/**
 * Response decorator.
 *
 * @template R
 * @param {number} status
 * @param {(Constructor<R> | null)} [ResponseType]
 * @param {string} [description]
 * @return {*}  {MethodDecorator}
 */
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
    const resourceDescription = Reflect.getMetadata(
      "description",
      ResponseType
    );
    description = description || resourceDescription;
  }

  return Action({
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
              ...property,
              type: property?.type || "string",
            },
          };
        }, {}),
      },
    ],
  });
};

export default Responds;
