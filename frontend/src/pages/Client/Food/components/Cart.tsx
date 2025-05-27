import React from 'react';
import { CartItem as CartItemType } from '../types';
import CartItem from './CartItem';

interface CartProps {
  items: CartItemType[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onIncrease, 
  onDecrease, 
  onRemove 
}) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <div className="bg-white/50 rounded-lg p-4 shadow-sm min-h-96 max-h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      
      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-400">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="flex-grow overflow-auto">
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
      
      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-semibold text-orange-500">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full py-3 bg-orange-400 text-white rounded-lg font-medium hover:bg-orange-500 transition-colors duration-200">
            Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;