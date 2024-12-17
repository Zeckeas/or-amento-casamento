import React from 'react';
import { BudgetCategory } from '../../types/budget'; // Corrigido para importar BudgetCategory
import { getStatusColor } from '../../utils/statusColors';

type CategoryItemProps = {
  category: BudgetCategory; // Alterado para BudgetCategory
};

export function CategoryItem({ category }: CategoryItemProps) {
  const statusColor = getStatusColor(category.status);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900 text-lg">{category.name}</h4>
          <p className="text-sm text-gray-500">{category.vendor}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
          >
            {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
