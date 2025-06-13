import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search } from 'lucide-react';
import roomImg from '../../assets/images/room1.png';
import poolImg from '../../assets/images/room23.jpg';
import therapyImg from '../../assets/images/treatment.jpg';
import vehicleImg from '../../assets/images/cars.png';

const ClientDashboards_Bookings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8  pl-16 pr-16">
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

      {/* Bookings and Reservations */}
      <div className="space-y-4">
        <Card className="bg-white rounded-2xl shadow-lg p-6 pl-8 pr-8 pb-10 border-0">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8">Your bookings and reservations</h3>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-stretch">
                <img src={roomImg} alt="Room" className="w-[480px] h-75 object-cover rounded-xl shadow self-center md:self-auto ml-3 mr-5" />
                {/* Room Details */}
                <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                        <div className="text-lg text-[#7F87DC] font-medium mb-1">Main Floor Lounge</div>
                        <div className="text-3xl font-extrabold text-grey-900 mb-2">Room near the ocean end</div>
                        <ul className="list-disc ml-5 text-gray-700 mb-2 text-base">
                            <li>Breakfast and Dinner ( Gold meal plan )</li>
                            <li>Room 2 Beds 1 Bath</li>
                            <li>Duration : From 12th June 2025 to 15th June 2025</li>
                            <li>Oil therapy - 13th June 5.00 pm</li>
                        </ul>
                        <a href="#" className="text-[#7F87DC] text-lg font-medium hover:text-[#6B72D6]">Add more Reservations</a>
                    </div>                    
                    {/* Reservation Thumbnails */}
                    <div className="flex gap-4 mt-6">
                        {/* Pool */}
                        <div className="relative group w-40 h-24 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:z-10">
                            <img
                                src={poolImg}
                                alt="Pool"
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 ease-in-out rounded-lg">
                                <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                    Pool +
                                </span>
                            </div>
                        </div>
                        {/* Therapy */}
                        <div className="relative group w-40 h-24 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:z-10">
                            <img
                                src={therapyImg}
                                alt="Therapy"
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 ease-in-out rounded-lg">
                                <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                    Therapy +
                                </span>
                            </div>
                        </div>
                        {/* Vehicle */}
                        <div className="relative group w-40 h-24 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:z-10">
                            <img
                                src={vehicleImg}
                                alt="Vehicle"
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 ease-in-out rounded-lg">
                                <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                    Vehicle +
                                </span>
                            </div>
                        </div>
                        {/* Add Button */}
                        <button className="mt-6 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-2xl text-blue-400 ml-2 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </Card>

        {/* Payment Methods & Vehicle Rental */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Payment Methods */}
          <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border-0">
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
              <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-white px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
                Add Payment
              </Button>
            </div>
          </Card>

          {/* Vehicle Rental */}
          <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border-0">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Need to rent / hire a vehicle?</h3>
            <div className="mb-8">
              <p className="text-base text-gray-600">Do you need to rent vehicle for the days you stay</p>
              <p className="text-base text-gray-600">Pick the vehicles  who are associated with our hotel NOW !</p>
            </div>
            <div className="flex justify-end mt-auto">
              <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-white px-8 py-2 rounded-full text-base font-normal shadow-none transition-colors">
                Rent / Hire
              </Button>
            </div>
          </Card>
        </div>
      </div>      {/* Due Payments */}
       <div className="bg-[#6B72D6]/10 px-8 py-6 flex justify-end items-center mt-8 -mb-8 -ml-16 -mr-16 pl-8 pr-8">
        <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
                <span className="text-gray-600 text-xl font-medium mr-2">Due Payments :</span>
                <span className="font-semibold text-green-600 text-xl">7400 lkr</span>
            </div>
            <a href="#" className="text-gray-500 text-lg">View full bill here</a>
        </div>
       </div>
    </div>
  );
};

export default ClientDashboards_Bookings;
