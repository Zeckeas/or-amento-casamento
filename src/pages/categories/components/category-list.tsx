import { Category } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Orçamento</p>
                <p className="text-lg font-semibold">{formatCurrency(category.budget)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gasto</p>
                <p className="text-lg font-semibold">{formatCurrency(category.spent)}</p>
              </div>
            </div>
            {category.items.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Itens</p>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="text-sm">{formatCurrency(item.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}