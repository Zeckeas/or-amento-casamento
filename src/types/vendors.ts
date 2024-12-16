export type Vendor = {
  id: string;
  name: string;
  service: string;
  price: number;
  status: 'pending' | 'partial' | 'paid';
  contact: string;
};