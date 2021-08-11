import { shallowEqual } from "shallow-equal-object";

/**
 * Base class for value objects.
 *
 * @export
 * @class ValueObject
 */
export default class ValueObject {
  /**
   * Check whether two value objects are equal.
   *
   * @param {ValueObject} valueObject
   * @return {*}  {boolean}
   * @memberof ValueObject
   */
  public equals(valueObject: ValueObject): boolean {
    if (valueObject == null) return false;

    // TODO: confirm this works as expected.
    return shallowEqual(this, valueObject);
  }
}
