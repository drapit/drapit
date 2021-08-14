Map.prototype.omit = function <K, V, O extends keyof V>(
  ...omit: O[]
): Map<K, Omit<V, O>> {
  const result = new Map<K, Omit<V, O>>();

  for (const key of this.keys()) {
    const value = this.get(key);
    const newValue: Partial<V> = {};

    for (const vKey of Object.keys(value)) {
      if (!omit.includes(vKey as O)) {
        (newValue as any)[vKey] = value[vKey];
      }
    }
    result.set(key, newValue as V);
  }

  return result;
};

Map.prototype.pick = function <K, V, O extends keyof V>(
  ...pick: O[]
): Map<K, Pick<V, O>> {
  const result = new Map<K, Pick<V, O>>();

  for (const key of this.keys()) {
    const value = this.get(key);
    const newValue: Partial<V> = {};

    for (const vKey of Object.keys(value)) {
      if (pick.includes(vKey as O)) {
        (newValue as any)[vKey] = value[vKey];
      }
    }
    result.set(key, newValue as V);
  }

  return result;
};

Map.prototype.pickOne = function <K, V, O extends keyof V>(
  pick: O
): Map<K, O> {
  const pickedMap = this.pick(pick);
  const newMap = new Map<K, O>();

  for (const key of pickedMap.keys()) {
    const value = pickedMap.get(key);
    if (value != null) {
      newMap.set(key, value[pick]);
    }
  }

  return newMap;
};

Map.prototype.toJSON = function <V>(): { [key: string]: V } {
  const result: { [key: string]: V } = {};

  for (const key of this.keys()) {
    result[key] = this.get(key) as V;
  }

  return result;
};
