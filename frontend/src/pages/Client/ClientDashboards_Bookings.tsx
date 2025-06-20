import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search } from 'lucide-react';
import roomImg from '../../assets/images/room1.png';
import poolImg from '../../assets/images/room23.jpg';
import therapyImg from '../../assets/images/treatment.jpg';
import vehicleImg from '../../assets/images/cars.png';

const ClientDashboards_Bookings: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6"> {/* Matched with UserProfile */}
      {/* Main container with wider width to minimize edge distance */}
      <div className="max-w-[95%] mx-auto"> {/* Matched with UserProfile */}
        {/* Header - now aligned with card below */}
        <div className="flex justify-between items-center mb-3"> {/* Matched with UserProfile */}
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Serena</h1> {/* Matched text color */}
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3"> {/* Reduced spacing to match UserProfile */}
            {/* Search Bar */}
            <div className="relative bg-white rounded-full shadow-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-60 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm"> {/* Matched with UserProfile */}
              <img
                src="/src/assets/images/avatar.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>      
      
        {/* My Dashboard Header - matched with UserProfile */}
        <div className="rounded-t-lg overflow-hidden"> {/* Added overflow-hidden like UserProfile */}
          <div className="rounded-t-lg p-2 bg-[#6B72D6]"> {/* Matched padding and radius with UserProfile */}
            <h2 className="text-xl font-bold text-white ml-1">My Dashboard</h2> {/* Matched font size and margin */}
          </div>

          {/* Bookings and Reservations */}
          <div className="p-2 bg-white rounded-b-lg"> {/* Matched padding with UserProfile */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Your bookings and reservations</h3> {/* Matched text size */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-stretch"> {/* Reduced gap */}
                <img 
                  src={roomImg} 
                  alt="Room" 
                  className="md:w-64 w-full h-auto md:h-48 object-cover rounded-lg shadow-sm" 
                /> {/* Reduced image size */}
                
                {/* Room Details */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-sm mb-1 text-[#6B72D6]">Main Floor Lounge</div> {/* Reduced text size */}
                    <div className="text-xl font-medium mb-2 text-gray-800">Room near the ocean end</div> {/* Matched heading style */}
                    <ul className="mb-3"> {/* Reduced margin */}
                      {["Breakfast and Dinner ( Gold meal plan )", "Room 2 Beds 1 Bath", "Duration : From 12th June 2025 to 15th June 2025", "Oil therapy - 13th June 5.00 pm"].map((detail, index) => (
                        <li key={index} className="pl-4 relative mb-1 text-gray-600 text-sm"> {/* Adjusted text size and color */}
                          <span className="absolute left-0 text-[#6B72D6]">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="text-sm hover:underline text-[#6B72D6]">Add more Reservations</a> {/* Adjusted text size */}
                  </div>                    
                  
                  {/* Reservation Thumbnails */}
                  <div className="flex mt-3 overflow-x-auto gap-2"> {/* Reduced margin and gap */}
                    {/* Pool */}
                    <div className="w-24 h-18 rounded-lg overflow-hidden mr-2 shrink-0 relative group"> {/* Reduced size */}
                      <img
                        src={poolImg}
                        alt="Swimming Pool"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Swimming Pool
                      </span>
                    </div>
                    
                    {/* Therapy */}
                    <div className="w-24 h-18 rounded-lg overflow-hidden mr-2 shrink-0 relative group"> {/* Reduced size */}
                      <img
                        src={therapyImg}
                        alt="Therapy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Therapy
                      </span>
                    </div>
                    
                    {/* Vehicle */}
                    <div className="w-24 h-18 rounded-lg overflow-hidden mr-2 shrink-0 relative group"> {/* Reduced size */}
                      <img
                        src={vehicleImg}
                        alt="Vehicles"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Vehicles
                      </span>
                    </div>
                    
                    {/* Add Button */}
                    <div className="w-24 h-18 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 hover:bg-gray-200 cursor-pointer transition-colors">
                      <div className="text-xl text-[#6B72D6]">+</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods & Vehicle Rental */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"> {/* Reduced gap */}
                {/* Payment Methods */}
                <div className="bg-white rounded-lg shadow-sm p-2 border border-gray-100"> {/* Matched card style */}
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment methods</h3> {/* Matched heading style */}
                  <div className="mb-3">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-7 mr-3 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto" />
                      </div>
                      <span className="text-gray-700 text-sm">1992********4224</span> {/* Reduced text size */}
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-7 mr-3 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto" />
                      </div>
                      <span className="text-gray-700 text-sm">1542********7574</span> {/* Reduced text size */}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs text-gray-500">click here to change payment methods</p>
                    <Button variant="border" className="text-sm px-3 py-1">Add Payment</Button> {/* Reduced button size */}
                  </div>
                </div>

                {/* Vehicle Rental */}
                <div className="bg-white rounded-lg shadow-sm p-2 border border-gray-100 relative overflow-hidden"> {/* Matched card style */}
                  {/* Background car image */}
                  <div className="absolute inset-0 opacity-5">
                    <img src={vehicleImg} alt="Vehicle background" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Need to rent / hire a vehicle?</h3> {/* Matched heading style */}
                    <p className="text-gray-600 text-sm mb-1">Do you need to rent vehicle for the days you stay</p> {/* Reduced text size */}
                    <p className="text-gray-600 text-sm mb-3">Pick the vehicles who are associated with our hotel NOW!</p> {/* Reduced text size */}
                    <Button variant="border" className="text-sm px-3 py-1">Rent / Hire</Button> {/* Reduced button size */}
                  </div>
                </div>
              </div>

              {/* Due Payments - aligned with bottom edge style */}
              <div className="mt-4 bg-gray-100 rounded-lg p-2 flex justify-between items-center">
                <div>
                  <span className="text-gray-700 text-sm">Due Payments: </span>
                  <span className="font-medium text-[#6B72D6] text-sm">7400 lkr</span>
                </div>
                <div>
                  <a href="#" className="text-xs hover:underline text-[#6B72D6]">View full bill here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboards_Bookings;