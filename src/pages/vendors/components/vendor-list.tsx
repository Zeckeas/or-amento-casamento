import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Phone, DollarSign } from 'lucide-react';
import { Vendor } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface VendorListProps {
  vendors: Vendor[];
  selectedVendors: string[];
  onVendorSelect: (vendorId: string) => void;
}

export function VendorList({ vendors, selectedVendors, onVendorSelect }: VendorListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <Card
          key={vendor.id}
          className={`${
            selectedVendors.includes(vendor.id) ? 'ring-2 ring-indigo-500' : ''
          }`}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{vendor.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVendorSelect(vendor.id)}
              >
                {selectedVendors.includes(vendor.id) ? 'Selecionado' : 'Comparar'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <DollarSign className="h-4 w-4 mr-2" />
                {formatCurrency(vendor.price)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                {vendor.contact}
              </div>
              {vendor.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{vendor.rating}/5</span>
                </div>
              )}
              {vendor.notes && (
                <p className="text-sm text-gray-600 mt-2">{vendor.notes}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}