export type AllowedHttpMethods = "get" | "post" | "patch" | "put" | "delete";
export type AllowedParameterContainers = "query" | "body" | "path" | "header" | "cookie";

export type TypedConstructor<T> = { new (...args: any[]): T };
export type Constructor = { new (...args: any[]): any };

export type PropertyDefinition = {
  name: string;
  type?: string;
  format?: string;
  description?: string;
  example?: string | number | boolean;
  required?: boolean;
};

export type ParametersDefinition = {
  in: AllowedParameterContainers;
  ParameterType: Constructor;
  description?: string;
  properties: PropertyDefinition[];
};

export type RouteDefinition = {
  path?: string;
  requestMethod?: AllowedHttpMethods;
  name: string;
  parameters?: ParametersDefinition[];
  responses?: ResponseDefinition[];
  contentTypes?: string[];
  description?: string;
};

export type ResponseDefinition = {
  description?: string;
  status: number;
  ResponseType?: Constructor | null;
  schema?: { [key: string]: { type: string; format?: string } };
};
