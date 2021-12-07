/**
 * Resource decorator.
 * Allows you to add a description to the resource.
 *
 * @param {string} [description]
 * @return {*}  {ClassDecorator}
 */
const Resource = (description?: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("description", description, target);
    if (!Reflect.hasMetadata("properties", target)) {
      Reflect.defineMetadata("properties", [], target);
    }
  }
}

export default Resource;
