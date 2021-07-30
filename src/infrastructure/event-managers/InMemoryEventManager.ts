import IEventListener from "application/interfaces/IEventListener";
import IEventManager from "application/interfaces/IEventManager";
import Event from 'application/domain/events/Event';

export default class InMemoryEventManager implements IEventManager {

  private listeners: IEventListener[];

  public constructor() {
    this.listeners = [];
  }

  public subscribe<E>(listener: IEventListener<E>): void {
    this.listeners.push(listener);
  }

  public unsubscribe<E>(listener: IEventListener<E>): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public notify<P>(event: Event<P>): void {
    this.listeners
      .filter(listener => listener.type === event.constructor.name)
      .forEach(listener => {
        listener.handle(event);
      });
  }
}
