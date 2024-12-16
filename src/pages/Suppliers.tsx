import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSupplierStore } from '../store/supplierStore';
import { SupplierCard } from '../components/suppliers/SupplierCard';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Supplier } from '../types/supplier';

export const Suppliers: React.FC = () => {
  const { suppliers, categories } = useSupplierStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDeleteSupplier = (id: string) => {
    // To be implemented
    console.log('Delete supplier:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Fornecedores</h1>
        <Button
          onClick={() => {
            setSelectedSupplier(null);
            setIsModalOpen(true);
          }}
          icon={Plus}
        >
          Novo Fornecedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onEdit={handleEditSupplier}
            onDelete={handleDeleteSupplier}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      >
        <form className="space-y-4">
          <Input
            label="Nome"
            placeholder="Nome do fornecedor"
            defaultValue={selectedSupplier?.name}
          />
          <Select
            label="Categoria"
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            defaultValue={selectedSupplier?.category}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              defaultValue={selectedSupplier?.phone}
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="email@exemplo.com"
              defaultValue={selectedSupplier?.email}
            />
          </div>
          <Input
            label="Website"
            type="url"
            placeholder="https://exemplo.com"
            defaultValue={selectedSupplier?.website}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preço"
              type="number"
              placeholder="0,00"
              defaultValue={selectedSupplier?.price}
            />
            <Select
              label="Status"
              options={[
                { value: 'contacted', label: 'Contactado' },
                { value: 'meeting-scheduled', label: 'Reunião Agendada' },
                { value: 'hired', label: 'Contratado' },
                { value: 'rejected', label: 'Rejeitado' },
              ]}
              defaultValue={selectedSupplier?.status}
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};