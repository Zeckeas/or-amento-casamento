import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'payment' | 'meeting' | 'appointment';
  amount?: number;
}

interface UpcomingEventsProps {
  events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Próximos Compromissos</h2>
        <Calendar className="h-6 w-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{event.title}</p>
              <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
            </div>
            {event.amount && (
              <div className="inline-flex items-center px-2 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
                {event.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
