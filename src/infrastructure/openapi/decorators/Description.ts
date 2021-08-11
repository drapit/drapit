import Property from "./Property";
import Action from "./Action";

/**
 * Description decorator for properties and controller actions.
 *
 * @param {string} description
 * @return {*}  {(PropertyDecorator | MethodDecorator)}
 */
function Description(description: string): PropertyDecorator | MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const isForRoute = descriptor != null;

    if (isForRoute) {
      Action({ description })(target, propertyKey, descriptor);
      return;
    }

    Property({ description })()(target, propertyKey);
  };
}

export default Description;
