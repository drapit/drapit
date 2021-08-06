export type AllowedHttpMethod = "get" | "post" | "patch" | "put" | "delete" ;

export type Property = {
  name: string,
  type?: string,
  format?: string,
  description?: string;
  example?: string | number | boolean;
};

export type ParameterPropertyDefinition = Property & { required: boolean };

export type ParametersDefinition = {
  in: "query" | "body" | "path" | "header" | "cookie";
  ParameterType: { new(...args: any[]): any };
  description?: string;
  properties: ParameterPropertyDefinition[]
};

export type RouteDefinition = {
  path?: string;
  requestMethod?: AllowedHttpMethod;
  name: string;
  parameters?: ParametersDefinition[];
  responses?: ResponseDefinition[];
  contentTypes?: string[];
  description?: string;
}

export type ResponsePropertyDefinition = Property;

export type ResponseDefinition = {
  description?: string;
  status: number;
  ResponseType?: { new(...args: any[]): any } | null;
  schema?: { [key: string]: { type: string, format?: string } };
}
