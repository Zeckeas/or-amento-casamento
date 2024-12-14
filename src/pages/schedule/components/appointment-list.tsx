import { Appointment } from '@/types';

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedAppointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex flex-col space-y-1 border-b pb-4 last:border-0"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{appointment.title}</span>
            <span className="text-sm text-gray-500">
              {new Date(appointment.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <span className="text-sm text-gray-500 capitalize">{appointment.type}</span>
          {appointment.notes && (
            <p className="text-sm text-gray-600">{appointment.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}