export default abstract class Event<T> {
  public readonly payload?: T;

  protected constructor(payload?: T) {
    this.payload = payload;
  }
}
