// TODO: find a better place for this file.

import { HttpInput, HttpMethods, MIMETypes } from ".framework/api/enums";

export type Constructor<T = any> = { new (...args: any[]): T };

export type PropertyDefinition = {
  name: string;
  type?: string;
  format?: string;
  description?: string;
  example?: string | number | boolean;
  required?: boolean;
  deprecated?: boolean;
  enum?: Array<string | number>;
};

export type TagDefinition = {
  name: string;
  description: string;
};

export type ParameterDefinition = PropertyDefinition & {
  in: HttpInput;
};

export type BodyDefinition = {
  position: number;
  ParameterType: Constructor;
  description?: string;
  properties: PropertyDefinition[];
  mimeType: MIMETypes;
};

export type RouteDefinition = {
  path?: string;
  requestMethod?: HttpMethods;
  name: string;
  body?: BodyDefinition;
  parameters?: ParameterDefinition[];
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
