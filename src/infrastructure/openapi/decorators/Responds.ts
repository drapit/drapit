import MIMETypes from "application/enums/MIMETypes";
import ArrayHelper from "infrastructure/helpers/ArrayHelper";
import ClassHelper from "infrastructure/helpers/ClassHelper";
import Action from "./Action";
import {
  PropertyDefinition,
  Constructor,
  ResponseDefinition,
} from "./Definitions";

/**
 * Response decorator.
 *
 * @param {number} status
 * @param {(Constructor | MIMETypes)} [ResponseType]
 * @param {MIMETypes} [contentType]
 * @return {*}  {MethodDecorator}
 */
function Responds(status: number, contentType?: MIMETypes): MethodDecorator;
function Responds(status: number, ResponseType?: Constructor): MethodDecorator;
function Responds(
  status: number,
  ResponseType?: Constructor,
  contentType?: MIMETypes
): MethodDecorator;
function Responds(
  status: number,
  ResponseType?: Constructor | MIMETypes,
  contentType?: MIMETypes
): MethodDecorator {
  const response: ResponseDefinition = {
    status,
    contentTypes: contentType != null ? [contentType as MIMETypes] : [],
  };

  if (ResponseType != null) {
    // If second argument passed is a constructor...
    if (ClassHelper.isConstructor(ResponseType)) {
      const RT = ResponseType as Constructor;
      response.ResponseType = RT;
      // define metadata
      if (!Reflect.hasMetadata("properties", RT)) {
        Reflect.defineMetadata("properties", [], RT);
      }

      const properties: PropertyDefinition[] = Reflect.getMetadata(
        "properties",
        RT
      );

      // Performance optimization.
      const propertyMap = ArrayHelper.createHashMap(properties, "name");

      // Build schema.
      response.schema = Object.keys(new RT()).reduce(
        (schema, key) => ({
          ...schema,
          [key]: {
            ...propertyMap[key],
            type: propertyMap[key]?.type || "string",
          },
        }),
        {}
      );
    } else {
      // else assume the MIME type was passed.
      response.contentTypes = [ResponseType as MIMETypes];
    }
  }

  // Set default MIME types if none were set.
  // TODO: make these configurable
  if (response.contentTypes?.length === 0) {
    response.contentTypes = [MIMETypes.json, MIMETypes.xml];
  }

  return Action({ responses: [response] });
}

export default Responds;
