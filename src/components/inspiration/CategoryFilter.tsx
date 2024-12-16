import React from 'react';
import { InspirationCategory } from '../../types/inspiration';

interface CategoryFilterProps {
  categories: InspirationCategory[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          selectedCategory === null
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.slug)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category.slug
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};