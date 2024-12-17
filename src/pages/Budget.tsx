import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBudgetStore } from '../store/budgetStore';
import { BudgetCategory, BudgetItem } from '../types/budget';
import { BudgetCategoryCard } from '../components/Budget/BudgetCategoryCard';
import { BudgetItemList } from '../components/Budget/BudgetItemList';
import { AddCategoryModal } from '../components/Budget/AddCategoryModal';
import { Button } from '../components/ui/Button';

export const Budget: React.FC = () => {
  const { categories } = useBudgetStore();
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditCategory = (category: BudgetCategory) => {
    setSelectedCategory(category);
  };

  const handleDeleteCategory = (id: string) => {
    // Implement delete confirmation modal
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      useBudgetStore.getState().removeCategory(id);
    }
  };

  const handleItemClick = (item: BudgetItem) => {
    // To be implemented: show item details modal
    console.log('Item clicked:', item);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Orçamento</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          icon={Plus}
        >
          Nova Categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <BudgetCategoryCard
            key={category.id}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Itens de {selectedCategory.name}
          </h2>
          <BudgetItemList
            items={selectedCategory.items}
            onItemClick={handleItemClick}
          />
        </div>
      )}

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};