import { Constructor } from ".framework/api/definitions";

/**
 * Auto assign properties of resources.
 *
 * @template T
 * @param {T} constructor
 * @return {*}
 */
const AutoAssignable = (constructor: Constructor): Constructor => {
  return class extends constructor {
    public constructor(params: { [key: string]: unknown } = {}) {
      super(params);

      for (const key of Object.keys(this)) {
        this[key] = params[key];
      }
    }
  };
};

export default AutoAssignable;
