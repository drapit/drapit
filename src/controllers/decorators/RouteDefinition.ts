export type AllowedHttpMethod = "get" | "post" | "patch" | "put" | "delete" ;

export type ParameterPropertyDefinition = {
  name: string,
  required: boolean, // NOTICE: hard coded for now
  type: string,
  format?: string,
}
export type ParametersDefinition = {
  in: "query" | "body" | "path" | "header" | "cookie";
  ParameterType: { new(...args: any[]): any };
  description?: string;
  properties: ParameterPropertyDefinition[]
};

export type RouteDefinition = {
  path?: string;
  requestMethod?: AllowedHttpMethod;
  actionName: string;
  parameters?: ParametersDefinition[];
  responses?: ResponseDefinition[];
  contentTypes?: string[];
}

export type ResponsePropertyDefinition = {
  name: string;
  type?: string;
  format?: string;
  description?: string;
}

export type ResponseDefinition = {
  description?: string;
  status: number;
  ResponseType?: { new(...args: any[]): any } | null;
  schema?: { [key: string]: { type: string, format?: string } };
}
