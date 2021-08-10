import { HttpMethods } from "./Definitions";
import Route from "./Route";

const Delete = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.delete });

export default Delete;
