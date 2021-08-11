import Event from 'application/domain/events/Event';
import IEventListener from './IEventListener';

/**
 * Interface of application's event managers.
 *
 * @export
 * @interface IEventManager
 */
export default interface IEventManager {
  /**
   * Allows to subscribe event listeners.
   *
   * @template E
   * @template P
   * @param {IEventListener<E, P>} listener
   * @memberof IEventManager
   */
  subscribe<E, P>(listener: IEventListener<E, P>): void;

  /**
   * Allows to unsubscribe event listeners.
   *
   * @template E
   * @template P
   * @param {IEventListener<E, P>} listener
   * @memberof IEventManager
   */
  unsubscribe<E, P>(listener: IEventListener<E, P>): void;

  /**
   * Allows notify event listeners about new events.
   *
   * @template P
   * @param {Event<P>} event
   * @memberof IEventManager
   */
  notify<P>(event: Event<P>): void;
}
