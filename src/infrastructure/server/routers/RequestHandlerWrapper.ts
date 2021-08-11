import "reflect-metadata";
import { ParameterContainers, ParametersDefinition, RouteDefinition } from "infrastructure/openapi/decorators";
import { Request, RequestHandler, Response } from "express";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import queryString from 'query-string';

// TODO: declare types for params and user
type ControllerAction = (
  ...params: unknown[]
  // user: unknown
) => Promise<HttpResponse<unknown>>;

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
  public handle(action: ControllerAction, route: RouteDefinition): RequestHandler {
    return async (req: Request, res: Response): Promise<unknown> => {
      try {
        const params = this.getParams(req, route.parameters);
        const response = await action(...params /*, req.User */);
  
        return res.status(response.status).json(response);
      } catch (e) {
        Logger.error(e);
        const response = HttpResponse.internalError(e.message || e.toString());
  
        return res.status(response.status).json(response);
      }
    }
  }

  /**
   * Gets the params expected by the controller action and convert them
   * to the expected type.
   * It uses the metadata provided by the parameter decorators.
   *
   * @private
   * @param {Request} req
   * @param {ParametersDefinition[]} [parameters=[]]
   * @return {*} 
   * @memberof RequestHandlerWrapper
   */
  private getParams(req: Request, parameters: ParametersDefinition[] = []) {
    return parameters.map(({ in: from, ParameterType }) => {
      const options = { parseBooleans: true, parseNumbers: true };

      switch (from) {
        case ParameterContainers.query:
          return new ParameterType(queryString.parseUrl(req.url, options) || {});
        case ParameterContainers.cookie:
          return new ParameterType(req.cookies || {});
        case ParameterContainers.header:
          return new ParameterType(req.headers || {});
        case ParameterContainers.path:
          return new ParameterType(req.params || {});
        case ParameterContainers.body:
        default:
          return new ParameterType(req.body || {});
      }
    });
  }
}
