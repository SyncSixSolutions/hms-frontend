import React, { useState } from 'react';
import { Search, Bell, Plus, Edit, Trash2, User } from 'lucide-react';

interface Therapy {
  id: number;
  name: string;
  image: string;
  roomSize: string;
  equipment: string;
  attachedFacilities: string;
  price: number;
}

interface TherapyAdminProps {
  onNavigateToAdd?: () => void;
}

const TherapyCard: React.FC<{
  therapy: Therapy;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}> = ({ therapy, onDelete, onEdit }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img 
            src={therapy.image} 
            alt={therapy.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg mb-3">{therapy.name}</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium text-gray-700">Room Size:</span> {therapy.roomSize}</p>
            <p><span className="font-medium text-gray-700">Equipment & Furniture:</span> {therapy.equipment}</p>
            <p><span className="font-medium text-gray-700">Attached Facilities:</span> {therapy.attachedFacilities}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Therapy price</p>
          <p className="text-2xl font-bold text-gray-800">${therapy.price}</p>
        </div>
        
        <button
          onClick={() => onDelete(therapy.id)}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const TherapyAdmin: React.FC<TherapyAdminProps> = ({ onNavigateToAdd }) => {
  const [therapies, setTherapies] = useState<Therapy[]>([
    {
      id: 1,
      name: "Chinese Body Massage",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      roomSize: "6m x 10m Therapy Room",
      equipment: "Therapy Bed, Recliner Chair, Consultation Desk & Chair",
      attachedFacilities: "Private Washroom with Shower & Sink",
      price: 49
    },
    {
      id: 2,
      name: "Oil Boat Therapy",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
      roomSize: "6m x 10m Therapy Room",
      equipment: "Therapy Bed, Recliner Chair, Consultation Desk & Chair",
      attachedFacilities: "Private Washroom with Shower & Sink",
      price: 29
    },
    {
      id: 3,
      name: "Room No. 34001",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      roomSize: "6m x 10m Therapy Room",
      equipment: "Therapy Bed, Recliner Chair, Consultation Desk & Chair",
      attachedFacilities: "Private Washroom with Shower & Sink",
      price: 299
    }
  ]);

  const handleDeleteTherapy = (id: number) => {
    if (window.confirm('Are you sure you want to delete this therapy?')) {
      setTherapies(prev => prev.filter(therapy => therapy.id !== id));
    }
  };

  const handleEditTherapy = (id: number) => {
    console.log('Edit therapy with ID:', id);
    // You can add edit functionality here later
  };

  const handleAddTherapy = () => {
    if (onNavigateToAdd) {
      onNavigateToAdd();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin</h1>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* All Therapies Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white">All Therapies</h2>
        </div>

        {/* Therapy List */}
        <div className="space-y-6">
          {therapies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No therapies found. Add your first therapy!</p>
            </div>
          ) : (
            therapies.map(therapy => (
              <TherapyCard
                key={therapy.id}
                therapy={therapy}
                onDelete={handleDeleteTherapy}
                onEdit={handleEditTherapy}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleAddTherapy}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Therapy</span>
        </button>
      </div>
    </div>
  );
};

export default TherapyAdmin;