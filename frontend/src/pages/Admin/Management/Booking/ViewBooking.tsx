import React, { useState } from 'react';
import { Search, Bell, FileText, Calendar, Settings, Home, RotateCcw, User } from 'lucide-react';

const BookingDashboard = ({ bookingData }) => {
  // Use booking data from props or fetch from previous system
  const [selectedBooking, setSelectedBooking] = useState(
    bookingData || {
      refNo: '#Ref 33324',
      payment: '30000LKR',
      checkIn: '12/05/2024',
      checkOut: '12/05/2024',
      customerId: 'colombo',
      description: {
        name: 'Oceanview Retreat',
        location: 'Bambalapitiya',
        city: 'Colombo'
      },
      suiteType: 'Oceanview Retreat',
      roomsCount: '2',
      ratings: '4/5',
      status: 'Done',
      paymentType: 'Cash',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  );

  // Function to update booking data from external source
  const updateBookingData = (newBookingData) => {
    setSelectedBooking(newBookingData);
  };

  // Expose updateBookingData function globally for external access
  React.useEffect(() => {
    window.updateBookingData = updateBookingData;
    return () => {
      delete window.updateBookingData;
    };
  }, []);



  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-white shadow-sm flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <RotateCcw className="w-5 h-5 text-gray-400" />
        <FileText className="w-5 h-5 text-gray-400" />
        <Settings className="w-5 h-5 text-gray-400" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50">
        {/* Top Navigation */}
        <div className="bg-white px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-normal text-gray-800">Welcome, Receptionist</h1>
            <p className="text-gray-500 text-sm">Tue, 07 June 2025</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-60 text-sm focus:outline-none"
              />
            </div>
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">


          {/* Top left label */}
          <div className="mb-4">
            <span className="text-gray-600 text-sm">Booking view one</span>
          </div>

          {/* Booking Log Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Purple Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 py-4">
              <h2 className="text-white text-xl font-medium">Booking Log</h2>
            </div>

            {/* Content Area - Three Rows */}
            <div className="p-8">
              {/* First Row - Basic Booking Details */}
              <div className="grid grid-cols-4 gap-8 mb-8">
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Reference No.</span>
                  <div className="text-gray-800 font-medium">{selectedBooking.refNo}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Payment</span>
                  <div className="text-gray-800 font-medium">{selectedBooking.payment}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Check-in Date</span>
                  <div className="text-gray-800 font-medium">{selectedBooking.checkIn}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Check-out Date</span>
                  <div className="text-gray-800 font-medium">{selectedBooking.checkOut}</div>
                </div>
              </div>

              {/* Second Row - Customer and Description */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Customer ID</span>
                  <div className="text-gray-800 font-medium">{selectedBooking.customerId}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Description</span>
                  <div className="space-y-1">
                    <div className="text-gray-800 font-medium">{selectedBooking.description.name}</div>
                    <div className="text-gray-700">{selectedBooking.description.location}</div>
                    <div className="text-gray-700">{selectedBooking.description.city}</div>
                  </div>
                </div>
              </div>

              {/* Third Row - Image and Suite Details */}
              <div className="flex gap-8">
                {/* Hotel Room Image */}
                <div className="flex-1">
                  <img
                    src={selectedBooking.image}
                    alt="Hotel Room"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Suite Details and Actions */}
                <div className="w-80 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-gray-600 text-sm">Suite Type</span>
                      <div className="text-gray-800 font-medium text-sm">{selectedBooking.suiteType}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-600 text-sm">Rooms Count</span>
                      <div className="text-gray-800 font-medium">{selectedBooking.roomsCount}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-gray-600 text-sm">Ratings</span>
                      <div className="text-gray-800 font-medium">{selectedBooking.ratings}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-600 text-sm">Status</span>
                      <div className={`font-medium ${
                        selectedBooking.status === 'Done' ? 'text-green-600' :
                        selectedBooking.status === 'Confirmed' ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>{selectedBooking.status}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-600 text-sm">Payment type</span>
                    <div className="text-gray-800 font-medium">{selectedBooking.paymentType}</div>
                  </div>

                  {/* View Bill Button */}
                  <div className="flex justify-end pt-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors">
                      <FileText className="w-4 h-4" />
                      <span>View Bill</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDashboard;