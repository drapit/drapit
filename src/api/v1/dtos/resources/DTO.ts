export default class DTO<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(_: Partial<T>) {
    // The constructor is needed for @AutoAssign to work
  }
}
