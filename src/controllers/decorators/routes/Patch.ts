import Route from "./Route";

const Patch = (path: string): MethodDecorator => Route(path, 'patch');

export default Patch;
