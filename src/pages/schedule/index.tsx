import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { appointments as initialAppointments } from '@/data/mockData';
import { AppointmentList } from './components/appointment-list';
import { AppointmentForm } from './components/appointment-form';
import { Calendar } from './components/calendar';
import { Appointment } from '@/types';

export function Schedule() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Cronograma</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Compromisso
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                appointments={appointments}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Próximos Compromissos</CardTitle>
              <CalendarIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <AppointmentList appointments={appointments} />
            </CardContent>
          </Card>
        </div>
      </div>

      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
          onSave={handleSaveAppointment}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}