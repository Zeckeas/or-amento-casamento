import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useBudgetStore } from '../../store/budgetStore';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const addCategory = useBudgetStore((state) => state.addCategory);
  const [name, setName] = useState('');
  const [planned, setPlanned] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && planned) {
      addCategory({
        id: crypto.randomUUID(),
        name,
        planned: Number(planned),
        spent: 0,
        items: [],
      });
      
      onClose();
      setName('');
      setPlanned('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Categoria de Orçamento"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome da Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Decoração, Buffet, etc."
          required
        />
        <Input
          label="Valor Planejado"
          type="number"
          value={planned}
          onChange={(e) => setPlanned(e.target.value)}
          placeholder="0.00"
          required
        />
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Adicionar Categoria
          </Button>
        </div>
      </form>
    </Modal>
  );
};