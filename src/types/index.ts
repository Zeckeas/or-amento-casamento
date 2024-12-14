export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
  items: BudgetItem[];
}

export interface BudgetItem {
  id: string;
  name: string;
  price: number;
  vendorId?: string;
  status: 'pending' | 'paid' | 'partial';
  dueDate?: string;
  notes?: string;
  images?: string[];
}

export interface Vendor {
  id: string;
  name: string;
  service: string;
  price: number;
  rating?: number;
  contact: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'payment' | 'trial' | 'other';
  vendorId?: string;
  notes?: string;
}

export interface InspirationImage {
  id: string;
  url: string;
  category: string;
  description?: string;
  tags: string[];
}