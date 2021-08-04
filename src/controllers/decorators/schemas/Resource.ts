// TODO: Add description to the swagger documentation
const Resource = (description?: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("description", description, target);
    if (!Reflect.hasMetadata("properties", target)) {
      Reflect.defineMetadata("properties", [], target);
    }
  }
}

export default Resource;
