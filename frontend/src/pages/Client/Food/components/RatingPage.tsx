import React, { useState } from 'react';
import { CartItem } from '../types';
import { Star, ArrowLeft } from 'lucide-react';

interface RatingPageProps {
  orderedItems: CartItem[];
  onComplete: () => void;
}

interface ItemRating {
  id: string;
  rating: number;
  comment: string;
}

const RatingPage: React.FC<RatingPageProps> = ({ orderedItems, onComplete }) => {
  const [ratings, setRatings] = useState<ItemRating[]>(
    orderedItems.map(item => ({
      id: item.id,
      rating: 0,
      comment: ''
    }))
  );

  const updateRating = (itemId: string, rating: number) => {
    setRatings(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, rating } : item
      )
    );
  };

  const updateComment = (itemId: string, comment: string) => {
    setRatings(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, comment } : item
      )
    );
  };

  const handleSubmit = () => {
    // Here you would typically send the ratings to your backend
    console.log('Ratings submitted:', ratings);
    onComplete();
  };

  const allRated = ratings.every(rating => rating.rating > 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center mb-6">
        <button 
          onClick={onComplete}
          className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold">Rate Your Order</h2>
      </div>

      <div className="flex-grow overflow-auto space-y-6">
        {orderedItems.map(item => {
          const itemRating = ratings.find(r => r.id === item.id);
          
          return (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-orange-500 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Rate this item:</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => updateRating(item.id, star)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= (itemRating?.rating || 0)
                            ? 'text-orange-400 fill-orange-400'
                            : 'text-gray-300 hover:text-orange-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a comment (optional):
                </label>
                <textarea
                  value={itemRating?.comment || ''}
                  onChange={(e) => updateComment(item.id, e.target.value)}
                  placeholder="Tell us about your experience with this item..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-orange-400 transition-colors"
                  rows={3}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={!allRated}
          className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
            allRated
              ? 'bg-orange-400 text-white hover:bg-orange-500'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Ratings
        </button>
        {!allRated && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Please rate all items to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingPage;