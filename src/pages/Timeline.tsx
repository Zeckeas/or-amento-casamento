import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../config/supabase';  // Importa a configuração do Supabase
import { EventCard } from '../components/timeline/EventCard';  // Importa o card para exibição de eventos

// Tipo para definir os dados dos eventos
type Event = {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  completed: boolean;
  category: string;
};

export const Timeline: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);  // Armazena os eventos
  const [showForm, setShowForm] = useState(false);    // Controla a exibição do formulário
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    title: '',
    date: '',
    type: 'meeting',
    description: '',
    completed: false,
    category: '',
  });  // Dados do novo evento

  // Carregar eventos ao montar o componente
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Erro ao carregar eventos:', error.message);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  // Função para salvar um novo evento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Obter o usuário autenticado
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
      alert('Você precisa estar logado para adicionar um evento!');
      return;
    }

    // Adicionar o user_id ao evento
    const { data, error: insertError } = await supabase
      .from('events')
      .insert([
        {
          user_id: user.id, // Adiciona o user_id ao evento
          title: newEvent.title,
          event_date: newEvent.date,
          type: newEvent.type,
          description: newEvent.description,
          category: newEvent.category,
          completed: newEvent.completed,
        }
      ]);

    if (insertError) {
      console.error('Erro ao salvar evento:', insertError.message);
      alert('Erro ao salvar evento!');
    } else {
      setEvents((prevEvents) => [...prevEvents, ...data]); // Atualiza a lista de eventos
      setShowForm(false); // Fecha o formulário
      setNewEvent({
        id: '',
        title: '',
        date: '',
        type: 'meeting',
        description: '',
        completed: false,
        category: '',
      }); // Limpa os campos após salvar
    }
  };

  // Função para alternar o status de conclusão do evento
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
        <button
          onClick={() => setShowForm(!showForm)}  // Abre ou fecha o formulário
          className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
        >
          <Plus className="w-5 h-5" />
          Novo Evento
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Título do evento"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            placeholder="Descrição"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={newEvent.category}
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Salvar Evento
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
