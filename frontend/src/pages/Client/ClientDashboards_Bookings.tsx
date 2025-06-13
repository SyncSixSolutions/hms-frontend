import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Wallet } from 'lucide-react';
import roomImg from '../../assets/images/room1.png';
import poolImg from '../../assets/images/room2.jpg';
import therapyImg from '../../assets/images/theraphy/treatment_1.png';
import vehicleImg from '../../assets/images/vehicles/alphard.png';

const ClientDashboards_Bookings: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] p-0 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-4 md:px-0">
        <div>
          <h1 className="text-2xl font-normal text-gray-700">Welcome, Serena</h1>
          <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2022</p>
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <div className="relative bg-white rounded-full shadow-sm">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">🔍</span>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src= "/src/assets/images/avatar.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="rounded-t-2xl p-4 mb-8 bg-[#7B7FEA]">
        <h2 className="text-3xl font-extrabold text-white">My Dashboard</h2>
      </div>

      {/* Bookings and Reservations */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">Your bookings and reservations</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Room Image */}
            <img src={roomImg} alt="Room" className="w-60 h-60 object-cover rounded-xl shadow" />
            {/* Room Details */}
            <div className="flex-1">
              <div className="text-sm text-blue-700 font-medium mb-1">Main Floor Lounge</div>
              <div className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-2">Room near the ocean end</div>
              <ul className="list-disc ml-5 text-gray-700 mb-2">
                <li>Breakfast and Dinner ( Gold meal plan )</li>
                <li>Room 2 Beds 1 Bath</li>
                <li>Duration : From 12th June 2025 to 15th June 2025</li>
                <li>Oil therapy - 13th June 5.00 pm</li>
              </ul>
              <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Add more Reservations</a>
              {/* Reservation Thumbnails */}
              <div className="flex gap-4 mt-4">
                <img src={poolImg} alt="Pool" className="w-32 h-20 object-cover rounded-lg" />
                <div className="relative w-32 h-20">
                  <img src={therapyImg} alt="Therapy" className="w-full h-full object-cover rounded-lg" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black/40 rounded-lg">Therapy</span>
                </div>
                <img src={vehicleImg} alt="Vehicle" className="w-32 h-20 object-cover rounded-lg" />
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-2xl text-blue-400 ml-2">+</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Methods & Vehicle Rental */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Payment Methods */}
          <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Payment methods</h3>
            <div className="mb-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-blue-900 font-mono text-lg tracking-wider">1992********4224</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="w-10 h-6 object-contain" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-900 font-mono text-lg tracking-wider">1542********7574</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-sm text-gray-400">click here to change payment methods</p>
              <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
                Add Payment
              </Button>
            </div>
          </Card>

          {/* Vehicle Rental */}
          <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Need to rent / hire a vehicle?</h3>
            <div className="mb-8">
              <p className="text-base text-gray-600">Do you need to rent vehicle for the days you stay</p>
              <p className="text-base text-gray-600">Pick the vehicles  who are associated with our hotel NOW !</p>
            </div>
            <div className="flex justify-end mt-auto">
              <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 px-8 py-2 rounded-full text-base font-normal shadow-none transition-colors">
                Rent / Hire
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Due Payments */}
      <div className="w-full bg-[#e9e9f6] rounded-b-2xl py-6 flex justify-end items-center">
        <span className="text-gray-600 text-lg font-medium mr-2">Due Payments :</span>
        <span className="font-semibold text-green-600 text-lg">7400 lkr</span>
        <a href="#" className="ml-6 text-blue-700 text-sm underline">View full bill here</a>
      </div>
    </div>
  );
};

export default ClientDashboards_Bookings;
