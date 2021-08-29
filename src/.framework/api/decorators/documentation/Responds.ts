import { Constructor, PropertyDefinition, ResponseDefinition } from ".framework/api/definitions";
import { MIMETypes } from ".framework/api/enums";
import ClassHelper from "../../helpers/ClassHelper";
import Action from "./Action";

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
      const RT = (response.ResponseType = ResponseType as Constructor);

      // define metadata
      if (!Reflect.hasMetadata("properties", RT)) {
        Reflect.defineMetadata("properties", [], RT);
      }

      const properties: PropertyDefinition[] = Reflect.getMetadata(
        "properties",
        RT
      );

      // Performance optimization.
      const propertyMap = properties.toDictionary("name");

      // Build schema. Map<string, PropertyDefinition>
      response.schema = Object.keys(new RT())
        .map((key) => ({
          ...propertyMap.get(key),
          type: propertyMap.get(key)?.type || "string",
        }))
        .toDictionary("name");
    } else {
      // else assume the MIME type was passed.
      response.contentTypes = [ResponseType as MIMETypes];
    }
  }

  // Set default MIME types if none were set.
  // TODO: make these configurable
  if (response.contentTypes?.length === 0) {
    response.contentTypes = [MIMETypes.json];
  }

  return Action({ responses: [response] });
}

export default Responds;
