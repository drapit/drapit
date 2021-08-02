import Route from "./Route";

const Delete = (path: string): MethodDecorator => Route(path, 'delete');

export default Delete;
