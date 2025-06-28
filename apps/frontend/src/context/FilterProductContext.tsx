import { createContext, useState } from "react";

type FilterProductContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  searchProducts: string;
  setSearchProducts: (value: string) => void;
};

export const FilterProductCategory = createContext<FilterProductContextType>({
  selectedCategory: null,
  setSelectedCategory: () => {},
  searchProducts: "",
  setSearchProducts: () => {},
});

export const FilterProductCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchProducts, setSearchProducts] = useState("");

  return (
    <FilterProductCategory.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        searchProducts,
        setSearchProducts
      }}
    >
      {children}
    </FilterProductCategory.Provider>
  );
};
