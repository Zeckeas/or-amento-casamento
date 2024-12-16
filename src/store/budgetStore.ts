import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BudgetCategory } from '../types/budget';

interface BudgetStore {
  categories: BudgetCategory[];
  totalBudget: number;
  setTotalBudget: (amount: number) => void;
  addCategory: (category: BudgetCategory) => void;
  updateCategory: (id: string, category: Partial<BudgetCategory>) => void;
  removeCategory: (id: string) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      categories: [],
      totalBudget: 0,
      setTotalBudget: (amount) => set({ totalBudget: amount }),
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...updatedCategory } : cat
          ),
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        })),
    }),
    {
      name: 'wedding-budget',
    }
  )
);