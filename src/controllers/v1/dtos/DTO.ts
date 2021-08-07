export default class DTO<T> {
  [key: string]: unknown;

  public constructor(params: Partial<T> = {}) {
    Object.keys(params).forEach((property: keyof DTO<T>) => {
      (this as DTO<T>)[property] = (params as DTO<T>)[property];
    });
  }
}
