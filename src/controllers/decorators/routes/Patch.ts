import { HttpMethods } from "../Types";
import Route from "./Route";

const Patch = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.patch });

export default Patch;
