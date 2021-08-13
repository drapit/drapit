Map.prototype.omit = function <K, V, O extends keyof V>(
  ...omit: O[]
): Map<K, Omit<V, O>> {
  const result = new Map<K, Omit<V, O>>();

  for (const key of this.keys()) {
    if (!omit.includes(key as O)) {
      result.set(key, this.get(key) as V);
    }
  }

  return result;
};

Map.prototype.toJSON = function <V>(): { [key: string]: V} {
  const result: { [key: string]: V} = {};

  for (const key of this.keys()) {
      result[key] = this.get(key) as V;
  }

  return result;
};
