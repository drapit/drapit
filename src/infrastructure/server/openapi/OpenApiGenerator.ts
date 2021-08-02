import "reflect-metadata";
import BaseController from "controllers/BaseController";
import { RouteDefinition } from "controllers/decorators/RouteDefinition";
import { OpenApiBuilder, PathItemObject } from "openapi3-ts";

export default class OpenApiGenerator {
  private path: string;
  private Controller: typeof BaseController;
  private documentation: OpenApiBuilder;

  public constructor(Controller: typeof BaseController, documentation: OpenApiBuilder) {
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
          parameters: [{
            name: 'x',
            in: 'query'
          }],
          responses: {
            '200': {
              description: 'some test'
            }
          }
        },
      };

      this.documentation.addPath(path, pathItems);
    }
  }

  // TODO: make this logic reusable
  private sanitize(path = '') {
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
