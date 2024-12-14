import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categories as initialCategories } from '@/data/mockData';
import { Category } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { CategoryList } from './components/category-list';
import { CategoryForm } from './components/category-form';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categorias de Orçamento</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Orçamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
          </CardContent>
        </Card>
      </div>

      <CategoryList categories={categories} />
      {showForm && (
        <CategoryForm
          onClose={() => setShowForm(false)}
          onSave={(category) => {
            setCategories([...categories, category]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}