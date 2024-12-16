import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Palette } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useSettingsStore } from '../../store/settingsStore';
import { validateRequired, validateNumber, validateDate } from '../../utils/validation';

interface FormErrors {
  [key: string]: string;
}

export const SettingsForm: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};

    const date = formData.get('date') as string;
    const venue = formData.get('venue') as string;
    const guests = Number(formData.get('numberOfGuests'));
    const budget = Number(formData.get('budget'));

    if (!validateDate(date)) {
      newErrors.date = 'A data deve ser futura';
    }

    if (!validateRequired(venue)) {
      newErrors.venue = 'Local é obrigatório';
    }

    if (!validateNumber(guests)) {
      newErrors.numberOfGuests = 'Número de convidados inválido';
    }

    if (!validateNumber(budget)) {
      newErrors.budget = 'Orçamento inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (validateForm(formData)) {
      updateSettings({
        date: formData.get('date') as string,
        venue: formData.get('venue') as string,
        numberOfGuests: Number(formData.get('numberOfGuests')),
        budget: Number(formData.get('budget')),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Data do Casamento"
          name="date"
          type="date"
          icon={Calendar}
          defaultValue={settings.date}
          error={errors.date}
        />
        <Input
          label="Local"
          name="venue"
          icon={Users}
          defaultValue={settings.venue}
          error={errors.venue}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Número de Convidados"
          name="numberOfGuests"
          type="number"
          icon={Users}
          defaultValue={settings.numberOfGuests}
          error={errors.numberOfGuests}
        />
        <Input
          label="Orçamento Total"
          name="budget"
          type="number"
          icon={DollarSign}
          defaultValue={settings.budget}
          error={errors.budget}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Cor Principal"
          name="primaryColor"
          type="color"
          icon={Palette}
          defaultValue={settings.theme.primaryColor}
        />
        <Input
          label="Cor Secundária"
          name="secondaryColor"
          type="color"
          icon={Palette}
          defaultValue={settings.theme.secondaryColor}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Salvar Configurações</Button>
      </div>
    </form>
  );
};