import React from 'react';
import { FoodItem, MealType } from '../types';
import FoodCard from './FoodCard';

interface FoodGridProps {
  foods: FoodItem[];
  category: string;
  mealType: MealType;
  onAddToCart: (food: FoodItem) => void;
}

const FoodGrid: React.FC<FoodGridProps> = ({ 
  foods, 
  category, 
  mealType,
  onAddToCart 
}) => {
  // Filter foods by the selected category and meal type
  const filteredFoods = foods.filter(food => {
    const matchesCategory = food.category === category;
    const matchesMealType = mealType === 'all' || food.mealType === mealType;
    return matchesCategory && matchesMealType;
  });

  return (
    <div className="mt-6 bg-white/60 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 capitalize">{category}</h2>
      {filteredFoods.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No {mealType !== 'all' ? mealType : ''} items available in this category
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodGrid;