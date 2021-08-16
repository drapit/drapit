/**
 * Convert an array of objects into a Map using the specified 
 * property as key and the object item as value.
 *
 * @template T
 * @template K
 * @template KT
 * @param {K} key
 * @return {*}  {Map<KT, T>}
 */
Array.prototype.toDictionary = function <T, K extends keyof T, KT>(
  key: K
): Map<KT, T> {
  return new Map<KT, T>(
    this.map((item) => [item[key], item]) as Iterable<readonly [KT, T]>
  );
};
