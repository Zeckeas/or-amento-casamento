import React, { useState } from 'react';
import { BudgetChart } from './BudgetChart';
import { PlusCircle, DollarSign } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  vendor: string;
  amount: number;
  status: 'pending' | 'paid' | 'partial';
};

export function BudgetSection() {
  const [totalBudget, setTotalBudget] = useState(50000);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    vendor: '',
    amount: 0,
  });

  const totalSpent = categories.reduce((acc, cat) => acc + cat.amount, 0);

  return (
    <section id="budget" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Orçamento</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
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
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <BudgetChart totalBudget={totalBudget} spent={totalSpent} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Categorias</h3>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Nova Categoria
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.vendor}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        R$ {category.amount.toLocaleString()}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.status === 'paid' ? 'bg-green-100 text-green-800' :
                        category.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}