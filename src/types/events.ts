export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'payment' | 'meeting' | 'task';
  description?: string;
  completed: boolean;
  category?: string;
}

export type EventType = Event['type'];