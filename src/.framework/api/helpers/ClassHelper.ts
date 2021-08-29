/**
 * Helper methods to deal with classes.
 *
 * @export
 * @class ClassHelper
 */
export default class ClassHelper {
  /**
   * Check whether passed type is a constructor.
   *
   * @static
   * @param {*} C
   * @return {*}  {boolean}
   * @memberof ClassHelper
   */
  public static isConstructor(C: any): boolean {
    try {
      new C();
    } catch (err) {
      return false;
    }
    return true;
  }
}
