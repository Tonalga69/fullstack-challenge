import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Category } from "../interfaces/note";

interface CategoriesStore {
  categories: Category[];
   selectedCategory: Category | null | undefined;
   setSelectedCategory: (category?: Category) => void;
  addCategories: (categories: Category[]) => void;
}

const useCategoriesStore = create<CategoriesStore>()(
  devtools(
    persist(
      (set) => ({
        categories: [],
        selectedCategory: null,
        setSelectedCategory: (category?: Category) => set({ selectedCategory: category }),
        addCategories: (categories: Category[]) => set({ categories }),
      }),
      {
        name: "categories-store",
      }
    )
  )
);


export default useCategoriesStore;