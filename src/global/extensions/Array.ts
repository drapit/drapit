Array.prototype.toMap = function <T, K extends keyof T, KK>(key: K): Map<KK, T> {
  return new Map<KK, T>(this.map(item => ([item[key as K], item])));
};
