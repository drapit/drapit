import "reflect-metadata";
import BaseController from "controllers/BaseController";
import {
  ParametersDefinition,
  ResponseDefinition,
  RouteDefinition,
} from "controllers/decorators/RouteDefinition";
import {
  OpenApiBuilder,
  PathItemObject,
  ParameterObject,
  RequestBodyObject,
  ResponseObject,
} from "openapi3-ts";

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
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      "routes",
      this.Controller
    );

    for (const route of routes) {
      const path = this.sanitize(this.path) + this.sanitize(`${route.path}`);
      const pathItems: PathItemObject = {
        [`${route.requestMethod}`]: {
          description: route.description,
          parameters: this.generateParameters(route),
          requestBody: this.generateRequestBody(route),
          responses: this.generateResponses(route),
        },
      };

      this.documentation.addPath(path, pathItems);
    }
  }

  // TODO: add response wrapper
  private generateResponses(route: RouteDefinition): ResponseObject {
    route.contentTypes = route.contentTypes || [
      "application/json",
      "application/xml",
    ];
    return route.responses?.reduce((responses, resposeForStatus) => {
      const response = {
        description: resposeForStatus.description || `${resposeForStatus.status}`,
        content: route.contentTypes?.reduce((schemas, contentType) => {
          return {
            ...schemas,
            [contentType]: !resposeForStatus.ResponseType ? {} : {
              schema: {
                type: "object",
                properties: resposeForStatus.schema,
                // required: [], TODO: get from metadata
              },
            },
          };
        }, {}),
      };

      return { ...responses, [resposeForStatus.status]: response };
    }, {}) as ResponseObject ;
  }

  private generateParameters(route: RouteDefinition): ParameterObject[] {
    if (!route.parameters?.length) return [];

    // TODO: obtain metadata from decorators
    return route.parameters
      ?.filter((parameter) => parameter.in !== "body")
      .map((parameter) => {
        return parameter.properties.map((property) => ({
          in: parameter.in,
          name: property.name,
          required: property.required,
          description: property.description,
          schema: {
            type: property.type,
            format: property.format,
          },
          example: property.example
        }));
      })
      .reduce(
        (parameters, arrayOfParameters) => [
          ...parameters,
          ...arrayOfParameters,
        ],
        []
      ) as ParameterObject[];
  }

  //   export interface RequestBodyObject extends ISpecificationExtension {
  //     description?: string;
  //     content: ContentObject;
  //     required?: boolean;
  // }

  private generateRequestBody(
    route: RouteDefinition
  ): RequestBodyObject | undefined {
    if (["get", "delete"].includes(route.requestMethod!)) return;
    if (!route.parameters?.length) return;
    const body = route.parameters?.find((parameter) => parameter.in === "body");
    if (body == null) return;
    Logger.debug(JSON.stringify(route, null, 2), body);

    return {
      content: {
        "application/json": {
          // TODO: determine dinamically
          schema: {
            type: "object",
            properties: body.properties
              .map((property) => ({
                name: property.name,
                type: property.type,
                format: property.format,
                description: property.description,
              }))
              .reduce(
                (properties, { name, ...props }) => ({
                  ...properties,
                  [name]: props,
                }),
                {}
              ),
            example: body.properties.reduce(
              (examples, { name, ...props }) => ({
                ...examples,
                [name]: props.example,
              }),
              {}
            )
            // required: [], TODO: get from metadata
          },
        },
      },
    } as RequestBodyObject;
  }

  // TODO: make this logic reusable
  private sanitize(path = "") {
    path = this.addBeginningSlash(path);
    path = this.removeTrailingSlash(path);

    return path;
  }

  private removeTrailingSlash(value: string): string {
    if (value.lastIndexOf("/") === value.length - 1) {
      return value.substring(0, value.length - 1);
    }

    return value;
  }

  private addBeginningSlash(value: string): string {
    if (value[0] !== "/") {
      return `/${value}`;
    }

    return value;
  }
}
