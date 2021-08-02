import Route from "./Route";

export const Put = (path: string): MethodDecorator => Route(path, 'put');

export default Put;
