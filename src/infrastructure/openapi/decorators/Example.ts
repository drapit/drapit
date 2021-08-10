import Property from "./Property";

const Example = (example: string | number | boolean): PropertyDecorator =>
  Property({ example });

export default Example;
