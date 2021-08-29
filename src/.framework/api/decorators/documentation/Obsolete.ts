import Action from "./Action";
import Property from "./Property";

/**
 * Deprecated decorator for properties and controller actions.
 *
 * @param {string} description
 * @return {*}  {(PropertyDecorator | MethodDecorator)}
 */
 function Obsolete(): PropertyDecorator;
 function Obsolete(): MethodDecorator {
   return (
     target: Object,
     propertyKey: string | symbol,
     descriptor: PropertyDescriptor
   ): void => {
     const isForRoute = descriptor != null;
 
     if (isForRoute) {
       Action({ deprecated: true })(target, propertyKey, descriptor);
       return;
     }
 
     Property({ deprecated: true })()(target, propertyKey);
   };
 }

 
export default Obsolete;
