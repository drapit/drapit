declare global {
  interface Map<K, V> {
    omit<O extends keyof V>(...omit: O[]): Map<K, Omit<V, O>>;
    toJSON<V>(): { [key: string]: V};
  }
}

export {};
