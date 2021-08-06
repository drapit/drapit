import Route from "./Route";

const Get = (path: string): MethodDecorator =>
  Route({ path, requestMethod: "get" });
  
export default Get;
