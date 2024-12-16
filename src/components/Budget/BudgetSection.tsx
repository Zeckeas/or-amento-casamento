import React, { useState } from 'react';
import { BudgetChart } from './BudgetChart';
import { BudgetTotal } from './BudgetTotal';
import { CategoryList } from './CategoryList';
import { Category } from '../../types/budget';
import { calculateTotalSpent } from '../../utils/budgetCalculations';

export function BudgetSection() {
  const [totalBudget, setTotalBudget] = useState(50000);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<{ name: string; value: number; status: string }>({
    name: '',
    value: 0,
    status: 'Pendente',
  });

  const totalSpent = calculateTotalSpent(categories);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.value > 0) {
      setCategories([...categories, { ...newCategory }]);
      setNewCategory({ name: '', value: 0, status: 'Pendente' }); // Reset form after adding
    }
  };

  return (
    <section id="budget" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Orçamento</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <BudgetTotal 
              totalBudget={totalBudget}
              onBudgetChange={setTotalBudget}
            />
            <BudgetChart totalBudget={totalBudget} spent={totalSpent} />
          </div>

          <CategoryList 
            categories={categories}
            onAddCategory={handleAddCategory}
          />
          
          {/* Formulário para adicionar nova categoria */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Adicionar Nova Categoria</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nome da Categoria"
              />
              <input
                type="number"
                value={newCategory.value}
                onChange={(e) => setNewCategory({ ...newCategory, value: parseFloat(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Valor"
              />
              <select
                value={newCategory.status}
                onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>
                <option value="Parcial">Parcial</option>
              </select>
              <button
                onClick={handleAddCategory}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Adicionar Categoria
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
