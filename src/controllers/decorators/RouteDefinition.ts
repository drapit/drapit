export type AllowedHttpMethod = "get" | "post" | "patch" | "put" | "delete" ;

export type ParametersDefinition = {
  in: "query" | "body" | "path" | "header" | "cookie",
  ParameterType: { new(...args: any[]): any}
  description?: string,
};

export type RouteDefinition = {
  path?: string;
  requestMethod?: AllowedHttpMethod;
  actionName: string;
  parameters?: ParametersDefinition[];
  responses?: ResponseDefinition[];
  contentTypes?: string[];
}

export type ResponseDefinition = {
  description?: string,
  status: number,
  ResponseType?: { new(...args: any[]): any} | null
}
