import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  appointments: Appointment[];
}

export function Calendar({ selectedDate, onDateSelect, appointments }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const hasAppointment = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return appointments.some(
      (apt) => new Date(apt.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: weeks }).map((_, weekIndex) => (
          Array.from({ length: 7 }).map((_, dayIndex) => {
            const dayNumber = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              dayNumber
            );

            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => isCurrentMonth && onDateSelect(date)}
                className={cn(
                  'h-12 text-sm rounded-md',
                  isCurrentMonth
                    ? 'hover:bg-gray-100'
                    : 'text-gray-300 cursor-not-allowed',
                  date.toDateString() === selectedDate.toDateString() &&
                    'bg-primary text-white hover:bg-primary/90',
                  hasAppointment(dayNumber) &&
                    date.toDateString() !== selectedDate.toDateString() &&
                    'font-bold text-indigo-600'
                )}
                disabled={!isCurrentMonth}
              >
                {isCurrentMonth ? dayNumber : ''}
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
}