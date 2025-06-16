import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import {NavBarComponent} from '../../../../components/layout';

const ViewTherapiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample therapy data - replace with your actual data
  const therapies = [
    {
      id: 1,
      name: "Chinese Body Massage",
      description: "Traditional full-body massage therapy",
      duration: "60 mins",
      focus: "Pressure points, energy flow, and deep muscle relief",
      includes: "Acupressure, stretching",
      price: 49,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Oil Boat Therapy",
      description: "Traditional full-body massage therapy",
      duration: "60 mins",
      focus: "Pressure points, energy flow, and deep muscle relief",
      includes: "Acupressure, stretching",
      price: 29,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Aromatherapy Massage",
      description: "Traditional full-body massage therapy",
      duration: "60 mins",
      focus: "Pressure points, energy flow, and deep muscle relief",
      includes: "Acupressure, stretching",
      price: 299,
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Thai Herbal Compress",
      description: "Traditional full-body massage therapy",
      duration: "60 mins",
      focus: "Pressure points, energy flow, and deep muscle relief",
      includes: "Acupressure, stretching",
      price: 299,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop"
    }
  ];

const handleDelete = (therapyId: number): void => {
    console.log(`Delete therapy with ID: ${therapyId}`);
    // Handle delete logic here
};

  const handleAddTherapy = () => {
    console.log('Navigate to Add Therapy page');
    // Handle navigation to add therapy page
  };

  const filteredTherapies = therapies.filter(therapy =>
    therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarComponent 
        role="admin"
        isAuthenticated={true}
        onProfileClick={() => console.log('Profile clicked')}
        profileImageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin</h1>
            <p className="text-gray-600">Tue, 07 June 2022</p>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Profile Image */}
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Admin Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>
        </div>

        {/* Page Title */}
        <div className="text-white p-6 rounded-lg mb-6" style={{ backgroundColor: '#6B72D6' }}>
          <h2 className="text-2xl font-bold">All therapies</h2>
        </div>

        {/* Therapies List */}
        <div className="space-y-4 mb-6">
          {filteredTherapies.map((therapy) => (
            <div key={therapy.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-6">
                {/* Therapy Image */}
                <div className="flex-shrink-0">
                  <img
                    src={therapy.image}
                    alt={therapy.name}
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                </div>

                {/* Therapy Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{therapy.name}</h3>
                                        <div>
                      <button
                        onClick={() => console.log(`Edit therapy with ID: ${therapy.id}`)}
                        className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(therapy.id)}
                        className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-1">{therapy.description}</p>
                  <p className="text-gray-600 mb-1">Duration - {therapy.duration}</p>
                  <p className="text-gray-600 mb-1">Focus - {therapy.focus}</p>
                  <p className="text-gray-600 mb-4">Includes - {therapy.includes}</p>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm text-gray-500 mb-1">Therapy price *</p>
                  <p className="text-xl font-bold text-gray-800">$ {therapy.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Therapy Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAddTherapy}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md"
            style={{ backgroundColor: '#6B72D6' }}
          >
            <Plus className="w-5 h-5" />
            Add Therapy
          </button>
        </div>

        {/* Empty State */}
        {filteredTherapies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No therapies found</p>
            {searchTerm ? (
              <p className="text-gray-400">Try adjusting your search term</p>
            ) : (
              <button
                onClick={handleAddTherapy}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first therapy
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTherapiesPage;