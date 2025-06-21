import React, { useState, useEffect } from "react";
import CategoryHeader from "./components/CategoryHeader";
import PopularCategories from "./components/PopularCategories";
import CategoryGrid from "./components/CategoryGrid";
import FoodGrid from "./components/FoodGrid";
import Cart from "./components/Cart";
import { CartProvider, useCart } from "./context/CartContext";
import { MealType, FoodItem } from "./types";
import { getFoods, getBreakfastFoods, getLunchFoods, getDinnerFoods } from "../../../api/foodApi";
import { NavBarComponent } from "../../../components/layout";

import { popularCategories, categories, foodItems } from "./data/foodData";

const FoodApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const [selectedMealType, setSelectedMealType] = useState<MealType>("all");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        let foods: FoodItem[] = [];
        
        if (selectedMealType === 'all') {
          foods = await getFoods();
        } else if (selectedMealType === 'breakfast') {
          foods = await getBreakfastFoods();
        } else if (selectedMealType === 'lunch') {
          foods = await getLunchFoods();
        } else if (selectedMealType === 'dinner') {
          foods = await getDinnerFoods();
        }
        
        setFoodItems(foods);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [selectedMealType]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleMealTypeChange = (mealType: MealType) => {
    setSelectedMealType(mealType);
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <NavBarComponent
            role="guest"
            isAuthenticated={false}
            forWhat="profile"
            activeLink="Services & Foods"
            onProfileClick={() => console.log("Profile clicked")}
            profileImageUrl="/path-to-user.png"
          />
      <div className="max-w-7xl mx-auto px-4 py-4 bg-[url('/home/kavindu/vsCode/hms-frontend/frontend/src/assets/images/client-food.png')] bg-cover bg-center ">
        
        <main className="mt-6">
          <CategoryHeader 
          title="Foods & Beverages" 
          selectedMealType={selectedMealType}
          onMealTypeChange={handleMealTypeChange}/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex flex-row">
                <PopularCategories categories={popularCategories} />
                <div className="mb-6 ml-2">
                  <CategoryGrid
                    categories={categories}
                    onSelectCategory={handleSelectCategory}
                  />
                </div>
              </div>

              <FoodGrid
                foods={foodItems}
                category={selectedCategory}
                mealType={selectedMealType}
                onAddToCart={addToCart}
              />
            </div>

            <div className="md:col-span-1">
              <Cart
                items={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <FoodApp />
    </CartProvider>
  );
};

export default App;