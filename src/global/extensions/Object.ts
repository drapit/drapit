Object.prototype.toMap = function <K extends keyof V, V, O>(
  transform: (key: K, value?: V) => O
): Map<K, O> {
  const entries = Object.entries(this).map(([key, value]) =>
    [key, transform(key as K, value)]
  );

  return new Map(entries as Iterable<readonly [K, O]>);
};
