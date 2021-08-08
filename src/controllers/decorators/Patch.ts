import { HttpMethods } from "./Definitions";
import Route from "./Route";

const Patch = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.patch });

export default Patch;
