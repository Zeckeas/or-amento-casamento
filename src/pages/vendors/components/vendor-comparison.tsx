import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Star } from 'lucide-react';
import { Vendor } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface VendorComparisonProps {
  vendors: Vendor[];
  onClose: () => void;
}

export function VendorComparison({ vendors, onClose }: VendorComparisonProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Comparação de Fornecedores</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nome</th>
                <th className="text-left py-2">Serviço</th>
                <th className="text-left py-2">Preço</th>
                <th className="text-left py-2">Avaliação</th>
                <th className="text-left py-2">Contato</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="border-b">
                  <td className="py-2">{vendor.name}</td>
                  <td className="py-2">{vendor.service}</td>
                  <td className="py-2">{formatCurrency(vendor.price)}</td>
                  <td className="py-2">
                    {vendor.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{vendor.rating}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2">{vendor.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}