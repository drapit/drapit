import Route from "./Route";

export const Put = (path: string): MethodDecorator =>
  Route({ path, requestMethod: "put" });

export default Put;
