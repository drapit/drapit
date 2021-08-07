import { HttpMethods } from "../Types";
import Route from "./Route";

const Delete = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.delete });

export default Delete;
