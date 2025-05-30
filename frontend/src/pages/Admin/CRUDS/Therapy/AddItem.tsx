import React, { useState } from 'react';
import { Search, Bell, Upload, Calendar, Plus, X, ArrowLeft, User } from 'lucide-react';

interface NewTherapy {
  name: string;
  image: string;
  roomSize: string;
  equipment: string;
  attachedFacilities: string;
  price: number;
  description: string;
  availableDates: string[];
  availableTimeSlots: string[];
}

interface AddItemProps {
  onNavigateBack?: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ onNavigateBack }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  ]);
  
  const [formData, setFormData] = useState<NewTherapy>({
    name: '',
    image: selectedImages[0] || '',
    roomSize: '6m x 10m Therapy Room',
    equipment: 'Therapy Bed, Recliner Chair, Consultation Desk & Chair',
    attachedFacilities: 'Private Washroom with Shower & Sink',
    price: 0,
    description: '',
    availableDates: [],
    availableTimeSlots: []
  });

  const [newTimeSlot, setNewTimeSlot] = useState('');

  const therapyTypes = [
    'Chinese Body Massage',
    'Oil Boat Therapy',
    'Swedish Massage',
    'Deep Tissue Massage',
    'Hot Stone Therapy',
    'Aromatherapy',
    'Reflexology'
  ];

  const handleInputChange = (field: keyof NewTherapy, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageSelect = (imageUrl: string) => {
    handleInputChange('image', imageUrl);
  };

  const addTimeSlot = () => {
    if (newTimeSlot.trim() && !formData.availableTimeSlots.includes(newTimeSlot.trim())) {
      handleInputChange('availableTimeSlots', [...formData.availableTimeSlots, newTimeSlot.trim()]);
      setNewTimeSlot('');
    }
  };

  const removeTimeSlot = (timeSlot: string) => {
    handleInputChange('availableTimeSlots', formData.availableTimeSlots.filter(slot => slot !== timeSlot));
  };

  const handleSave = () => {
    if (formData.name && formData.price > 0) {
      console.log('Therapy saved:', formData);
      alert('Therapy saved successfully!');
      
      // Navigate back to TherapyAdmin
      if (onNavigateBack) {
        onNavigateBack();
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleCancel = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleCancel}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Add New Therapy</h1>
                <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2022</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Add a Therapy</h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Therapy Pictures Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Therapy pictures</h3>
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">?</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {selectedImages.map((image, index) => (
                <div 
                  key={index}
                  className={`relative w-full h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    formData.image === image ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <img 
                    src={image} 
                    alt={`Therapy ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {formData.image === image && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add image</span>
              </div>
            </div>
          </div>

          {/* Therapy Detail Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Therapy Detail</h3>
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">?</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Therapy type *
                  </label>
                  <select
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select therapy type</option>
                    {therapyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available dates
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available time slots
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="time"
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={addTimeSlot}
                      className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Add +
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.availableTimeSlots.map((slot, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {slot}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-blue-600"
                          onClick={() => removeTimeSlot(slot)}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={formData.price || ''}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  placeholder="Enter therapy description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-4">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <span>💾</span>
              Save Changes
            </button>
            
            <button
              onClick={handleCancel}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
