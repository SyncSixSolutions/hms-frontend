import React from 'react';
import { PopularCategory } from '../types';
import PopularCategoryCard from './PopularCategoryCard';

interface PopularCategoriesProps {
  categories: PopularCategory[];
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ categories }) => {
  return (
    <div className="bg-white/60 rounded-lg p-4 shadow-sm mb-6">
      <h2 className="text-lg font-medium mb-3">Popular categories</h2>
      <div className="flex overflow-x-auto scrollbar pb-2">
        {categories.map(category => (
          <div key={category.id} className="flex-shrink-0">
            <PopularCategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;