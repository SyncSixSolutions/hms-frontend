import React from 'react';
import { Search, CreditCard, Wallet } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ClientDashboard: React.FC = () => {
  return (    <div className="min-h-screen bg-gray-100 p-8">
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
      </div>      {/* My Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 mb-4">
        <h2 className="text-2xl font-bold text-white">My Dashboard</h2>
      </div>

      {/* Main Content */}
      <div className="space-y-4">        {/* Bookings and Reservations */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your bookings and reservations</h3>
          
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              {/* Globe Illustration - Simplified */}
              <div className="mb-4 flex justify-center">
                <div className="relative w-32 h-32">
                  {/* Globe base */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-300 via-yellow-300 to-orange-400 relative overflow-hidden shadow-lg">
                    {/* Continents */}
                    <div className="absolute top-3 left-5 w-10 h-6 bg-orange-500 rounded-full opacity-80"></div>
                    <div className="absolute bottom-5 right-3 w-6 h-4 bg-orange-600 rounded-full opacity-70"></div>
                    <div className="absolute top-6 right-5 w-5 h-3 bg-yellow-600 rounded-full opacity-60"></div>
                    <div className="absolute bottom-10 left-6 w-8 h-5 bg-orange-500 rounded-full opacity-75"></div>
                  </div>
                  {/* Globe stand */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-blue-600 rounded-b-xl shadow-md"></div>
                  {/* Flags */}
                  <div className="absolute -top-1 left-6 w-5 h-3 bg-blue-500 transform rotate-12 shadow-sm"></div>
                  <div className="absolute top-1 right-5 w-5 h-3 bg-red-500 transform -rotate-12 shadow-sm"></div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-blue-900 mb-3">Wanna Stay ?</h4>
              <p className="text-gray-600 mb-4 max-w-lg text-sm leading-relaxed">
                You haven't started any bookings or reservations yet. Once you make a booking, it'll appear here.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm">
                Book Now
              </Button>
            </div>
          </div>
        </Card>        {/* Bottom Row - Payment and Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Methods */}
          <Card className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Payment methods</h3>
            
            <div className="flex items-start space-x-3 mb-3">
              <Wallet className="text-gray-400 w-4 h-4 mt-1" />
              <span className="text-gray-600 text-xs leading-relaxed">You don't have any added payment methods</span>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">click here to add a payment methods</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm">
                Add Payment
              </Button>
            </div>
          </Card>

          {/* Vehicle Rental */}
          <Card className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Need to rent / hire a vehicle?</h3>
            
            <p className="text-gray-600 text-xs mb-1">Do you need to rent vehicle for the days you stay</p>
            <p className="text-gray-600 text-xs mb-3">Pick the vehicles who are associated with our hotel NOW !</p>
            
            <div className="text-center">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded-full text-xs font-medium shadow-sm">
                Rent
              </Button>
            </div>
          </Card>
        </div>
      </div>      {/* Due Payments */}
      <div className="mt-4 text-right">
        <span className="text-gray-600 text-sm">Due Payments: </span>
        <span className="font-semibold text-green-600 text-sm">0 lkr</span>
      </div>
    </div>
  );
};

export default ClientDashboard;