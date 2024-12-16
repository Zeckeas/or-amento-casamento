import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useInspirationStore } from '../store/inspirationStore';
import { InspirationCard } from '../components/inspiration/InspirationCard';
import { CategoryFilter } from '../components/inspiration/CategoryFilter';
import { InspirationItem } from '../types/inspiration';

export const Inspiration: React.FC = () => {
  const { items, categories, toggleFavorite } = useInspirationStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const handleItemClick = (item: InspirationItem) => {
    // To be implemented: show modal with details
    console.log('Item clicked:', item);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Inspirações</h1>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700">
          <Plus className="w-5 h-5" />
          Nova Inspiração
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <InspirationCard
            key={item.id}
            item={item}
            onFavorite={toggleFavorite}
            onClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};