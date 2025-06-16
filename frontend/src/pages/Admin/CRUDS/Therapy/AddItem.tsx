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

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Helper function to format time to 12-hour format
const formatTime = (time: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Helper function to format date to readable format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

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
  const [selectedDate, setSelectedDate] = useState('');

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

  const handlePriceChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      handleInputChange('price', numValue);
    } else if (value === '') {
      handleInputChange('price', 0);
    }
    // Ignore negative values - don't update state
  };

  const addDate = () => {
    if (selectedDate && !formData.availableDates.some(date => date.includes(selectedDate))) {
      const formattedDate = formatDate(selectedDate);
      handleInputChange('availableDates', [...formData.availableDates, formattedDate]);
      setSelectedDate('');
    }
  };

  const removeDate = (dateToRemove: string) => {
    handleInputChange('availableDates', formData.availableDates.filter(date => date !== dateToRemove));
  };

  const addTimeSlot = () => {
    if (newTimeSlot.trim()) {
      const formattedTime = formatTime(newTimeSlot);
      if (!formData.availableTimeSlots.includes(formattedTime)) {
        handleInputChange('availableTimeSlots', [...formData.availableTimeSlots, formattedTime]);
        setNewTimeSlot('');
      }
    }
  };

  const removeTimeSlot = (timeSlot: string) => {
    handleInputChange('availableTimeSlots', formData.availableTimeSlots.filter(slot => slot !== timeSlot));
  };

  const handleSave = () => {
    // Validation
    if (!formData.name.trim()) {
      alert('Please select a therapy type');
      return;
    }
    
    if (formData.price <= 0) {
      alert('Please enter a valid price greater than 0');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    // Log the therapy data (in a real app, you'd send this to your backend)
    console.log('Therapy saved:', formData);
    alert('Therapy saved successfully!');
    
    // Navigate back to TherapyAdmin
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  const handleCancel = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  const isFormValid = formData.name.trim() && formData.price > 0 && formData.description.trim();

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
                <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}</p>
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
          <p className="text-blue-100 mt-2">Create a new therapy service for your clients</p>
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
                  <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                      <input
                        type="date"
                        value={selectedDate}
                        min={getTodayDate()}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                    <button
                      onClick={addDate}
                      disabled={!selectedDate}
                      className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add +
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.availableDates.map((date, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {date}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-green-600"
                          onClick={() => removeDate(date)}
                        />
                      </span>
                    ))}
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
                      disabled={!newTimeSlot}
                      className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Price * (USD)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={formData.price || ''}
                    min="0"
                    step="0.01"
                    onChange={(e) => handlePriceChange(e.target.value)}
                    onKeyDown={(e) => {
                      // Prevent entering negative sign
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Price must be greater than $0
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  placeholder="Enter therapy description, benefits, and what clients can expect..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={12}
                  maxLength={1000}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.description.length}/1000 characters
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-4">
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                isFormValid 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
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

          {/* Form Validation Status */}
          <div className="mt-4 text-sm text-gray-600">
            <p>Required fields: 
              <span className={formData.name ? 'text-green-600' : 'text-red-500'}> Therapy Type</span>,
              <span className={formData.price > 0 ? 'text-green-600' : 'text-red-500'}> Price</span>,
              <span className={formData.description.trim() ? 'text-green-600' : 'text-red-500'}> Description</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;