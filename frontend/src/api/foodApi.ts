import axios from 'axios';
import { FoodItem } from '../pages/Client/Food/types';

const API_BASE_URL = 'http://localhost:8765/api/services/meals';

export const getFoods = async (): Promise<FoodItem[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data.map((item: any) => ({
    id: item.foodNumber.toString(),
    name: item.foodName,
    price: item.price,
    rating: 4.5, // Default rating
    image: item.foodPicture || '/default-food.png',
    category: item.foodType?.toLowerCase() || 'other',
    mealType: mapFoodNatureToMealType(item.foodNature)
  }));
};

export const getBreakfastFoods = async (): Promise<FoodItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/breakfast`);
  return response.data.map((item: any) => ({
    id: item.foodNumber.toString(),
    name: item.foodName,
    price: item.price,
    rating: 4.5,
    image: item.foodPicture || '/default-food.png',
    category: item.foodType?.toLowerCase() || 'other',
    mealType: 'breakfast'
  }));
};

export const getLunchFoods = async (): Promise<FoodItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/lunch`);
  return response.data.map((item: any) => ({
    id: item.foodNumber.toString(),
    name: item.foodName,
    price: item.price,
    rating: 4.5,
    image: item.foodPicture || '/default-food.png',
    category: item.foodType?.toLowerCase() || 'other',
    mealType: 'lunch'
  }));
};

export const getDinnerFoods = async (): Promise<FoodItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/dinner`);
  return response.data.map((item: any) => ({
    id: item.foodNumber.toString(),
    name: item.foodName,
    price: item.price,
    rating: 4.5,
    image: item.foodPicture || '/default-food.png',
    category: item.foodType?.toLowerCase() || 'other',
    mealType: 'dinner'
  }));
};

function mapFoodNatureToMealType(foodNature: string): 'breakfast' | 'lunch' | 'dinner' | 'other' {
  switch (foodNature.toLowerCase()) {
    case 'breakfast':
      return 'breakfast';
    case 'lunch':
      return 'lunch';
    case 'dinner':
      return 'dinner';
    default:
      return 'other';
  }
}