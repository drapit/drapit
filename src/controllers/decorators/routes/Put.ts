import { HttpMethods } from "../Types";
import Route from "./Route";

export const Put = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.put });

export default Put;
