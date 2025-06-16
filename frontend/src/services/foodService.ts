// Food service for API calls related to food items

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:13505/api/services/meals';

// Define interfaces for the data types
export interface FoodItem {
  id?: number;
  foodNumber: string;
  foodName: string;
  availableTimes: string;
  foodNature: string;
  price: string;
  foodType: string;
  foodDescription: string;
  // Add any other fields from your backend models
}

// Create the service object with various methods
export const foodService = {
  // Get all food items
  getAllFoods: async (): Promise<FoodItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) {
        throw new Error(`Error fetching foods: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  },

  // Add a new food item
  addFood: async (foodData: FoodItem): Promise<FoodItem> => {
    try {
      const response = await fetch(`${API_BASE_URL}/addMeal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        let errorMsg = `Error creating food: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // If parsing JSON fails, use the default error
        }
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating food:', error);
      throw error;
    }
  },

  // Update an existing food item
  updateFood: async (id: number, foodData: Partial<FoodItem>): Promise<FoodItem> => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateMeal/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        let errorMsg = `Error updating food: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // If parsing JSON fails, use the default error
        }
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating food with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a food item
  deleteFood: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteMeal/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errorMsg = `Error deleting food: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // If parsing JSON fails, use the default error
        }
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error(`Error deleting food with id ${id}:`, error);
      throw error;
    }
  },

  // Get foods by type (breakfast, lunch, dinner)
  getFoodsByType: async (type: 'breakfast' | 'lunch' | 'dinner'): Promise<FoodItem[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${type}`);
        if (!response.ok) {
        throw new Error(`Error fetching ${type} foods: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${type} foods:`, error);
        throw error;
    }
  },

  getFoodById: async (id: number): Promise<FoodItem> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
        throw new Error(`Error fetching food: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching food with id ${id}:`, error);
        throw error;
    }
  },
};