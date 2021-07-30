export default interface IEventListener<E = unknown> {
  type: string;
  handle(event: E): Promise<void>;
}
