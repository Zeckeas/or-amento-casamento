import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Vendor } from '@/types';

interface VendorFormProps {
  onClose: () => void;
  onSave: (vendor: Vendor) => void;
}

export function VendorForm({ onClose, onSave }: VendorFormProps) {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: crypto.randomUUID(),
      name,
      service,
      price: Number(price),
      contact,
      rating: rating ? Number(rating) : undefined,
      notes,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Fornecedor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Serviço
            </label>
            <Input
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contato
            </label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Avaliação (0-5)
            </label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}