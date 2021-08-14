declare global {
  interface Object {
    toMap<V, K extends keyof V, O>(
      transform: (key: K, value?: V) => O
    ): Map<K, O>;
  }
}

export {};
