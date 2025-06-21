import React, { useState, useEffect } from 'react';
import { Calendar, Image, HelpCircle, ChevronDown } from 'lucide-react';
import {getOwners, addVehicle} from '../../../../services/vehicleService';
import { validateVehicleForm, ValidationErrors } from './VehicleValidations';
import { useVehicleImages } from './useVehicleImages';



// Define Owner interface
interface Owner {
  id: string;
  name: string;
  contactNumber: string;
  nic: string;
}

// Define FormData type
interface FormData {
  vehicleNumber: string;
  passengerCount: string;
  vehicleType: string;
  pricePerKm: string;
  basePrice: string;
  availabilityFrom: string;
  availabilityTo: string;
  description: string;
  ownerName: string;
  contactNumber: string;
  ownerNIC: string;
}

const AddVehicle: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    vehicleNumber: '',
    passengerCount: '',
    vehicleType: '',
    pricePerKm: '',
    basePrice: '',
    availabilityFrom: '',
    availabilityTo: '',
    description: '',
    ownerName: '',
    contactNumber: '',
    ownerNIC: ''
  });

  const [owners, setOwners] = useState<Owner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [vehicleImages, setVehicleImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchOwners = async () => {
      const ownersData = await getOwners();
      setOwners(ownersData);
    }
    fetchOwners();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'ownerName') {
      if (value.trim() === '') {
        setFilteredOwners([]);
        setShowSuggestions(false);
      } else {
        const filtered = owners.filter(owner =>
          owner.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOwners(filtered);
        setShowSuggestions(filtered.length > 0);
      }
    }
  };

  const handleOwnerSelect = (selectedOwner: Owner) => {
    setFormData(prev => ({
      ...prev,
      ownerName: selectedOwner.name,
      contactNumber: selectedOwner.contactNumber,
      ownerNIC: selectedOwner.nic
    }));
    setShowSuggestions(false);
    setFilteredOwners([]);
  };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     Array.from(files).forEach(file => {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setVehicleImages(prev => [...prev, e.target?.result as string]);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  //   event.target.value = '';
  // };

  // const removeImage = (index: number) => {
  //   setVehicleImages(prev => prev.filter((_, i) => i !== index));
  // };

    const {
    images,
    savedImageUrls,
    isUploading,
    uploadError,
    handleImageUpload,
    removeImage,
    saveImages,
    clearImages,
    getImagePreviews
  } = useVehicleImages();

const handleSubmit = async () => {
  // Clear previous errors
  setErrors({});
  
  // Validate form
  const validationErrors = validateVehicleForm(formData);
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);
  
  try {
    // Save images first and get URLs
    const imageUrls = await saveImages(formData.vehicleNumber);
    
    const payload = {
      vehicle: {
        vehicleNumber: formData.vehicleNumber,
        passengerCount: parseInt(formData.passengerCount),
        vehicleType: formData.vehicleType,
        pricePerKm: parseFloat(formData.pricePerKm),
        basePrice: parseFloat(formData.basePrice),
        availabilityFrom: formData.availabilityFrom,
        availabilityTo: formData.availabilityTo,
        description: formData.description || "Vehicle description"
      },
      availability: {
        availabilityFrom: formData.availabilityFrom,
        availabilityTo: formData.availabilityTo
      },
      owner: {
        name: formData.ownerName,
        contactNumber: formData.contactNumber,
        nic: formData.ownerNIC
      },
      images: imageUrls.map((url, index) => ({
        imageUrl: url,
        uploadedAt: new Date().toISOString()
      }))
    };

    const success = await addVehicle(payload);
    if (success) {
      console.log('Vehicle added successfully');
      // Reset form on success
      setFormData({
        vehicleNumber: '',
        passengerCount: '',
        vehicleType: '',
        pricePerKm: '',
        basePrice: '',
        availabilityFrom: '',
        availabilityTo: '',
        description: '',
        ownerName: '',
        contactNumber: '',
        ownerNIC: ''
      });
      clearImages();
    }
  } catch (error) {
    console.error('Error adding vehicle:', error);
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Title Bar */}
        <div className="bg-indigo-500 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-medium">Add a new vehicle</h2>
        </div>
        {/* Form Container */}
        <div className="bg-white rounded-b-lg border border-gray-200 p-6">
          {/* Vehicle Picture Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-medium text-gray-800">Vehicle Picture</h3>
            </div>
            
            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{uploadError}</p>
              </div>
            )}
            
            <div className="flex gap-4 flex-wrap">
              {/* Display uploaded images */}
              {getImagePreviews().map((preview, index) => (
                <div key={index} className="relative w-60 h-40 bg-gray-100 rounded-lg flex items-center justify-center group">
                  <img 
                    src={preview}
                    alt={`Vehicle ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {/* Add image button */}
              <label className={`w-60 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Image className="w-8 h-8 mb-2" />
                <span className="text-sm">{isUploading ? 'Uploading...' : 'Add image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>


          {/* Vehicle Details Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-base font-medium text-gray-800">Vehicle Details</h3>
              {/* <HelpCircle className="w-4 h-4 text-gray-400" /> */}
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number*
                </label>
                <input
                  type="text"
                  placeholder="vehicle number"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.vehicleNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.vehicleNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passenger Count *
                </label>
                <select
                  value={formData.passengerCount}
                  onChange={(e) => handleInputChange('passengerCount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">count</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                </select>
                {errors.passengerCount && (
                  <p className="text-red-500 text-xs mt-1">{errors.passengerCount}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle type *
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">type</option>
                  <option value="car">Car</option>
                  <option value="van">Van</option>
                  <option value="bus">Bus</option>
                  <option value="bike">Bike</option>
                </select>
                {errors.vehicleType && (
                  <p className="text-red-500 text-xs mt-1">{errors.vehicleType}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per KM*
                </label>
                <input
                  type="text"
                  placeholder="price"
                  value={formData.pricePerKm}
                  onChange={(e) => handleInputChange('pricePerKm', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              {errors.pricePerKm && (
                <p className="text-red-500 text-xs mt-1">{errors.pricePerKm}</p>
              )}

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Price*
                </label>
                <input
                  type="text"
                  placeholder="base price"
                  value={formData.basePrice}
                  onChange={(e) => handleInputChange('basePrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.basePrice && (
                  <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>
                )}

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={formData.availabilityFrom}
                      onChange={(e) => handleInputChange('availabilityFrom', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={formData.availabilityTo}
                      onChange={(e) => handleInputChange('availabilityTo', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {(errors.availabilityFrom || errors.availabilityTo) && (
                    <div className="mt-1">
                      {errors.availabilityFrom && (
                        <p className="text-red-500 text-xs">{errors.availabilityFrom}</p>
                      )}
                      {errors.availabilityTo && (
                        <p className="text-red-500 text-xs">{errors.availabilityTo}</p>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Owner Details Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-base font-medium text-gray-800">Owner Details</h3>
              {/* <HelpCircle className="w-4 h-4 text-gray-400" /> */}
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Owner Name with Autocomplete */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Name*
                </label>
                <input
                  type="text"
                  placeholder="name"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  onFocus={() => {
                    if (formData.ownerName && filteredOwners.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.ownerName && (
                  <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>
                )}

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredOwners.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOwners.map((owner) => (
                      <div
                        key={owner.id}
                        onClick={() => handleOwnerSelect(owner)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{owner.name}</div>
                        <div className="text-sm text-gray-500">{owner.contactNumber}</div>
                        <div className="text-xs text-gray-400">NIC: {owner.nic}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number*
                </label>
                <input
                  type="text"
                  placeholder="contact no"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
                )}

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner NIC
                </label>
                <input
                  type="text"
                  placeholder="NIC"
                  value={formData.ownerNIC}
                  onChange={(e) => handleInputChange('ownerNIC', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.ownerNIC && (
                  <p className="text-red-500 text-xs mt-1">{errors.ownerNIC}</p>
                )}

              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Vehicle description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-600'
              } text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>

            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;