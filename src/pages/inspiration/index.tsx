import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { inspirationImages as initialImages } from '@/data/mockData';
import { InspirationImage } from '@/types';
import { ImageGrid } from './components/image-grid';
import { ImageForm } from './components/image-form';
import { FilterBar } from './components/filter-bar';

export function Inspiration() {
  const [images, setImages] = useState<InspirationImage[]>(initialImages);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = Array.from(
    new Set(images.map((img) => img.category))
  );

  const tags = Array.from(
    new Set(images.flatMap((img) => img.tags))
  );

  const filteredImages = images.filter((img) => {
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => img.tags.includes(tag));
    return matchesCategory && matchesTags;
  });

  const handleSaveImage = (image: InspirationImage) => {
    setImages([...images, image]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Galeria de Inspiração</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Imagem
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterBar
            categories={categories}
            tags={tags}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={setSelectedCategory}
            onTagsChange={setSelectedTags}
          />
        </CardContent>
      </Card>

      <ImageGrid images={filteredImages} />

      {showForm && (
        <ImageForm
          onClose={() => setShowForm(false)}
          onSave={handleSaveImage}
          existingCategories={categories}
          existingTags={tags}
        />
      )}
    </div>
  ); // Fechamento da função 'Inspiration'
}
