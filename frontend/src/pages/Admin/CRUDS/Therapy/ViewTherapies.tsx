import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Button from '../../../../components/ui/Button';

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
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

  const filteredTherapies = therapies.filter(therapy =>
    therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-gray-50 to-gray-100"> {/* Added gradient background */}
      {/* Main container with wider width to minimize edge distance */}
      <div className="max-w-[95%] mx-auto">
        {/* Header - now aligned with card below */}
        <div className="flex justify-between items-center mb-4"> {/* Increased margin slightly */}
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Admin</h1>
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3">
            
            
            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-md"> {/* Enhanced shadow */}
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>      
      
        {/* Therapies Section - matched with ClientDashboard but with enhanced shadow */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow with hover effect */}
          <div className="rounded-t-lg p-2 bg-[#6B72D6]">
            <h2 className="text-xl font-bold text-white ml-1">All therapies</h2>
          </div>

          {/* Therapies List */}
          <div className="p-2 bg-white rounded-b-lg">
            <div className="space-y-4">
              {filteredTherapies.map((therapy) => (
                <div key={therapy.id} className="flex flex-col md:flex-row gap-4 items-start md:items-stretch">
                  <img 
                    src={therapy.image} 
                    alt={therapy.name} 
                    className="md:w-64 w-full h-auto md:h-48 object-cover rounded-lg shadow-md" // Enhanced image shadow
                  />
                  
                  {/* Therapy Details */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-sm mb-1 text-[#6B72D6]">{therapy.description}</div>
                      <div className="text-xl font-medium mb-2 text-gray-800">{therapy.name}</div>
                      <ul className="mb-3">
                        {[
                          `Duration - ${therapy.duration}`,
                          `Focus - ${therapy.focus}`,
                          `Includes - ${therapy.includes}`
                        ].map((detail, index) => (
                          <li key={index} className="pl-4 relative mb-1 text-gray-600 text-sm">
                            <span className="absolute left-0 text-[#6B72D6]">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Price and Actions */}
                    <div className="flex justify-between items-end mt-3">
                      <div>
                        <span className="text-xs text-gray-500">Therapy price * </span>
                        <span className="font-medium text-[#6B72D6] text-lg">$ {therapy.price}</span>
                      </div>
                      <Button 
                        variant="border" 
                        className="text-sm px-3 py-1"
                        onClick={() => handleDelete(therapy.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {filteredTherapies.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No therapies found</p>
                  {searchTerm ? (
                    <p className="text-gray-400">Try adjusting your search term</p>
                  ) : (
                    <Button
                      variant="border"
                      onClick={handleAddTherapy}
                      className="text-sm px-4 py-2"
                    >
                      Add your first therapy
                    </Button>
                  )}
                </div>
              )}

              {/* Add Therapy Button - aligned with bottom edge style */}
              <div className="mt-4 bg-gray-100 rounded-lg p-2 flex justify-between items-center shadow-sm hover:shadow transition-shadow duration-300">
                <div>
                  <span className="text-gray-700 text-sm">Total Therapies: </span>
                  <span className="font-medium text-[#6B72D6] text-sm">{filteredTherapies.length}</span>
                </div>
                <Button
                  variant="border"
                  onClick={handleAddTherapy}
                  className="flex items-center gap-2 text-sm px-3 py-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Therapy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTherapiesPage;