import "reflect-metadata";
import BaseController from "controllers/BaseController";
import {
  HttpMethods,
  ParameterContainers,
  ResponseDefinition,
  RouteDefinition,
  TagDefinition,
} from "controllers/decorators";
import {
  OpenApiBuilder,
  PathItemObject,
  ParameterObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
} from "openapi3-ts";
import MIMETypes from "application/enums/MIMETypes";
import RouteHeper from "infrastructure/helpers/Route";

export default class OpenApiGenerator {
  private path: string;
  private Controller: typeof BaseController;
  private documentation: OpenApiBuilder;

  public constructor(
    Controller: typeof BaseController,
    documentation: OpenApiBuilder
  ) {
    this.Controller = Controller;
    this.documentation = documentation;
    this.path = Reflect.getMetadata("prefix", Controller);
  }

  public generate(): void {
    const tags: TagDefinition[] = Reflect.getMetadata("tags", this.Controller);
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      "routes",
      this.Controller
    );

    for (const route of routes) {
      const path =
        RouteHeper.sanitize(this.path) + RouteHeper.sanitize(`${route.path}`);
      const pathItems: PathItemObject = {
        [`${route.requestMethod}`]: {
          tags: tags.map((t) => t.name),
          description: route.description,
          parameters: this.generateParameters(route),
          requestBody: this.generateRequestBody(route),
          responses: this.generateResponses(route),
        },
      };

      this.documentation.addPath(path, pathItems);
    }
  }

  private generateResponses(route: RouteDefinition): ResponseObject {
    const contentTypes = route.contentTypes || [MIMETypes.json, MIMETypes.xml];

    return route.responses?.reduce(
      (responses, response) => ({
        ...responses,
        [response.status]: {
          description: response.description || response.status.toString(),
          content: contentTypes.reduce(
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
                properties: Object.keys(response.schema).reduce(
                  (properties, key) => ({
                    ...properties,
                    [key]: {
                      ...(response.schema || {})[key],
                      example: undefined,
                    },
                  }),
                  {}
                ),
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
            ? Object.keys(response.schema).reduce(
                (examples, key) => ({
                  ...examples,
                  [key]: (response.schema || {})[key].example,
                }),
                {}
              )
            : undefined,
          error: !successful ? "some error message" : undefined,
          success: successful,
        },
      },
    };
  }

  private generateParameters(route: RouteDefinition): ParameterObject[] {
    if (!route.parameters?.length) return [];

    return route.parameters
      .filter((parameter) => parameter.in !== ParameterContainers.body)
      .reduce<ParameterObject[]>((parameters, container) => {
        return [
          ...parameters,
          ...container.properties?.map(
            (property) =>
              ({
                in: container.in.toString(),
                name: property.name,
                required: property.required,
                description: property.description,
                schema: {
                  type: property.type,
                  format: property.format,
                },
                example: property.example,
              } as ParameterObject)
          ),
        ];
      }, []);
  }

  private generateRequestBody(
    route: RouteDefinition
  ): RequestBodyObject | undefined {
    const { requestMethod } = route;
    const notAllowedHttpMethods = [HttpMethods.get, HttpMethods.delete];
    if (requestMethod == null) return;
    if (notAllowedHttpMethods.includes(requestMethod)) return;
    if (!route.parameters?.length) return;

    const body = route.parameters?.find(
      ({ in: from }) => from === ParameterContainers.body
    );
    if (body == null) return;

    return {
      description: body.description,
      content: {
        [MIMETypes.json]: {
          schema: {
            type: "object",
            properties: body.properties.reduce(
              (properties, { name, ...metadata }) => ({
                ...properties,
                [name]: metadata,
              }),
              {}
            ),
            example: body.properties.reduce(
              (examples, { name, example }) => ({
                ...examples,
                [name]: example,
              }),
              {}
            ),
          },
        },
      },
    };
  }
}