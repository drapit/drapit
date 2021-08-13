import ObjectHelper from "./ObjectHelper";

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
   * @param {I} key
   * @return {*}  {{ [key: string]: T }}
   * @memberof ArrayHelper
   */
  public static createHashMap<T, K extends keyof T>(
    key: K,
    array: T[] = [],
    ...omit: K[]
  ): { [key: string]: T } {
    return array.reduce(
      (map, item) => ({ ...map, [(item as any)[key]]: ObjectHelper.omit(item, ...omit) }),
      {}
    );
  }
}
