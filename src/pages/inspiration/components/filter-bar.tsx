interface FilterBarProps {
  categories: string[];
  tags: string[];
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export function FilterBar({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagsChange,
}: FilterBarProps) {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoria
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="all">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}