import Route from "./Route";

const Delete = (path: string): MethodDecorator =>
  Route({ path, requestMethod: "delete" });

export default Delete;
