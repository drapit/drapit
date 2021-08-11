import InMemoryEventManager from "infrastructure/event-managers/InMemoryEventManager";

// Implementation of the event manager you want the application to use.
export const manager = new InMemoryEventManager();
