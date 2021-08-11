import Event from "application/domain/events/Event";

/**
 * Interface of the event listeners in the system.
 *
 * @export
 * @interface IEventListener
 * @template E
 * @template P
 */
export default interface IEventListener<E extends Event<P> = Event<any>, P = void> {
  /**
   * Name of the event.
   *
   * @type {string}
   * @memberof IEventListener
   */
  type: string;

  /**
   * Callback that handles the event.
   *
   * @param {E} event
   * @return {*}  {Promise<void>}
   * @memberof IEventListener
   */
  handle(event: E): Promise<void>;
}
