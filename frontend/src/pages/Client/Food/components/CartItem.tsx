import React from 'react';
import { CartItem as CartItemType } from '../types';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onIncrease, 
  onDecrease
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-sm">{item.name}</h4>
          <p className="text-orange-500 font-medium text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => onDecrease(item.id)}
          className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
        >
          {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
        </button>
        <span className="mx-2 w-6 text-center">{item.quantity}</span>
        <button 
          onClick={() => onIncrease(item.id)}
          className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;