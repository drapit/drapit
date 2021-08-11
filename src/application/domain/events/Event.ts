/**
 * Base class for events.
 *
 * @export
 * @abstract
 * @class Event
 * @template T
 */
export default abstract class Event<T = void> {
  /**
   * Event's payload.
   *
   * @type {T}
   * @memberof Event
   */
  public readonly payload?: T;

  /**
   * Creates an instance of Event.
   * @param {T} [payload]
   * @memberof Event
   */
  protected constructor(payload?: T) {
    this.payload = payload;
  }
}
