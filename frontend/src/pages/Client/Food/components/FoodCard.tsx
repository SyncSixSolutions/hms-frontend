import React, { useState } from 'react';
import { FoodItem } from '../types';
import RatingStars from './RatingStars';
import { Plus } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
  onAddToCart: (food: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {

  const [clicked,setClicked]=useState(false);

  const handleClick=()=>{
    setClicked(true);
    onAddToCart(food);
  }
  return (
    <div className="">
      <div className="relative left-10 top-14 z-10 h-40 w-40 overflow-hidden rounded-full border border-spacing-1.5 border-orange-400">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 "
        />
      </div>
      <div className={`p-3   rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative h-60
        ${clicked?'bg-orange-500 text-white' : 'bg-white text-black'}`}>
        <h3 className="font-medium text-lg mt-20">{food.name}</h3>
        <div className={`my-2 ${clicked?'bg-orange-500 text-white' : 'bg-white text-black'}`}>
          <RatingStars rating={food.rating} />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-baseline">
            <span className=" font-semibold">${food.price.toFixed(2)}</span>
            {food.oldPrice && (
              <span className="text-gray-500 text-sm line-through ml-2">
                ${food.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleClick}
            className={`p-1 rounded-full hover:bg-orange-500 transition-colors duration-200 ${clicked?'bg-white text-black' : ' bg-orange-400 text-black'}`} 
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;