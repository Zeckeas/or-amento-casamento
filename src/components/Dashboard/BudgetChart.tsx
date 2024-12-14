import React from 'react';
import { PieChart } from 'lucide-react';

interface Category {
  name: string;
  spent: number;
  color: string;
}

interface BudgetChartProps {
  categories: Category[];
  totalBudget: number;
}

export function BudgetChart({ categories, totalBudget }: BudgetChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Distribuição do Orçamento</h2>
        <PieChart className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = totalBudget > 0 ? (category.spent / totalBudget) * 100 : 0;
          
          return (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{category.name}</span>
                <span className="text-gray-500">
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: category.color || "#4CAF50", // cor padrão
                  }}
                  role="progressbar"
                  aria-label={`Categoria: ${category.name}, Percentual: ${percentage.toFixed(1)}%`}
                  aria-valuenow={percentage}
                  aria-valuemax={100}
                  aria-valuemin={0}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
