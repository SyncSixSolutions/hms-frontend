import React, { useState } from "react";
import Header from "./components/Header";
import CategoryHeader from "./components/CategoryHeader";
import PopularCategories from "./components/PopularCategories";
import CategoryGrid from "./components/CategoryGrid";
import FoodGrid from "./components/FoodGrid";
import Cart from "./components/Cart";
import { CartProvider, useCart } from "./context/CartContext";
import { MealType } from "./types";

import { popularCategories, categories, foodItems } from "./data/foodData";

const FoodApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const [selectedMealType, setSelectedMealType] = useState<MealType>("all");

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  const handleMealTypeChange = (mealType: MealType) => {
    setSelectedMealType(mealType);
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-4 py-4 bg-[url('/home/kavindu/vsCode/hms-frontend/frontend/src/assets/images/client-food.png')] bg-cover bg-center ">
        <Header />

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
