import { create } from 'zustand';
import { InspirationItem, InspirationCategory } from '../types/inspiration';

interface InspirationStore {
  items: InspirationItem[];
  categories: InspirationCategory[];
  addItem: (item: InspirationItem) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addCategory: (category: InspirationCategory) => void;
}

export const useInspirationStore = create<InspirationStore>((set) => ({
  items: [],
  categories: [
    { id: '1', name: 'Decoração', slug: 'decoracao' },
    { id: '2', name: 'Vestidos', slug: 'vestidos' },
    { id: '3', name: 'Bolos', slug: 'bolos' },
    { id: '4', name: 'Flores', slug: 'flores' },
    { id: '5', name: 'Convites', slug: 'convites' },
  ],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  toggleFavorite: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      ),
    })),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
}));