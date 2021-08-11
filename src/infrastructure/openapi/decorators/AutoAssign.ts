/**
 * Auto assign properties of resources.
 *
 * @template T
 * @param {T} constructor
 * @return {*} 
 */
const AutoAssign = (constructor: { new (args: any): any}) => {
  return class extends constructor {
    public constructor(params: any = {}) {
      super(params);

      Object.keys(params).forEach((key) => {
        (this as any)[key] = params[key];
      });
    }
  };
}

export default AutoAssign;
