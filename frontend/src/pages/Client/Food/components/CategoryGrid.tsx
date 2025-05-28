import React from "react";
import { Category } from "../types";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-4 shadow-sm">  
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
