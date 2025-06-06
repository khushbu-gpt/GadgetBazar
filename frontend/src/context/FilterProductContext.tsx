import { createContext, useState } from "react";


type FilterProductContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
};

export const FilterProductCategory = createContext<FilterProductContextType>({
  selectedCategory:null,
  setSelectedCategory: () => {},
});

export const FilterProductCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string| null>(null);

  return (
    <FilterProductCategory.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </FilterProductCategory.Provider>
  );
};

