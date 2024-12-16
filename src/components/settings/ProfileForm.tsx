import React, { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useSettingsStore } from '../../store/settingsStore';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';

interface FormErrors {
  [key: string]: string;
}

export const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useSettingsStore();
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const partnerName = formData.get('partnerName') as string;
    const partnerEmail = formData.get('partnerEmail') as string;
    const partnerPhone = formData.get('partnerPhone') as string;

    if (!validateRequired(name)) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!validatePhone(phone)) {
      newErrors.phone = 'Telefone inválido (00) 00000-0000';
    }

    if (!validateRequired(partnerName)) {
      newErrors.partnerName = 'Nome do parceiro é obrigatório';
    }

    if (!validateEmail(partnerEmail)) {
      newErrors.partnerEmail = 'E-mail do parceiro inválido';
    }

    if (!validatePhone(partnerPhone)) {
      newErrors.partnerPhone = 'Telefone do parceiro inválido (00) 00000-0000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (validateForm(formData)) {
      updateProfile({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        partnerName: formData.get('partnerName') as string,
        partnerEmail: formData.get('partnerEmail') as string,
        partnerPhone: formData.get('partnerPhone') as string,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Seu Nome"
          name="name"
          icon={User}
          defaultValue={profile.name}
          error={errors.name}
        />
        <Input
          label="Seu E-mail"
          name="email"
          type="email"
          icon={Mail}
          defaultValue={profile.email}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Seu Telefone"
          name="phone"
          icon={Phone}
          placeholder="(00) 00000-0000"
          defaultValue={profile.phone}
          error={errors.phone}
        />
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nome do Parceiro(a)"
          name="partnerName"
          icon={User}
          defaultValue={profile.partnerName}
          error={errors.partnerName}
        />
        <Input
          label="E-mail do Parceiro(a)"
          name="partnerEmail"
          type="email"
          icon={Mail}
          defaultValue={profile.partnerEmail}
          error={errors.partnerEmail}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Telefone do Parceiro(a)"
          name="partnerPhone"
          icon={Phone}
          placeholder="(00) 00000-0000"
          defaultValue={profile.partnerPhone}
          error={errors.partnerPhone}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Salvar Perfil</Button>
      </div>
    </form>
  );
};