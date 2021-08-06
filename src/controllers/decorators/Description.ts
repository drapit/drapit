import Route from "./routes/Route";
import Property from "./schemas/Property";

function Description(description: string): PropertyDecorator;
function Description(description: string): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const isForRoute = descriptor != null;

    if (isForRoute) {
      Route({ description })(target, propertyKey, descriptor);
      return;
    }

    Property({ description })(target, propertyKey);
  };
}

export default Description;
