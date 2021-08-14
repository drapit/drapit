Array.prototype.toMap = function <T, K extends keyof T, KT>(
  key: K
): Map<KT, T> {
  return new Map<KT, T>(
    this.map((item) => [item[key], item]) as Iterable<readonly [KT, T]>
  );
};
