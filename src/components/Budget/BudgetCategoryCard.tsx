import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { BudgetCategory } from '../../types/budget';
import { formatCurrency } from '../../utils/formatters';

interface BudgetCategoryCardProps {
  category: BudgetCategory;
  onEdit: (category: BudgetCategory) => void;
  onDelete: (id: string) => void;
}

export const BudgetCategoryCard: React.FC<BudgetCategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const progress = (category.spent / category.planned) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <p className="text-sm text-gray-500">
            {formatCurrency(category.spent)} de {formatCurrency(category.planned)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-gray-600 hover:text-pink-600 rounded-full hover:bg-pink-50"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-pink-600 h-2 rounded-full transition-all"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {category.items.length} {category.items.length === 1 ? 'item' : 'itens'}
        </p>
      </div>
    </div>
  );
};