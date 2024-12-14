import { Card, CardContent } from '@/components/ui/card';
import { InspirationImage } from '@/types';

interface ImageGridProps {
  images: InspirationImage[];
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={image.url}
              alt={image.description || 'Inspiração de casamento'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{image.category}</span>
              </div>
              {image.description && (
                <p className="text-sm text-gray-600">{image.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
