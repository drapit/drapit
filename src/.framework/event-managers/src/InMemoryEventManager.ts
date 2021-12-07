import IEventListener from "application/interfaces/IEventListener";
import IEventManager from "application/interfaces/IEventManager";
import Event from 'application/domain/events/Event';

/**
 * In memory implementation of the IEventManager interface.
 *
 * @export
 * @class InMemoryEventManager
 * @implements {IEventManager}
 */
export default class InMemoryEventManager implements IEventManager {

  /**
   * All subscribed listeners. 
   *
   * @private
   * @type {IEventListener[]}
   * @memberof InMemoryEventManager
   */
  private listeners: IEventListener[];

  /**
   * Creates an instance of InMemoryEventManager.
   * @memberof InMemoryEventManager
   */
  public constructor() {
    this.listeners = [];
  }

  /**
   * Allows to subscribe listeners.
   *
   * @template E
   * @template P
   * @param {IEventListener<E, P>} listener
   * @memberof InMemoryEventManager
   */
  public subscribe<E, P>(listener: IEventListener<E, P>): void {
    this.listeners.push(listener);
  }

  /**
   * Allows to unsubscribe listeners.
   *
   * @template E
   * @template P
   * @param {IEventListener<E, P>} listener
   * @memberof InMemoryEventManager
   */
  public unsubscribe<E, P>(listener: IEventListener<E, P>): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Allows to notify listeners about a new event.
   *
   * @template P
   * @param {Event<P>} event
   * @memberof InMemoryEventManager
   */
  public notify<P>(event: Event<P>): void {
    this.listeners
      .filter(listener => listener.type === event.constructor.name)
      .forEach(listener => {
        listener.handle(event);
      });
  }
}
