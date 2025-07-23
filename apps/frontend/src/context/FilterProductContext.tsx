import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

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
    const router = useRouter();
  const searchParams = useSearchParams()
 useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const titleFromUrl = searchParams.get("title");

    setSelectedCategory(categoryFromUrl ?? null);
    setSearchProducts(titleFromUrl ?? "");
  }, [searchParams])
 useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory) params.set("category", selectedCategory);
    if (searchProducts) params.set("title", searchProducts);

    const newUrl = `?${params.toString()}`;
    router.push(newUrl);
  }, [selectedCategory, searchProducts, router])

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
