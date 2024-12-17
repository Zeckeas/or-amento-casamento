export interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  spent: number;
  items: BudgetItem[];
  value: number; 
  status: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  supplier: string;
  price: number;
  paymentDate: string;
  status: 'pending' | 'partial' | 'paid';
  notes?: string;
  images?: string[];
}