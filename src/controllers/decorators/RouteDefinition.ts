export type AllowedHttpMethod = "get" | "post" | "patch" | "put" | "delete" ;

export type ParametersDefinition = {
  in: "query" | "body" | "path",
  Type: { new(...args: any[]): any}
};
export type RouteDefinition = {
  path?: string;
  requestMethod?: AllowedHttpMethod;
  actionName: string;
  parameters?: ParametersDefinition[]
}
