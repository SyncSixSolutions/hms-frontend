import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import { Save, X,} from 'lucide-react';

interface RoomFormData {
  roomNumber: string;
  roomFloor: string;
  reservationStatus: string;
  roomType: string;
  capacity: string;
  pricePerNight: string;
  bedType: string;
  roomSize: string;
  description: string;
  images: File[];
  imagePreviews: string[];  
  amenities: {
    petFriendly: boolean;
    smoking: boolean;
    wifi: boolean;
    miniBar: boolean;
    coffeeMaker: boolean;
    cityView: boolean;
    shower: boolean;
    sofaBox: boolean;
    refrigerator: boolean;
    airConditioner: boolean;
    tvCable: boolean;
    seaView: boolean;
  };
}

const AddRoom: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RoomFormData>({
    roomNumber: '',
    roomFloor: '',
    reservationStatus: 'Vacant',
    roomType: 'Deluxe',
    capacity: '',
    pricePerNight: '',
    bedType: 'King size',
    roomSize: '',
    description: '',
    images: [],
    imagePreviews: [],
    amenities: {
      petFriendly: false,
      smoking: false,
      wifi: false,
      miniBar: false,
      coffeeMaker: false,
      cityView: false,
      shower: false,
      sofaBox: false,
      refrigerator: false,
      airConditioner: false,
      tvCable: false,
      seaView: false
    }
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

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      
      // Add to existing previews (up to 4 images)
      if (formData.imagePreviews.length < 4) {
        setFormData({
          ...formData,
          images: [...formData.images, file],
          imagePreviews: [...formData.imagePreviews, previewUrl]
        });
      }
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
      // Here you would call your room service to save room data
      // Example: await roomService.addRoom(formData);
      
      console.log('Room data to be submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Room added successfully!');
      navigate('/admin/rooms');
    } catch (err: any) {
      console.error('Error during submission:', err);
      setError(err.message || 'Error connecting to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/rooms');
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


  return (
    <div className="min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-gray-50 to-gray-100"> {/* Same as AddFood */}
      {/* Main container with wider width to minimize edge distance - EXACT SAME AS AddFood */}
      <div className="max-w-[95%] mx-auto">
        {/* Header - now aligned with card below - EXACT SAME AS AddFood */}
        <div className="flex justify-between items-center mb-4"> {/* Same margin as AddFood */}
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Admin</h1> {/* Same text color as AddFood */}
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3"> {/* Same spacing as AddFood */}
           
            
            {/* Profile Avatar - EXACT SAME AS AddFood */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-md"> {/* Enhanced shadow */}
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>      
      
        {/* Add Room Header - matched with AddFood but with enhanced shadow */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow with hover effect */}
          <div className="rounded-t-lg p-2 bg-[#6B72D6]">
            <h2 className="text-xl font-bold text-white ml-1">Add a new room</h2>
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
                {/* Room Picture Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Room Pictures</h3>
                  
                  <div className="flex gap-4 items-start"> {/* Changed from grid to flex like AddFood */}
                    {/* Image previews */}
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Room preview ${index + 1}`}
                          className="w-46 h-36 object-cover rounded-lg shadow-md" // Same size as AddFood
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

                    {/* Upload button - reduced size to match AddFood */}
                    {formData.imagePreviews.length < 4 && (
                      <div className="relative">
                        <label 
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-36 h-28 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-md" // Same size as AddFood
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
                    )}
                  </div>
                </div>

                {/* Room Details Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Room Details</h3>

                  <div className="flex md:flex-row flex-col gap-6">
                    {/* Left column */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room number</label>
                        <input
                          type="text"
                          name="roomNumber"
                          value={formData.roomNumber}
                          onChange={handleChange}
                          required
                          placeholder="Room number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room floor</label>
                        <input
                          type="text"
                          name="roomFloor"
                          value={formData.roomFloor}
                          onChange={handleChange}
                          required
                          placeholder="Floor number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reservation status</label>
                        <select
                          name="reservationStatus"
                          value={formData.reservationStatus}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        >
                          <option value="Vacant">Vacant</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room type</label>
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        >
                          <option value="Deluxe">Deluxe</option>
                          <option value="Standard">Standard</option>
                          <option value="Suite">Suite</option>
                          <option value="Executive">Executive</option>
                          <option value="Family">Family</option>
                        </select>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room capacity</label>
                        <input
                          type="text"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleChange}
                          required
                          placeholder="2-4 guests"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per night</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="text"
                            name="pricePerNight"
                            value={formData.pricePerNight}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bed type</label>
                        <select
                          name="bedType"
                          value={formData.bedType}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        >
                          <option value="King size">King size</option>
                          <option value="Queen size">Queen size</option>
                          <option value="Twin">Twin</option>
                          <option value="Double">Double</option>
                          <option value="Single">Single</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room size</label>
                        <input
                          type="text"
                          name="roomSize"
                          value={formData.roomSize}
                          onChange={handleChange}
                          placeholder="Square footage"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                                   hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                   focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full width description */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Room description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                               hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                               focus:outline-none transition duration-150 ease-in-out"
                    />
                  </div>
                </div>

                {/* Amenities Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Amenities</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[
                      { key: 'petFriendly', label: 'Pet-friendly' },
                      { key: 'smoking', label: 'Smoking' },
                      { key: 'wifi', label: 'Wi-Fi' },
                      { key: 'miniBar', label: 'Mini-bar' },
                      { key: 'coffeeMaker', label: 'Coffee maker' },
                      { key: 'cityView', label: 'City view' },
                      { key: 'shower', label: 'Shower' },
                      { key: 'sofaBox', label: 'Sofa box' },
                      { key: 'refrigerator', label: 'Refrigerator' },
                      { key: 'airConditioner', label: 'Air conditioner' },
                      { key: 'tvCable', label: 'TV Cable' },
                      { key: 'seaView', label: 'Sea view' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={key}
                          name={key}
                          checked={formData.amenities[key as keyof typeof formData.amenities]}
                          onChange={handleAmenityChange}
                          className="w-4 h-4 text-[#6B72D6] border-gray-300 rounded focus:ring-[#6B72D6] focus:ring-2"
                        />
                        <label htmlFor={key} className="text-sm text-gray-700 cursor-pointer">
                          {label}
                        </label>
                      </div>
                    ))}
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

              {/* Footer section - aligned with bottom edge style like AddFood */}
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
                      navigate('/admin/rooms');
                    }}
                  >
                    Back to room list
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

export default AddRoom;