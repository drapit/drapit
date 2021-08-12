/**
 * Helper methods to deal with arrays.
 *
 * @export
 * @class ArrayHelper
 */
export default class ArrayHelper {
  /**
   * Construct a hash map from an array.
   *
   * @static
   * @template T
   * @template I
   * @param {T[]} [array=[]]
   * @param {I} index
   * @return {*}  {{ [key: string]: T }}
   * @memberof ArrayHelper
   */
  public static createHashMap<T, I extends keyof T>(
    array: T[] = [],
    index: I
  ): { [key: string]: T } {
    return array.reduce(
      (map, property) => ({ ...map, [(property as any)[index]]: property }),
      {}
    );
  }
}
