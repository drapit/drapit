// TODO: automate testing

import { HttpMethods } from ".framework/api/enums";
import Action from ".framework/api/decorators/documentation/Action";

/**
 * Route decorator factory.
 *
 * @param {Partial<RouteDefinition>} route
 * @return {*}  {MethodDecorator}
 */
const Route =
  (requestMethod: HttpMethods) =>
  (path: string): MethodDecorator =>
    Action({ path, requestMethod });

export default Route;
