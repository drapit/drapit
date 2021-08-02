import Route from "./Route";

const Get = (path: string): MethodDecorator =>  {
  return Route(path, 'get')
};

export default Get;
