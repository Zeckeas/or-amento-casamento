import React from 'react';
import { Star, Phone, Mail, Globe, Edit2, Trash2 } from 'lucide-react';
import { Supplier } from '../../types/supplier';
import { formatCurrency } from '../../utils/formatters';

interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({
  supplier,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: Supplier['status']) => {
    switch (status) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'meeting-scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{supplier.name}</h3>
          <p className="text-sm text-gray-500">{supplier.category}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(supplier)}
            className="p-2 text-gray-600 hover:text-pink-600 rounded-full hover:bg-pink-50"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(supplier.id)}
            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <a href={`tel:${supplier.phone}`} className="text-sm text-gray-600 hover:text-pink-600">
            {supplier.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <a href={`mailto:${supplier.email}`} className="text-sm text-gray-600 hover:text-pink-600">
            {supplier.email}
          </a>
        </div>
        {supplier.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <a
              href={supplier.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-pink-600"
            >
              {supplier.website}
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < supplier.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(supplier.price)}
        </span>
      </div>

      <div className="mt-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            supplier.status
          )}`}
        >
          {supplier.status}
        </span>
      </div>
    </div>
  );
};