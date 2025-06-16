import React, { useState } from 'react';
import { Calendar, Plus, Image as ImageIcon, Info } from 'lucide-react';
import {NavBarComponent} from '../../../../components/layout';

const AddTherapyPage = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [therapyType, setTherapyType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState(['']);
  const [price, setPrice] = useState('');

  // Default therapy images
  const [defaultImages, setDefaultImages] = useState([
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300&h=200&fit=crop'
  ]);

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setSelectedImages([...selectedImages, ...newImages]);
    }
};

  const removeDefaultImage = (index: number) => {
    const newDefaultImages = defaultImages.filter((_, i) => i !== index);
    setDefaultImages(newDefaultImages);
  };

  const removeSelectedImage = (index: number) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newSelectedImages);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, '']);
  };

const updateTimeSlot = (index: number, value: string): void => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = value;
    setTimeSlots(newTimeSlots);
};

const removeTimeSlot = (index: number): void => {
    if (timeSlots.length > 1) {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
    }
};

  const handleSave = () => {
    const therapyData = {
      therapyType,
      description,
      selectedDate,
      timeSlots: timeSlots.filter(slot => slot.trim() !== ''),
      price,
      images: [...defaultImages, ...selectedImages]
    };
    console.log('Saving therapy data:', therapyData);
    // Handle save logic here
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarComponent 
        role="admin"
        isAuthenticated={true}
        onProfileClick={() => console.log('Profile clicked')}
        profileImageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin</h1>
          <p className="text-gray-600">Tue, 07 June 2022</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Page Title */}
          <div className="bg-[#6B72D6] text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold">Add a Therapy</h2>
          </div>

          <div className="p-6">
            {/* Therapy Pictures Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Therapy pictures</h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex gap-4 flex-wrap">
                {/* Default Images */}
                {defaultImages.map((img, index) => (
                  <div key={index} className="w-36 h-28 rounded-lg overflow-hidden bg-gray-200 relative group">
                    <img 
                      src={img} 
                      alt={`Therapy ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <button 
                        onClick={() => removeDefaultImage(index)}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-red-500 px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Selected Images */}
                {selectedImages.map((img, index) => (
                  <div key={`selected-${index}`} className="w-36 h-28 rounded-lg overflow-hidden bg-gray-200 relative group">
                    <img 
                      src={img} 
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <button 
                        onClick={() => removeSelectedImage(index)}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-red-500 px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Image Button */}
                <label className="w-36 h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Add image</span>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Therapy Detail Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Therapy Detail</h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Therapy Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Therapy type
                    </label>
                    <select 
                      value={therapyType}
                      onChange={(e) => setTherapyType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">--Therapy type--</option>
                      <option value="massage">Massage Therapy</option>
                      <option value="aromatherapy">Aromatherapy</option>
                      <option value="physical">Physical Therapy</option>
                      <option value="occupational">Occupational Therapy</option>
                    </select>
                  </div>

                  {/* Available Dates */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available dates
                    </label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Select from calender"
                      />
                      <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Available Time Slots */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available time slotes
                    </label>
                    <div className="space-y-2">
                      {timeSlots.map((slot, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="time"
                            value={slot}
                            onChange={(e) => updateTimeSlot(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="select time"
                          />
                          {timeSlots.length > 1 && (
                            <button 
                              onClick={() => removeTimeSlot(index)}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button 
                        onClick={addTimeSlot}
                        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input 
                      type="number"
                      value={price}
                      min={0}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Select price"
                    />
                  </div>
                </div>

                {/* Right Column - Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="select time"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-[#6B72D6] text-white rounded-lg hover:bg-[#5F66C3] transition-colors"
              >
                Save therapy
              </button>
              <button 
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTherapyPage;