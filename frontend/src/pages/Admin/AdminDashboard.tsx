import React, { useState } from "react";
import { Search, MoreHorizontal, Filter, ChevronDown } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import AreaChart from "../../components/charts/AreaChart"; // You'll need to create this chart component
import DonutChart from "../../components/charts/DonutChart"; // You'll need to create this chart component

const AdminDashboard: React.FC = () => {
  const [timeframeFilter, setTimeframeFilter] = useState("Weekly");

  // Mock data for charts and statistics
  const bookingStats = {
    bookedRooms: 12,
    totalRooms: 20,
    bookedPercentage: "+8.5%",
    cancelledRooms: 8,
    cancelledPercentage: "-24.8%",
    checkInAmount: "Rs. 50,000",
    checkInPercentage: "+14.6%",
    checkOutAmount: "Rs. 35,000",
    checkOutPercentage: "+12.8%",
    totalRevenue: "$64,456",
  };

  const guestStats = {
    totalGuests: "14,839",
    adults: "6,738",
    children: "3,456",
    countries: [
      {
        name: "United States",
        flag: "🇺🇸",
        adults: 100,
        children: 20,
        percentage: 72,
      },
      {
        name: "Sri Lanka",
        flag: "🇱🇰",
        adults: 100,
        children: 20,
        percentage: 64,
      },
      {
        name: "Australia",
        flag: "🇦🇺",
        adults: 100,
        children: 20,
        percentage: 48,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pl-16 pr-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal text-gray-700">Welcome, Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2022</p>
        </div>
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative bg-white rounded-full shadow-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
          {/* Profile Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="/src/assets/images/admin-avatar.jpg"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Header - Matching ClientDashboard styling */}
      <div className="rounded-t-2xl p-4 mb-4 bg-[#6B72D6]">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
      </div>

      {/* Hotel Facilities Management Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Manage Hotel Facilities
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-blue-700 px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
            Manage Rooms
          </Button>
          <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-blue-700 px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
            Manage Meals
          </Button>
          <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-blue-700 px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
            Manage Therapies
          </Button>
          <Button className="border border-blue-400 text-blue-500 bg-white hover:bg-blue-50 hover:text-blue-700 px-6 py-2 rounded-full text-base font-normal shadow-none transition-colors">
            Manage Vehicles
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Chart Section - Takes 2/3 width on large screens */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 border-0 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Overview</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1 text-sm bg-white">
                  {timeframeFilter}
                  <ChevronDown size={14} />
                </Button>
              </div>
              <button className="p-1">
                <MoreHorizontal size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-64 w-full">
            {/* This would typically be your chart component */}
            <div className="relative h-full w-full">
              {/* Chart Legend */}
              <div className="absolute top-0 left-8 flex items-center space-x-4 text-xs text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                  <span>Booked 875</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-700 rounded-full mr-1"></div>
                  <span>Visited 1254</span>
                </div>
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                <span>20K</span>
                <span>15K</span>
                <span>10K</span>
                <span>5K</span>
                <span>1K</span>
                <span>0K</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-400">
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>

              {/* Mock Chart - In a real application, you would use a proper chart library */}
              <div className="absolute top-8 left-12 right-0 bottom-6 bg-indigo-50 rounded overflow-hidden">
                {/* This would be replaced by your actual chart */}
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage:
                      "url('/src/assets/images/mock-area-chart.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards - Right Column */}
        <div className="grid grid-cols-2 gap-4">
          {/* Booked Rooms Card */}
          <Card className="bg-white rounded-2xl shadow-lg p-5 border-0 relative">
            <div className="absolute top-4 right-4 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
              {bookingStats.bookedPercentage}
            </div>
            <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold mb-1">
              {bookingStats.bookedRooms} / {bookingStats.totalRooms}
            </h2>
            <p className="text-sm text-gray-500">Booked Rooms</p>
          </Card>

          {/* Cancelled Rooms Card */}
          <Card className="bg-white rounded-2xl shadow-lg p-5 border-0 relative">
            <div className="absolute top-4 right-4 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
              {bookingStats.cancelledPercentage}
            </div>
            <div className="bg-red-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold mb-1">
              {bookingStats.cancelledRooms}
            </h2>
            <p className="text-sm text-gray-500">Cancelled Rooms</p>
          </Card>

          {/* Check In Card */}
          <Card className="bg-white rounded-2xl shadow-lg p-5 border-0 relative">
            <div className="absolute top-4 right-4 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
              {bookingStats.checkInPercentage}
            </div>
            <div className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold mb-1">
              {bookingStats.checkInAmount}
            </h2>
            <p className="text-sm text-gray-500">Check in</p>
          </Card>

          {/* Check Out Card */}
          <Card className="bg-white rounded-2xl shadow-lg p-5 border-0 relative">
            <div className="absolute top-4 right-4 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
              {bookingStats.checkOutPercentage}
            </div>
            <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold mb-1">
              {bookingStats.checkOutAmount}
            </h2>
            <p className="text-sm text-gray-500">Check out</p>
          </Card>
        </div>
      </div>

      {/* Bottom section - Guests and Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Guests Section */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 border-0 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              No of current guests
            </h3>
            <div className="flex items-center gap-2">
              <Button className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1 text-sm bg-white">
                <Filter size={14} />
                Filters
              </Button>
              <button className="p-1">
                <MoreHorizontal size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Guest Stats Summary */}
          <div className="flex gap-4 mb-6">
            <div className="bg-indigo-100 px-6 py-4 rounded flex flex-col items-start">
              <span className="text-xl font-bold">
                {guestStats.totalGuests}
              </span>
              <span className="text-xs text-gray-600">Total guests</span>
            </div>
            <div className="bg-gray-200 px-6 py-4 rounded flex flex-col items-start">
              <span className="text-xl font-bold">{guestStats.adults}</span>
              <span className="text-xs text-gray-600">Of Adults</span>
            </div>
            <div className="bg-yellow-100 px-6 py-4 rounded flex flex-col items-start">
              <span className="text-xl font-bold">{guestStats.children}</span>
              <span className="text-xs text-gray-600">Of Children</span>
            </div>
          </div>

          {/* Countries List */}
          <div className="space-y-5">
            {guestStats.countries.map((country, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="mr-2">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {country.adults} Adults, {country.children} Children
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      index === 0
                        ? "bg-indigo-500"
                        : index === 1
                        ? "bg-gray-500"
                        : "bg-yellow-400"
                    }`}
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Section */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 border-0">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Revenue Stat
            </h3>
            <button className="p-1">
              <MoreHorizontal size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Donut Chart */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              {/* This would be replaced by a proper donut chart */}
              <div className="w-full h-full rounded-full border-16 border-green-500 border-r-yellow-400 border-b-indigo-600"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-xs text-gray-500">Total Revenue</p>
                <p className="font-bold text-xl">{bookingStats.totalRevenue}</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs">Check In</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-xs">Check out</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
              <span className="text-xs">Booked</span>
            </div>
          </div>

          {/* Revenue Note */}
          <div className="text-xs text-gray-500 flex items-center justify-center">
            <span className="text-green-500 mr-1">+25%</span>
            <span>You earned $4,996 more compared to last month</span>
          </div>
        </Card>
      </div>

      {/* Footer with gradient background like in ClientDashboard */}
      <div className="bg-[#6B72D6]/10 px-8 py-6 flex justify-end items-center mt-8 -mb-8 -ml-16 -mr-16">
        <span className="text-gray-600 text-lg font-medium mr-2">
          Total Revenue :
        </span>
        <span className="font-semibold text-green-600 text-lg">
          {bookingStats.totalRevenue}
        </span>
      </div>
    </div>
  );
};

export default AdminDashboard;
