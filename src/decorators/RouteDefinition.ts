export type AllowedHttpMethod = "get" | "post" | "patch" | "put" | "delete" ;

export type RouteDefinition = {
  path: string;
  requestMethod: AllowedHttpMethod;
  actionName: string;
}
