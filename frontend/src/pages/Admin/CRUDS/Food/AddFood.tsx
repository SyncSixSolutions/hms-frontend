import React, { useState, useEffect } from 'react';
import { foodService } from '../../../../services/foodService';
import Button from '../../../../components/ui/Button';
import Card from '../../../../components/ui/Card';
import CardContent from '../../../../components/ui/CardContent';
import Input from '../../../../components/ui/Input';
import { Search, Save, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FoodFormData {
  foodNumber: string;
  foodName: string;
  availableTimes: string;
  foodNature: string;
  price: string;
  foodType: string;
  foodDescription: string;
  images: File[];
  imagePreviews: string[];  
}

const AddFood: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FoodFormData>({
    foodNumber: '',
    foodName: '',
    availableTimes: '',
    foodNature: '',
    price: '',
    foodType: '',
    foodDescription: '',
    images: [],
    imagePreviews: []
  });

  // Cleanup function for image preview URLs
  useEffect(() => {
    return () => {
      formData.imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      
      setFormData({
        ...formData,
        images: [file],
        imagePreviews: [previewUrl]
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const foodDataForBackend = {
        foodNumber: formData.foodNumber,
        foodName: formData.foodName,
        availableTimes: formData.availableTimes,
        foodNature: formData.foodNature,
        price: formData.price,
        foodType: formData.foodType,
        foodDescription: formData.foodDescription
      };

      if (formData.images.length > 0) {
        console.log("Image upload is not implemented in the backend yet");
      }

      await foodService.addFood(foodDataForBackend);
      alert('Food added successfully!');
      navigate('/admin/foods');
    } catch (err: any) {
      console.error('Error during submission:', err);
      setError(err.message || 'Error connecting to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/foods');
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSearchChange = (value: string) => {
    console.log("Search value:", value);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-gray-50 to-gray-100"> {/* Same as ClientDashboards_Bookings */}
      {/* Main container with wider width to minimize edge distance - EXACT SAME AS ClientDashboards_Bookings */}
      <div className="max-w-[95%] mx-auto">
        {/* Header - now aligned with card below - EXACT SAME AS ClientDashboards_Bookings */}
        <div className="flex justify-between items-center mb-4"> {/* Same margin as ClientDashboards_Bookings */}
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Admin</h1> {/* Same text color as ClientDashboards_Bookings */}
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3"> {/* Same spacing as ClientDashboards_Bookings */}
           
            
            {/* Profile Avatar - EXACT SAME AS ClientDashboards_Bookings */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-md"> {/* Enhanced shadow */}
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>      
      
        {/* Add Food Header - matched with ClientDashboards_Bookings but with enhanced shadow */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow with hover effect */}
          <div className="rounded-t-lg p-2 bg-[#6B72D6]">
            <h2 className="text-xl font-bold text-white ml-1">Add a new food</h2>
          </div>

          {/* Form Content */}
          <div className="p-2 bg-white rounded-b-lg">
            <div className="space-y-4">
              {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Food Picture Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Food Picture</h3>
                  
                  <div className="flex gap-4 items-start">
                    {/* Image previews */}
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Food preview ${index + 1}`}
                          className="w-28 h-20 object-cover rounded-lg shadow-md" // Added shadow like ClientDashboards_Bookings
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Upload button */}
                    <div className="relative">
                      <label 
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-28 h-20 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-md" // Added shadow
                      >
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                        <div className="text-2xl text-[#6B72D6]">+</div>
                        <span className="text-xs text-gray-500 mt-1">Add image</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Food Details Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Food Details</h3>

                  <div className="flex md:flex-row flex-col gap-6">
                    {/* Left column */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Food number</label>
                        <input
                          type="text"
                          name="foodNumber"
                          value={formData.foodNumber}
                          onChange={handleChange}
                          required
                          placeholder="Food number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Food name</label>
                        <input
                          type="text"
                          name="foodName"
                          value={formData.foodName}
                          onChange={handleChange}
                          required
                          placeholder="Food name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available times</label>
                        <select
                          name="availableTimes"
                          value={formData.availableTimes}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        >
                          <option value="">-Select-</option>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="allday">All Day</option>
                        </select>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Food nature</label>
                        <select
                          name="foodNature"
                          value={formData.foodNature}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        >
                          <option value="">-Select-</option>
                          <option value="veg">Vegetarian</option>
                          <option value="nonveg">Non-Vegetarian</option>
                          <option value="vegan">Vegan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">Rs.</span>
                          <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="Price"
                            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                     hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                     focus:outline-none transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Food type</label>
                        <select
                          name="foodType"
                          value={formData.foodType}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        >
                          <option value="">-Select-</option>
                          <option value="appetizer">Appetizer</option>
                          <option value="mainCourse">Main Course</option>
                          <option value="dessert">Dessert</option>
                          <option value="beverage">Beverage</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Full width description */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food description</label>
                    <textarea
                      name="foodDescription"
                      value={formData.foodDescription}
                      onChange={handleChange}
                      required
                      placeholder="Food description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                               hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                               focus:outline-none transition duration-150 ease-in-out"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-6 md:flex-row flex-col">
                  <Button
                    type="submit"
                    variant="filled"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 text-white shadow-sm hover:shadow transition-shadow duration-300"
                    style={{ backgroundColor: "#6B72D6" }}
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="border"
                    onClick={handleCancel}
                    className="text-gray-700 shadow-sm hover:shadow transition-shadow duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>

              {/* Footer section - aligned with bottom edge style like ClientDashboards_Bookings */}
              <div className="mt-5 bg-gray-100 rounded-lg p-2 flex justify-between items-center shadow-sm hover:shadow transition-shadow duration-300"> {/* Added shadow */}
                <div>
                  <span className="text-gray-700 text-sm">Form Status: </span>
                  <span className="font-medium text-[#6B72D6] text-sm">{loading ? 'Saving...' : 'Ready to save'}</span>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-xs hover:underline text-[#6B72D6]"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/admin/foods');
                    }}
                  >
                    Back to food list
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;