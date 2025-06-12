import React from 'react';
import { PopularCategory } from '../types';

interface PopularCategoryCardProps {
  category: PopularCategory;
}

const PopularCategoryCard: React.FC<PopularCategoryCardProps> = ({ category }) => {
  return (
    <div className="flex flex-col items-center p-2 transition-transform duration-200 hover:scale-105">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-orange-200">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-center">{category.name}</p>
    </div>
  );
};

export default PopularCategoryCard;