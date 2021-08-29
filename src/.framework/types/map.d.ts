declare global {
  interface Map<K, V> {
    omit<O extends keyof V>(...omit: O[]): Map<K, Omit<V, O>>;
    pick<O extends keyof V>(...pick: O[]): Map<K, Pick<V, O>>;
    pickValueOf<O extends keyof V>(pick: O): Map<K, O>;
    toJSON<V>(): { [key: string]: V};    
  }
}

export {};
