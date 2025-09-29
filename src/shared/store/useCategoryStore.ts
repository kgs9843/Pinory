import { create } from 'zustand';

import { initialCategories } from '../config/dummyCategories';
import { Category } from '../types';

interface CategoryStore {
  expanded: boolean;
  categories: Category[];
  selectedCategory: Category | null;

  toggleExpanded: () => void;
  setExpanded: (value: boolean) => void;
  selectCategory: (category: Category) => void;
  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>(set => ({
  expanded: false,
  categories: initialCategories,
  selectedCategory: null,

  toggleExpanded: () => set(state => ({ expanded: !state.expanded })),
  setExpanded: value => set({ expanded: value }),
  selectCategory: category => set({ selectedCategory: category, expanded: false }),
  addCategory: category => set(state => ({ categories: [...state.categories, category] })),
  removeCategory: id => set(state => ({ categories: state.categories.filter(c => c.id !== id) })),
}));
