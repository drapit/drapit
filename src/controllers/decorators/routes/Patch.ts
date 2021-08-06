import Route from "./Route";

const Patch = (path: string): MethodDecorator =>
  Route({ path, requestMethod: "patch" });

export default Patch;
