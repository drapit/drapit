import Property from "./Property";

// TODO: enum for types
const Type = (type: string, format?: string) => (): PropertyDecorator =>
  Property({ type, format });

export default Type;
