import React, { useState } from 'react';
import { BudgetCategory } from '../../types/budget'; // ou o tipo que estiver usando

type CategoryFormProps = {
  onSubmit: (category: Omit<BudgetCategory, 'id'>) => void; // Recebe dados da categoria
  onClose: () => void; // Função para fechar o formulário
};

export function CategoryForm({ onSubmit, onClose }: CategoryFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Pode adicionar uma lógica de validação, como garantir que o valor seja numérico
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || amount <= 0) {
      setError('Todos os campos devem ser preenchidos corretamente.');
      return;
    }
    onSubmit({ name, description, amount: Number(amount) }); // Chama a função de submit passando os dados da categoria
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Adicionar Categoria</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valor</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
