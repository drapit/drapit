import IEventListener from "application/interfaces/IEventListener";
import IEventManager from "application/interfaces/IEventManager";
import Event from "application/domain/events/Event";
import { events } from "config";

// TODO: Auto subscribe event listeners.
export default class EventManager {

  private static manager: IEventManager = events.manager;

  public static subscribe<E>(listener: IEventListener<E>): void {
    this.manager.subscribe(listener);
  }

  public static unsubscribe<E>(listener: IEventListener<E>): void {
    this.manager.unsubscribe(listener);
  }

  public static notify<P>(event: Event<P>): void {
    this.manager.notify(event);
  }
}
