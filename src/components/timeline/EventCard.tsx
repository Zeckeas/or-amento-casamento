import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { Event } from '../../types/events';
import { formatDate } from '../../utils/formatters';

interface EventCardProps {
  event: Event;
  onToggleComplete: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onToggleComplete }) => {
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'task':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${
      event.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
            {event.type}
          </span>
          <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
          {event.description && (
            <p className="text-gray-600 mt-1">{event.description}</p>
          )}
        </div>
        <button
          onClick={() => onToggleComplete(event.id)}
          className={`p-2 rounded-full ${
            event.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
          }`}
        >
          <CheckCircle className={`w-6 h-6 ${event.completed ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.date)}</span>
        </div>
        {event.category && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{event.category}</span>
          </div>
        )}
      </div>
    </div>
  );
};