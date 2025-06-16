import React from 'react';
import { MealType } from '../types';

interface CategoryHeaderProps {
  title: string;
  selectedMealType: MealType;
  onMealTypeChange: (mealType: MealType) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  title, 
  selectedMealType,
  onMealTypeChange
}) => {
  const mealTypes: MealType[] = ['all', 'breakfast', 'lunch', 'dinner', 'other'];

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-300 p-4 rounded-t-lg mb-4">
      <h2 className="text-white text-2xl font-semibold">{title}</h2>
      
      <div className="flex gap-2 mt-4">
        {mealTypes.map((type) => (
          <button
            key={type}
            onClick={() => onMealTypeChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedMealType === type
                ? 'bg-white text-orange-500'
                : 'bg-orange-300 text-white hover:bg-orange-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;