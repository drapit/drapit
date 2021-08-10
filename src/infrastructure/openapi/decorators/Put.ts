import { HttpMethods } from "./Definitions";
import Route from "./Route";

export const Put = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.put });

export default Put;
