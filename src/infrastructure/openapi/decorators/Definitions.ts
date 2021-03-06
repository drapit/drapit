// TODO: find a better place for this file.

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
  deprecated?: boolean;
  enum?: Array<string | number>
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
  description?: string;
  deprecated?: boolean;
};

export type ResponseDefinition = {
  description?: string;
  status: number;
  ResponseType?: Constructor | null;
  schema?: Map<string, Partial<PropertyDefinition>>;
  contentTypes?: MIMETypes[];
};
