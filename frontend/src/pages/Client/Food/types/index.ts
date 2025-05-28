export interface FoodItem {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  category: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'other';
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface PopularCategory {
  id: string;
  name: string;
  image: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'other' | 'all';