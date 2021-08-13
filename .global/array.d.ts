declare global {
  interface Array<T> {
    toMap<K extends keyof T, KK>(key: K): Map<KK, T>;
  }
}

export {};
