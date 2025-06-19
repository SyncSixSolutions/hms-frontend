import React from 'react';
import { FoodItem } from '../types';

interface FoodCardProps {
  food: FoodItem;
  onAddToCart: (food: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative h-40">
        <img
          src={food.image || '/default-food.png'}
          alt={food.name}
          className="w-full h-full object-cover"
        />
        {food.oldPrice && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-800">{food.name}</h3>
          <div className="flex items-center">
            <span className="text-orange-500 font-medium">
              ${food.price.toFixed(2)}
            </span>
            {food.oldPrice && (
              <span className="ml-2 text-gray-400 text-sm line-through">
                ${food.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600 ml-1 text-sm">{food.rating}</span>
          </div>
          <button
            onClick={() => onAddToCart(food)}
            className="px-3 py-1 bg-orange-400 text-white rounded-full text-sm hover:bg-orange-500 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;