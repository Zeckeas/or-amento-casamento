export interface Supplier {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  price: number;
  notes?: string;
  status: 'contacted' | 'meeting-scheduled' | 'hired' | 'rejected';
}

export interface SupplierCategory {
  id: string;
  name: string;
  icon: string;
}