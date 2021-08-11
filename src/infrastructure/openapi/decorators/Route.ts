import Action from "./Action";
import { HttpMethods } from "./Definitions";

// TODO: automate testing

/**
 * Route decorator factory.
 *
 * @param {Partial<RouteDefinition>} route
 * @return {*}  {MethodDecorator}
 */
const Route = (requestMethod: HttpMethods) => (path: string): MethodDecorator =>
  Action({ path, requestMethod });

export default Route;
