import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Event } from '../types/events';
import { EventCard } from '../components/timeline/EventCard';

// Temporary mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Reunião com Decorador',
    date: '2024-04-15',
    type: 'meeting',
    description: 'Discussão sobre o tema e cores do casamento',
    completed: false,
    category: 'Decoração',
  },
  {
    id: '2',
    title: 'Pagamento do Buffet',
    date: '2024-04-20',
    type: 'payment',
    description: 'Primeira parcela do buffet',
    completed: false,
    category: 'Buffet',
  },
];

export const Timeline: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const toggleEventComplete = (id: string) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Cronograma</h1>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700">
          <Plus className="w-5 h-5" />
          Novo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onToggleComplete={toggleEventComplete}
          />
        ))}
      </div>
    </div>
  );
};