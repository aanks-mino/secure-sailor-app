
type EventCallback = (data: any) => void;

class FederationEventBus {
  private events: Map<string, Set<EventCallback>>;

  constructor() {
    this.events = new Map();
    // Make the event bus globally accessible for host application
    (window as any).federationEvents = this;
  }

  subscribe(eventName: string, callback: EventCallback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName)?.add(callback);

    // Return unsubscribe function
    return () => {
      this.events.get(eventName)?.delete(callback);
    };
  }

  emit(eventName: string, data: any) {
    this.events.get(eventName)?.forEach(callback => callback(data));
  }
}

export const federationEvents = new FederationEventBus();
