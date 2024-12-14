import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { vendors as initialVendors } from '@/data/mockData';
import { Vendor } from '@/types';
import { VendorList } from '@/pages/vendors/components/vendor-list';
import { VendorForm } from '@/pages/vendors/components/vendor-form';
import { VendorComparison } from '@/pages/vendors/components/vendor-comparison';


export function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [showForm, setShowForm] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const handleSaveVendor = (vendor: Vendor) => {
    setVendors([...vendors, vendor]);
    setShowForm(false);
  };

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors((current) =>
      current.includes(vendorId)
        ? current.filter((id) => id !== vendorId)
        : [...current, vendorId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      {selectedVendors.length > 0 && (
        <VendorComparison
          vendors={vendors.filter((v) => selectedVendors.includes(v.id))}
          onClose={() => setSelectedVendors([])}
        />
      )}

      <VendorList
        vendors={vendors}
        selectedVendors={selectedVendors}
        onVendorSelect={toggleVendorSelection}
      />

      {showForm && (
        <VendorForm onClose={() => setShowForm(false)} onSave={handleSaveVendor} />
      )}
    </div>
  );
}