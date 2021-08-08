import { HttpMethods } from "./Definitions";
import Route from "./Route";

const Get = (path: string): MethodDecorator =>
  Route({ path, requestMethod: HttpMethods.get });
  
export default Get;
