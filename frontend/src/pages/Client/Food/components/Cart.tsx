import React,{useState} from "react";
import { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

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
  onRemove,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"cafeteria" | "room">(
    "cafeteria"
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.mealType]) {
      acc[item.mealType] = [];
    }
    acc[item.mealType].push(item);
    return acc;
  }, {} as Record<string, CartItemType[]>);
  if (showConfirmation) {
    return (
      <div className="bg-white/50 rounded-lg p-4 shadow-sm min-h-96 max-h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-6">Confirm Order</h2>

        <div className="mb-6">
          <p className="text-gray-600 mb-3">Delivery Location</p>
          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded-lg ${
                deliveryType === "cafeteria"
                  ? "bg-orange-400 text-white"
                  : "border border-orange-400 text-orange-400"
              }`}
              onClick={() => setDeliveryType("cafeteria")}
            >
              Cafeteria Pickup
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                deliveryType === "room"
                  ? "bg-orange-400 text-white"
                  : "border border-orange-400 text-orange-400"
              }`}
              onClick={() => setDeliveryType("room")}
            >
              Room Service
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-3">Special Note</p>
          <textarea className="w-full rounded-lg border border-orange-500 border-spacing-1.5"></textarea>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            className="w-full py-3 bg-orange-400 text-white rounded-lg font-medium hover:bg-orange-500 transition-colors duration-200"
            onClick={() => {
              // Handle order confirmation
              console.log("Order confirmed");
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white/50 rounded-lg p-4 shadow-sm min-h-96 max-h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>

      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-400">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="flex-grow overflow-auto space-y-6">
          {Object.entries(groupedItems).map(([mealType, items]) => (
            <div key={mealType} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium capitalize">{mealType}</h3>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:border-orange-400">
                    <option value="">Select Time</option>
                    <option value="7:00">7:00 AM</option>
                    <option value="9:00">9:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
                      <path
                        d="M1 1L6 5L11 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-semibold text-orange-500">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button className="w-full py-3 bg-orange-400 text-white rounded-lg font-medium hover:bg-orange-500 transition-colors duration-200" onClick={() => setShowConfirmation(true)}>
            Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
