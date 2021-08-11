import "reflect-metadata";

/**
 * Controller routing decorator.
 *
 * @param {string} [prefix='']
 * @return {*}  {ClassDecorator}
 */
const Controller = (prefix = ''): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata('prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  }
}

export default Controller;
