import { FoodItem, Category, PopularCategory } from '../types';

export const popularCategories: PopularCategory[] = [
  {
    id: 'biryani',
    name: 'biryani',
    image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'south-indian',
    name: 'south indian',
    image: 'https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'chinese',
    name: 'chinese',
    image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'burger',
    name: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const categories: Category[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'drink',
    name: 'Drink',
    image: 'https://images.pexels.com/photos/2103949/pexels-photo-2103949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const foodItems: FoodItem[] = [
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    price: 7.29,
    rating: 3,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pizza',
    mealType: 'lunch'
  },
  {
    id: 'vegetable-pizza',
    name: 'Vegetable Pizza',
    price: 5.49,
    rating: 3,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pizza',
    mealType: 'lunch'
  },
  {
    id: 'mushroom-pizza',
    name: 'Mushroom Pizza',
    price: 7.49,
    oldPrice: 8.49,
    rating: 3,
    image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pizza',
    mealType: 'dinner'
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    price: 6.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pizza',
    mealType: 'dinner'
  },
  {
    id: 'fruit-salad',
    name: 'Fruit Salad',
    price: 4.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fruits',
    mealType: 'breakfast'
  },
  {
    id: 'smoothie',
    name: 'Berry Smoothie',
    price: 3.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'drink',
    mealType: 'breakfast'
  }
];