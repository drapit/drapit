import MIMETypes from "application/enums/MIMETypes";

export enum HttpMethods {
  get = "get",
  post = "post",
  patch = "patch",
  put = "put",
  delete = "delete",
}

export enum ParameterContainers {
  query = "query",
  body = "body",
  path = "path",
  header = "header",
  cookie = "cookie",
}

export type Args<A extends any> = Array<A>;
export type Constructor<T = any> = { new <A>(...args: Args<A>): T };

export type PropertyDefinition = {
  name: string;
  type?: string;
  format?: string;
  description?: string;
  example?: string | number | boolean;
  required?: boolean;
};

export type TagDefinition = {
  name: string;
  description: string;
};

export type ParametersDefinition = {
  in: ParameterContainers;
  ParameterType: Constructor;
  description?: string;
  properties: PropertyDefinition[];
};

export type RouteDefinition = {
  path?: string;
  requestMethod?: HttpMethods;
  name: string;
  parameters?: ParametersDefinition[];
  responses?: ResponseDefinition[];
  contentTypes?: MIMETypes[];
  description?: string;
};

export type ResponseSchema = {
  [key: string]: PropertyDefinition;
};

export type ResponseDefinition = {
  description?: string;
  status: number;
  ResponseType?: Constructor | null;
  schema?: ResponseSchema;
};
