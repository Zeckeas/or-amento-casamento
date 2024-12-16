import { create } from 'zustand';
import { Supplier, SupplierCategory } from '../types/supplier';

interface SupplierStore {
  suppliers: Supplier[];
  categories: SupplierCategory[];
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  removeSupplier: (id: string) => void;
}

export const useSupplierStore = create<SupplierStore>((set) => ({
  suppliers: [],
  categories: [
    { id: '1', name: 'Buffet', icon: 'utensils' },
    { id: '2', name: 'Decoração', icon: 'palette' },
    { id: '3', name: 'Fotografia', icon: 'camera' },
    { id: '4', name: 'Música', icon: 'music' },
    { id: '5', name: 'Vestuário', icon: 'shirt' },
  ],
  addSupplier: (supplier) =>
    set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  updateSupplier: (id, updatedSupplier) =>
    set((state) => ({
      suppliers: state.suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier
      ),
    })),
  removeSupplier: (id) =>
    set((state) => ({
      suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
    })),
}));