import React from "react";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card";

interface Renting {
  id: number;
  type: string;
  image: string;
  requestedBy: string;
  requestedDays: number;
  orderedFrom: string;
  orderedTo: string;
}

const ViewRentings: React.FC = () => {
  // Mock data - in a real app, fetch this from your API/backend
  const rentings: Renting[] = [
    {
      id: 1,
      type: "Three Wheeler",
      image: "/src/assets/images/vehicles/tuktuk.png", // Update with actual path
      requestedBy: "email, phone number",
      requestedDays: 3,
      orderedFrom: "2025/04/02",
      orderedTo: "2025/04/05",
    },
    {
      id: 2,
      type: "Car",
      image: "/src/assets/images/vehicles/alphard.png", // Update with actual path
      requestedBy: "email, phone number",
      requestedDays: 3,
      orderedFrom: "2025/05/04",
      orderedTo: "2025/05/07",
    },
    {
      id: 3,
      type: "Car",
      image: "/src/assets/images/vehicles/alphard.png", // Update with actual path
      requestedBy: "email, phone number",
      requestedDays: 3,
      orderedFrom: "",
      orderedTo: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 pl-16 pr-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal text-gray-700">
            Welcome, Reciptionist
          </h1>
          <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2025</p>
        </div>
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative bg-white rounded-full shadow-sm">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>

          {/* Notification Icon with badge */}
          <div className="relative cursor-pointer">
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Profile Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="/src/assets/images/avatar.jpg" // Update with actual path
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Rentings Header - Using same styling as Dashboard Header */}
      <div className="rounded-t-2xl p-4 mb-4 bg-[#6B72D6] flex items-center">
        <button className="mr-4 p-1 rounded-full border border-white">
          <ArrowLeft size={24} color="white" />
        </button>
        <h2 className="text-2xl font-bold text-white">Rentings</h2>
      </div>

      {/* Rentings List - Using Card component and styled similarly to bookings */}
      <Card className="bg-white rounded-2xl shadow-lg p-6 border-0 mb-6">
        <div className="space-y-6">
          {rentings.map((renting) => (
            <div
              key={renting.id}
              className="flex items-start justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <div className="flex">
                <div className="w-32 h-24 mr-6 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={renting.image}
                    alt={renting.type}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    {renting.type}
                  </h3>
                  <p className="text-gray-600 text-base mb-1">
                    Requested by : {renting.requestedBy}
                  </p>
                  <p className="text-gray-600 text-base mb-1">
                    Requested days : {renting.requestedDays}
                  </p>
                  {renting.orderedFrom && (
                    <p className="text-gray-600 text-base">
                      Ordered From : {renting.orderedFrom} - {renting.orderedTo}
                    </p>
                  )}
                </div>
              </div>
              <button className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-5 py-1.5 rounded-full text-sm font-medium transition-colors">
                Done
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* View Vehicles Button - Similar to buttons in ClientDashboard_Bookings */}
      <div className="flex justify-end mt-6">
        <button className="border border-[#6B72D6] text-[#6B72D6] bg-white hover:bg-[#6B72D6]/10 px-8 py-2.5 rounded-full text-base font-normal transition-colors">
          View vehicles
        </button>
      </div>

      {/* Footer with gradient background like in ClientDashboards_Bookings */}
      <div className="bg-[#6B72D6]/10 px-8 py-6 flex justify-center items-center mt-8 -mb-8 -ml-16 -mr-16">
        <p className="text-gray-500 text-base">
          © 2025 Hotel Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ViewRentings;
