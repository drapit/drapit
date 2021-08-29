import "reflect-metadata";
import { PropertyDefinition, RouteDefinition } from ".framework/api/definitions";
import { HttpInput } from ".framework/api/enums";
import { Request, RequestHandler, Response } from "express";
import { HttpResponse } from ".framework/api/dto";
import { MIMETypes } from ".framework/api/enums";
import { Stream } from "stream";
import { SimpleFile } from ".framework/api/dto";

// TODO: declare types for params and user
type ControllerAction = (...params: unknown[]) => // user: unknown
Promise<HttpResponse<unknown>>;

/**
 * Common wrapper for all controller actions.
 *
 * @export
 * @class RequestHandlerWrapper
 */
export default class RequestHandlerWrapper {
  /**
   * Calls the controller action and handles throws.
   *
   * @param {ControllerAction} action
   * @param {RouteDefinition} route
   * @return {*}  {RequestHandler}
   * @memberof RequestHandlerWrapper
   */
  public handle(
    action: ControllerAction,
    route: RouteDefinition
  ): RequestHandler {
    return async (req: Request, res: Response): Promise<unknown> => {
      try {
        const params = this.getHttpInput(req, route);

        const response = await action(...params /* TODO: @User */);

        return res.status(response.status).json(response);
      } catch (e) {
        Logger.error(e);
        const response = HttpResponse.internalError(e.message || e.toString());

        return res.status(response.status).json(response);
      }
    };
  }

  /**
   * Gets the input expected by the controller action and convert them
   * to the expected type.
   * It uses the metadata provided by the parameter decorators.
   *
   * @private
   * @param {Request} req
   * @param {ParameterDefinition[]} [parameters=[]]
   * @return {*}
   * @memberof RequestHandlerWrapper
   */
  private getHttpInput(req: Request, route: RouteDefinition) {
    // TODO: break into smaller methods
    // NOTICE: just parsing for now, will be implementing validation later
    const parse = (value: string, type?: string) => {
      if (value == null) return null;

      switch (type) {
        case "number":
        case "integer":
        case "boolean":
          return JSON.parse(value);
        case "string":
        default:
          return `${value}`;
      }
    };

    const input = (route.parameters || []).map((parameter) => {
      if (parameter == null) return;
      const { in: from, name, type } = parameter;

      switch (from) {
        case HttpInput.query:
          return parse(req.query[name] as string, type);
        case HttpInput.cookie:
          return parse(req.cookies[name] as string, type);
        case HttpInput.header:
          return parse(req.headers[name] as string, type);
        case HttpInput.path:
          return parse(req.params[name] as string, type);
        default:
          return;
      }
    });

    const parseBody = (rawBody: { [key: string]: string }) => {
      const properties: PropertyDefinition[] = Reflect.getMetadata(
        "properties",
        route.body!.ParameterType
      );

      return properties.reduce((body, property) => {
        if (rawBody[property.name] != null) {
          if (property.format === "binary") {
            body[property.name] = rawBody[property.name];
          } else {
            body[property.name] = parse(
              `${rawBody[property.name]}`,
              property.type
            );
          }
        }
        return body;
      }, {} as { [key: string]: unknown });
    };

    if (route.body != null) {
      if (route.body.mimeType === MIMETypes.stream) {
        input[route.body?.position] = req as Stream;
      } else if (route.body.mimeType === MIMETypes.formData) {
        const files = Object.entries(req.files || {}).reduce(
          (uploads, [key, file]) => {
            if (Array.isArray(file)) {
              uploads[key] = file.map((f) => new SimpleFile(f));
            } else {
              uploads[key] = new SimpleFile(file);
            }

            return uploads;
          },
          {} as { [key: string]: SimpleFile | SimpleFile[] }
        );
        input[route.body?.position] = new route.body.ParameterType(
          parseBody({ ...req.body, ...files })
        );
      } else {
        input[route.body?.position] = new route.body.ParameterType(
          parseBody(req.body)
        );
      }
    }

    return input;
  }
}
