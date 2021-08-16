declare global {
  interface Array<T> {
    toDictionary<K extends keyof T, KT>(key: K): Map<KT, T>;
  }
}

export {};
