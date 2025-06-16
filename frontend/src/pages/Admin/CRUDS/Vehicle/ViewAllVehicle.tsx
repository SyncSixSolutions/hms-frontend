import React, { useState } from 'react';

const ViewAllVehicle = () => {
  const [vehicles] = useState([
    {
      id: 1,
      vehicleNo: 'ABC-2345',
      type: 'Nissan GT-R',
      owner: 'Priyantha Kumara',
      contact: '071 3680765',
      passengerCapacity: 4,
      features: 'WiFi , Air Conditioner and TV',
      pricePerKM: 50,
      basePrice: 50,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"%3E%3Crect width="200" height="120" fill="%23f0f0f0"/%3E%3Cg transform="translate(30,20)"%3E%3Cpath d="M0,60 L20,40 L120,40 L140,60 L140,80 L0,80 Z" fill="%23666"/%3E%3Ccircle cx="25" cy="75" r="12" fill="%23333"/%3E%3Ccircle cx="115" cy="75" r="12" fill="%23333"/%3E%3Crect x="20" y="45" width="100" height="15" fill="%23999"/%3E%3C/g%3E%3C/svg%3E'
    },
    {
      id: 2,
      vehicleNo: 'AAA-1234',
      type: 'Tuk Tuk',
      owner: 'Nimal pranandu',
      contact: '072 1234567',
      passengerCapacity: 3,
      features: 'WiFi , Charging Port and TV',
      pricePerKM: 30,
      basePrice: 30,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"%3E%3Crect width="200" height="120" fill="%23f0f0f0"/%3E%3Cg transform="translate(40,25)"%3E%3Cpath d="M0,50 L15,30 L85,30 L100,50 L100,70 L0,70 Z" fill="%23e74c3c"/%3E%3Ccircle cx="20" cy="65" r="10" fill="%23333"/%3E%3Ccircle cx="80" cy="65" r="10" fill="%23333"/%3E%3Crect x="15" y="35" width="70" height="20" fill="%23fff"/%3E%3Cpath d="M50,30 L65,15 L85,15 L85,30" fill="%23e74c3c"/%3E%3C/g%3E%3C/svg%3E'
    },
    {
      id: 3,
      vehicleNo: 'AA-1274',
      type: 'Scooty',
      owner: 'Shriyani Gamage',
      contact: '076 9085642',
      passengerCapacity: 2,
      features: '',
      pricePerKM: 20,
      basePrice: 10,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"%3E%3Crect width="200" height="120" fill="%23f0f0f0"/%3E%3Cg transform="translate(50,30)"%3E%3Ccircle cx="20" cy="50" r="12" fill="%23333"/%3E%3Ccircle cx="80" cy="50" r="12" fill="%23333"/%3E%3Cpath d="M32,50 L68,50 L65,35 L35,35 Z" fill="%23ffc107"/%3E%3Cpath d="M35,35 L45,20 L55,20 L65,35" fill="%23666"/%3E%3Crect x="40" y="25" width="20" height="10" fill="%23333"/%3E%3C/g%3E%3C/svg%3E'
    }
  ]);

  const handleDelete = (vehicleId) => {
    // Handle delete functionality
    console.log(`Delete vehicle with ID: ${vehicleId}`);
  };

    const handleEdit = (vehicleId) => {
    // Handle edit functionality
    console.log(`Edit vehicle with ID: ${vehicleId}`);
    };

  const handleAddVehicle = () => {
    // Handle add vehicle navigation
    console.log('Navigate to Add Vehicle page');
    // load the AddVehicle component
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-800">Welcome, Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2022</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="p-6">
        {/* Title Bar */}
        <div className="bg-indigo-500 text-white px-6 py-4 rounded-lg mb-6">
          <h2 className="text-2xl font-medium">All vehicle</h2>
        </div>

        {/* Vehicle Cards */}
        <div className="space-y-4 mb-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Vehicle Image */}
                  <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={vehicle.image}
                      alt={vehicle.type}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Vehicle Details */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">
                      Vehicle No. {vehicle.vehicleNo}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{vehicle.type}</p>
                    <p className="text-sm text-gray-600 mb-1">{vehicle.owner} {vehicle.contact}</p>
                    <p className="text-sm text-gray-600 mb-1">Passenger Capacity - {vehicle.passengerCapacity}</p>
                    {vehicle.features && (
                      <p className="text-sm text-gray-600">{vehicle.features}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  {/* Pricing */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 mb-1">Vehicle renting price*</p>
                    <p className="text-sm text-gray-600">1KM - $ {vehicle.pricePerKM}</p>
                    <p className="text-sm text-gray-600">Base - $ {vehicle.basePrice}</p>
                  </div>

                  {/* Edit Button */}
                  <button 
                    onClick={() => handleEdit(vehicle.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mr-3"
                    >
                    Edit
                    </button>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(vehicle.id)}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Vehicle Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleAddVehicle}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Add Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllVehicle;