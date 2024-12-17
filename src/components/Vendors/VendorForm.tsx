import React from 'react';
import { X } from 'lucide-react';
import { Vendor } from '../../types/vendors';
import { supabase } from '../../config/supabase';

type VendorFormProps = {
  onSubmit: (vendor: Omit<Vendor, 'id'>) => void;
  onClose: () => void;
  initialData?: Vendor;
};

export function VendorForm({ onSubmit, onClose, initialData }: VendorFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    service: initialData?.service || '',
    price: initialData?.price || 0,
    status: initialData?.status || 'pending',
    contact: initialData?.contact || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.price <= 0) {
      alert('O preço deve ser maior que zero.');
      return;
    }

    if (initialData) {
      // Atualizar fornecedor no Supabase
      const { error } = await supabase
        .from('vendors')
        .update({
          name: formData.name,
          service: formData.service,
          price: formData.price,
          status: formData.status,
          contact: formData.contact,
        })
        .eq('id', initialData.id);

      if (error) {
        console.error('Erro ao atualizar fornecedor:', error.message);
      } else {
        onSubmit(formData);
      }
    } else {
      // Adicionar novo fornecedor
      onSubmit(formData);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, ''); // Permitir apenas números e vírgulas/pontos
    setFormData({ ...formData, price: parseFloat(value.replace(',', '.')) });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {initialData ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Fornecedor</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
              aria-label="Nome do fornecedor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Serviço</label>
            <input
              type="text"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
              aria-label="Serviço do fornecedor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="text"
              value={formData.price.toFixed(2)}
              onChange={handlePriceChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
              min="0"
              step="0.01"
              aria-label="Valor do serviço"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Vendor['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              aria-label="Status do fornecedor"
            >
              <option value="pending">Pendente</option>
              <option value="partial">Parcial</option>
              <option value="paid">Pago</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contato</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              aria-label="Contato do fornecedor"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
            >
              {initialData ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
