import React from 'react';
import { Search, CreditCard, Wallet } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import tripGlobe from '../../assets/images/tripGlobe.png';

const ClientDashboard: React.FC = () => {
  return (    
  <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal text-gray-700">Welcome, Serena</h1>
          <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2022</p>
        </div><div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative bg-white rounded-full shadow-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
          {/* Profile Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="/src/assets/images/avatar.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>      
      
      {/* My Dashboard Header */}
    <div className="rounded-t-2xl p-4 mb-4 bg-[#6B72D6]">
        <h2 className="text-2xl font-bold text-white">My Dashboard</h2>
      </div>

      {/* Main Content */}
      <div className="space-y-4">          
        
        {/* Bookings and Reservations */}
        <Card className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Your bookings and reservations</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center py-8 gap-12">
            {/* Globe Image on the left */}
            <div className="flex-shrink-0 flex justify-center md:justify-start w-64 h-64">
              <img
            src={tripGlobe}
            alt="Globe"
            className="w-full h-full object-contain drop-shadow-lg"
            style={{ filter: 'brightness(1.05) contrast(1.05)' }}
              />
            </div>
            {/* Text and Button on the right */}
            <div className="text-center md:text-left max-w-md">
              <h4 className="text-3xl font-extrabold text-blue-900 mb-4">Wanna Stay ?</h4>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
            You haven't started any bookings or reservations yet. Once you make a booking, it'll appear here.
              </p>
              <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-white px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
            Book Now
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Bottom Row - Payment and Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Methods */}
          <Card className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-6">Payment methods</h3>
                <div className="flex items-center space-x-4 mb-8">
                    <Wallet className="text-blue-900 w-7 h-7" />
                    <span className="text-gray-700 text-base">You don't have any added payment methods</span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">click here to add a payment methods</p>
                    <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-white px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
                    Add Payment
                    </Button>
                </div>
           </Card>

          {/* Vehicle Rental */}
          <Card className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Need to rent / hire a vehicle?</h3>
            <div className="mb-8">
              <p className="text-base text-gray-600">Do you need to rent vehicle for the days you stay</p>
              <p className="text-base text-gray-600">Pick the vehicles  who are associated with our hotel NOW !</p>
            </div>
            <div className="flex justify-end">
              <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-white px-8 py-2 rounded-full text-base font-normal shadow-none transition-colors">
                Rent
              </Button>
            </div>
          </Card>
        </div>
      </div>      
      {/* Due Payments */}
    <div className="bg-[#6B72D6]/10 px-8 py-6 flex justify-end items-center mt-8 -mb-8 -ml-8 -mr-8">
        <span className="text-gray-600 text-lg font-medium mr-2">Due Payments :</span>
        <span className="font-semibold text-green-600 text-lg">0 lkr</span>
    </div>
    </div>
  );
};

export default ClientDashboard;