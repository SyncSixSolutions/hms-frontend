import React from 'react';
import { CartItem as CartItemType } from '../types';
import { Plus, Minus, X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onIncrease, 
  onDecrease,
  onRemove
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden ">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
          <p className="text-orange-500 font-medium ">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white rounded-lg border border-gray-200">
        <button 
          onClick={() => onDecrease(item.id)}
          className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
        >
         <Minus size={16} />
        </button>
        <span className="mx-2 w-6 text-medium">{item.quantity}</span>
        <button 
          onClick={() => onIncrease(item.id)}
          className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
        >
          <Plus size={16} />
        </button>
         </div>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;