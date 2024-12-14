import React from 'react';
import { PieChart, DollarSign, Calendar } from 'lucide-react';

interface BudgetSummaryProps {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
}

export function BudgetSummary({ totalBudget, spentAmount, remainingAmount }: BudgetSummaryProps) {
  const spentPercentage = (spentAmount / totalBudget) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Orçamento Total */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Orçamento Total</h3>
          <DollarSign className="h-6 w-6 text-emerald-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {totalBudget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>

      {/* Valor Gasto */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Valor Gasto</h3>
          <PieChart className="h-6 w-6 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {spentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <p className="text-sm text-gray-500 mt-2">{spentPercentage.toFixed(1)}% do orçamento</p>
      </div>

      {/* Saldo Restante */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Saldo Restante</h3>
          <Calendar className="h-6 w-6 text-purple-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {remainingAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    </div>
  );
}
