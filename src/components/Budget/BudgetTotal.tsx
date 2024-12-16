import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

type BudgetTotalProps = {
  totalBudget: number;
  onBudgetChange: (value: number) => void;
};

export function BudgetTotal({ totalBudget, onBudgetChange }: BudgetTotalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setError('O orçamento não pode ser negativo.');
    } else {
      setError(null);
      onBudgetChange(value);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        Orçamento Total
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          value={totalBudget}
          onChange={handleChange}
          className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
