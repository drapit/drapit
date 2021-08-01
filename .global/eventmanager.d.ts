declare global {
  class Event<T> {
    public readonly payload?: T;
  }
  
  interface IEventListener<E = unknown> {
    type: string;
    handle(event: E): Promise<void>;
  }
  
  interface IEventManager {
    subscribe<E>(listener: IEventListener<E>): void;
    unsubscribe<E>(listener: IEventListener<E>): void;
    notify<P>(event: Event<P>): void;
  }

  declare let EventManager: IEventManager;
}

export {};
