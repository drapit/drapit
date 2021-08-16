declare global {
  interface Array<T> {
    toDictionary<K extends keyof T, KK>(key: K): Map<KK, T>;
  }
}

export {};
