import Event from 'application/domain/events/Event';
import IEventListener from './IEventListener';

export default interface IEventManager {
  subscribe<E>(listener: IEventListener<E>): void;
  unsubscribe<E>(listener: IEventListener<E>): void;
  notify<P>(event: Event<P>): void;
}
