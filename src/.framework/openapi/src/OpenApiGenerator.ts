import "reflect-metadata";
import {
  Constructor,
  ResponseDefinition,
  RouteDefinition,
  TagDefinition,
} from ".framework/api/definitions";
import { HttpMethods } from ".framework/api/enums";
import {
  OpenApiBuilder,
  PathItemObject,
  ParameterObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  MediaTypeObject,
} from "openapi3-ts";
import { MIMETypes } from ".framework/api/enums";
import RouteHelper from "./helpers/Route";

/**
 * Generates OpenApi specification based on the metadata
 * provided by the decorators used in the controller.
 *
 * @export
 * @class OpenApiGenerator
 */
export default class OpenApiGenerator {
  /**
   * Controller path.
   *
   * @private
   * @type {string}
   * @memberof OpenApiGenerator
   */
  private path: string;

  /**
   * Constructor of the controller.
   *
   * @private
   * @type {Constructor}
   * @memberof OpenApiGenerator
   */
  private Controller: Constructor;

  /**
   * Builder for the specification.
   *
   * @private
   * @type {OpenApiBuilder}
   * @memberof OpenApiGenerator
   */
  private documentation: OpenApiBuilder;

  /**
   * Creates an instance of OpenApiGenerator.
   * @param {Constructor} Controller
   * @param {OpenApiBuilder} documentation
   * @memberof OpenApiGenerator
   */
  public constructor(Controller: Constructor, documentation: OpenApiBuilder) {
    this.Controller = Controller;
    this.documentation = documentation;
    this.path = Reflect.getMetadata("prefix", Controller);
  }

  /**
   * Generates the documentation for the controller.
   *
   * @memberof OpenApiGenerator
   */
  public generate(): void {
    const tags: TagDefinition[] = Reflect.getMetadata("tags", this.Controller);
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      "routes",
      this.Controller
    );

    for (const route of routes) {
      const path = [this.path, route.path]
        .map(RouteHelper.sanitize)
        .map(RouteHelper.sanitizePathParams)
        .join("");
      const pathItems: PathItemObject = {
        [`${route.requestMethod}`]: {
          tags: tags.map((t) => t.name),
          description: route.description,
          parameters: this.generateParameters(route),
          requestBody: this.generateRequestBody(route),
          responses: this.generateResponses(route),
          deprecated: route.deprecated,
        },
      };

      this.documentation.addPath(path, pathItems);
    }
  }

  /**
   * Generates documentation of the responses of the controller action.
   *
   * @private
   * @param {RouteDefinition} route
   * @return {*}  {ResponseObject}
   * @memberof OpenApiGenerator
   */
  private generateResponses(route: RouteDefinition): ResponseObject {
    return route.responses?.reduce(
      (responses, response) => ({
        ...responses,
        [response.status]: {
          description: response.description || response.status.toString(),
          content: response.contentTypes?.reduce(
            (schemas, contentType) => ({
              ...schemas,
              [contentType]: this.generateResponseSchema(response),
            }),
            {}
          ),
        },
      }),
      {}
    ) as ResponseObject;
  }

  /**
   * Generates documentation of the schema of the responses.
   *
   * @private
   * @param {ResponseDefinition} response
   * @return {*}  {SchemaObject}
   * @memberof OpenApiGenerator
   */
  private generateResponseSchema(response: ResponseDefinition): SchemaObject {
    if (response.schema == null) return {};

    const successful = response.status >= 200 && response.status < 400;

    // TODO: Find a way to not hard code the response wrapper.
    // TODO: Add examples
    return {
      schema: {
        type: "object",
        properties: {
          status: {
            type: "number",
          },
          message: {
            type: "string",
          },
          data: successful
            ? {
                type: "object",
                properties: response.schema.omit("example", "name").toJSON(),
              }
            : undefined,
          error: !successful
            ? {
                type: "string",
              }
            : undefined,
          success: {
            type: "boolean",
          },
        },
        example: {
          status: response.status,
          message: successful ? "some success message" : undefined,
          data: successful
            ? response.schema?.pickValueOf("example").toJSON()
            : undefined,
          error: !successful ? "some error message" : undefined,
          success: successful,
        },
      },
    };
  }

  /**
   * Generates documentation of the parameters of the controller actions.
   *
   * @private
   * @param {RouteDefinition} route
   * @return {*}  {ParameterObject[]}
   * @memberof OpenApiGenerator
   */
  private generateParameters(route: RouteDefinition): ParameterObject[] {
    if (!route.parameters?.length) return [];

    return (
      route.parameters
        // NOTICE: the array element that is null is the place where body will be
        .filter((parameter) => parameter != null)
        .map(
          (parameter) =>
            ({
              in: parameter.in,
              name: parameter.name,
              required: parameter.required, // TODO: think how to document this
              description: parameter.description, // TODO: think how to document this
              deprecated: parameter.deprecated, // TODO: think how to document this
              schema: {
                type: parameter.type,
                format: parameter.format, // TODO: think how to document this
              },
              example: parameter.example, // TODO: think how to document this
            } as ParameterObject)
        )
    );
  }

  /**
   * Generates documentation of the body payload of controller actions.
   *
   * @private
   * @param {RouteDefinition} route
   * @return {*}  {(RequestBodyObject | undefined)}
   * @memberof OpenApiGenerator
   */
  private generateRequestBody(
    route: RouteDefinition
  ): RequestBodyObject | undefined {
    const { requestMethod } = route;
    const notAllowedHttpMethods = [HttpMethods.get, HttpMethods.delete];

    if (requestMethod == null) return;
    if (notAllowedHttpMethods.includes(requestMethod)) return;
    if (!route.parameters?.length) return;
    if (route.body == null) return;
    const requiredProperties = route.body.properties
      .filter((p) => p.required)
      .map((p) => p.name);

    let mediaTypeObject: MediaTypeObject;

    if (route.body.mimeType === MIMETypes.text) {
      mediaTypeObject = {
        schema: {
          type: "string",
        },
      };
    } else if (route.body.mimeType === MIMETypes.stream) {
      mediaTypeObject = {};
    } else {
      mediaTypeObject = {
        schema: {
          type: "object",
          properties: route.body.properties
            .toDictionary("name")
            .omit("example", "name")
            .toJSON(),
          example: route.body.properties
            .toDictionary("name")
            .pickValueOf("example")
            .toJSON(),
          required:
            requiredProperties.length > 0 ? requiredProperties : undefined,
        },
      };
    }

    return {
      description: route.body.description,
      content: {
        [route.body.mimeType]: mediaTypeObject,
      },
    };
  }
}
