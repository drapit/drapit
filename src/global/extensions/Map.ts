/**
 * Creates a new map with same keys and the values 
 * do not have the specified properties omitted.
 *
 * @template K
 * @template V
 * @template O
 * @param {...O[]} omit
 * @return {*}  {Map<K, Omit<V, O>>}
 */
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

/**
 * Creates a new map with same keys and the values 
 * have only the specified properties.
 *
 * @template K
 * @template V
 * @template O
 * @param {...O[]} pick
 * @return {*}  {Map<K, Pick<V, O>>}
 */
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

/**
 * Creates a new map with same keys but the values 
 * are the values of the specified property.
 *
 * @template K
 * @template V
 * @template O
 * @param {O} pick
 * @return {*}  {Map<K, O>}
 */
Map.prototype.pickValueOf = function <K, V, O extends keyof V>(
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

/**
 * Creates a JSON object with same key/value associations.
 *
 * @template V
 * @return {*}  {{ [key: string]: V }}
 */
Map.prototype.toJSON = function <V>(): { [key: string]: V } {
  const result: { [key: string]: V } = {};

  for (const key of this.keys()) {
    result[key] = this.get(key) as V;
  }

  return result;
};
