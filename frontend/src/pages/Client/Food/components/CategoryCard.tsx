import React from 'react';
import { Category } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onSelect: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <div 
      className="w-20 h-45 bg-gradient-to-b from-gray-200 to-white hover:bg-gradient-to-b hover:from-orange-500 hover:to-orange-100 rounded-lg p-4 flex flex-col items-center relative overflow-hidden transition-all duration-300 hover:shadow-md  cursor-pointer"
      onClick={() => onSelect(category.id)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm font-medium mt-5">{category.name}</p>
      <div className="h-0.5  bg-orange-400 w-5 my-4 hover:w-9"></div>

      <div className=" bg-orange-400 text-white rounded-full p-1 mt-3">
        <ChevronRight size={16} />
      </div>
    </div>
  );
};

export default CategoryCard;