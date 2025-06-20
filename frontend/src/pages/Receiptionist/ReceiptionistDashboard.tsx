import React, { useState } from "react";
import { Search, Calendar, Bell, LogOut, Hotel, UsersRound, UserCheck, UserPlus, Utensils, Car, ShowerHead } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { AreaChart, DonutChart, PieChart, BarChart, ColumnChart } from "../../components/charts";

const ReceiptionistDashboard: React.FC = () => {
  const [timeframeFilter, setTimeframeFilter] = useState("Today");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Mock data for dashboard statistics
  const dashboardStats = {
    checkIn: {
      count: 12,
      percentage: "+18.5%",
      today: 5
    },
    arrivals: {
      count: 8,
      percentage: "+12.3%",
      today: 3
    },
    departures: {
      count: 6,
      percentage: "-8.4%",
      today: 2
    },
    guestsInHouse: {
      count: 42,
      percentage: "+5.7%",
      adults: 28,
      children: 14
    }
  };

  // Reservation data for area chart
  const reservationData = [
    { date: 'Jan', value: 42 },
    { date: 'Feb', value: 55 },
    { date: 'Mar', value: 48 },
    { date: 'Apr', value: 49 },
    { date: 'May', value: 78 },
    { date: 'Jun', value: 85 },
    { date: 'Jul', value: 92 },
    { date: 'Aug', value: 98 },
    { date: 'Sep', value: 75 },
    { date: 'Oct', value: 62 },
    { date: 'Nov', value: 55 },
    { date: 'Dec', value: 70 },
  ];

  // Room status data for pie chart
  const roomStatusData = [
    { label: 'Occupied', value: 28, color: '#6B72D6' },
    { label: 'Available', value: 14, color: '#4ADE80' },
    { label: 'Maintenance', value: 3, color: '#F97316' },
    { label: 'Reserved', value: 8, color: '#F59E0B' },
  ];
  
  // Room types distribution data for donut chart
  const roomTypesData = [
    { label: 'Standard', value: 15, color: '#6B72D6' },
    { label: 'Deluxe', value: 18, color: '#F59E0B' },
    { label: 'Suite', value: 12, color: '#4ADE80' },
    { label: 'Executive', value: 8, color: '#EC4899' },
  ];

  // Weekly occupancy trends data for bar chart
  const weeklyOccupancyData = [
    { label: 'Mon', value: 32 },
    { label: 'Tue', value: 36 },
    { label: 'Wed', value: 42 },
    { label: 'Thu', value: 38 },
    { label: 'Fri', value: 45 },
    { label: 'Sat', value: 48 },
    { label: 'Sun', value: 40 },
  ];

  // Upcoming check-ins table data
  const upcomingCheckIns = [
    { id: 'R-1001', guestName: 'John Smith', roomType: 'Deluxe', status: 'Confirmed', checkIn: '11:30 AM', nights: 3 },
    { id: 'R-1002', guestName: 'Sarah Johnson', roomType: 'Suite', status: 'Confirmed', checkIn: '01:00 PM', nights: 2 },
    { id: 'R-1003', guestName: 'Michael Brown', roomType: 'Standard', status: 'Pending', checkIn: '02:45 PM', nights: 5 },
    { id: 'R-1004', guestName: 'Emma Wilson', roomType: 'Executive', status: 'Confirmed', checkIn: '04:00 PM', nights: 1 },
  ];

  // Upcoming check-ins table columns
  const checkInColumns = [
    { header: 'Booking ID', accessor: 'id' as keyof typeof upcomingCheckIns[0] },
    { header: 'Guest Name', accessor: 'guestName' as keyof typeof upcomingCheckIns[0] },
    { header: 'Room Type', accessor: 'roomType' as keyof typeof upcomingCheckIns[0] },
    { header: 'Status', accessor: 'status' as keyof typeof upcomingCheckIns[0] },
    { header: 'Check-in Time', accessor: 'checkIn' as keyof typeof upcomingCheckIns[0] },
    { header: 'Nights', accessor: 'nights' as keyof typeof upcomingCheckIns[0] },
  ];

  // Available rooms table data
  const availableRooms = [
    { roomNumber: '101', type: 'Standard', capacity: '2 Adults', price: 'Rs. 8,500', status: 'Available', amenities: 'WiFi, TV, AC' },
    { roomNumber: '205', type: 'Deluxe', capacity: '2 Adults, 1 Child', price: 'Rs. 12,500', status: 'Available', amenities: 'WiFi, TV, AC, Mini Bar' },
    { roomNumber: '307', type: 'Suite', capacity: '2 Adults, 2 Children', price: 'Rs. 18,000', status: 'Available', amenities: 'WiFi, TV, AC, Mini Bar, Bathtub' },
    { roomNumber: '410', type: 'Executive', capacity: '3 Adults', price: 'Rs. 22,500', status: 'Available', amenities: 'WiFi, TV, AC, Mini Bar, Bathtub, Lounge' },
  ];  // Available rooms table columns with cell rendering for better visual presentation
  const roomsColumns = [
    { 
      header: 'Room #', 
      accessor: 'roomNumber' as keyof typeof availableRooms[0],
      cell: (value: string | number | boolean) => <span className="font-medium text-gray-700">{value.toString()}</span>
    },
    { 
      header: 'Type', 
      accessor: 'type' as keyof typeof availableRooms[0],
      cell: (value: string | number | boolean) => {
        const valueStr = value.toString();
        const colorMap: Record<string, string> = {
          'Standard': 'bg-blue-100 text-blue-700',
          'Deluxe': 'bg-purple-100 text-purple-700',
          'Suite': 'bg-amber-100 text-amber-700',
          'Executive': 'bg-rose-100 text-rose-700',
        };
        return (
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[valueStr] || 'bg-gray-100 text-gray-700'}`}>
            {valueStr}
          </span>
        );
      }
    },
    { header: 'Capacity', accessor: 'capacity' as keyof typeof availableRooms[0] },
    { 
      header: 'Price/Night', 
      accessor: 'price' as keyof typeof availableRooms[0],
      cell: (value: string | number | boolean) => <span className="font-medium text-gray-900">{value.toString()}</span>
    },
    { 
      header: 'Status', 
      accessor: 'status' as keyof typeof availableRooms[0],
      cell: (value: string | number | boolean) => {
        const valueStr = value.toString();
        const statusColor = valueStr === 'Available' 
          ? 'bg-green-100 text-green-700' 
          : valueStr === 'Reserved' 
            ? 'bg-amber-100 text-amber-700'
            : 'bg-gray-100 text-gray-700';
        
        return (
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}>
            {valueStr}
          </span>
        );
      }
    },
    { 
      header: 'Amenities', 
      accessor: 'amenities' as keyof typeof availableRooms[0],
      cell: (value: string | number | boolean) => (
        <div className="flex flex-wrap gap-1">
          {value.toString().split(', ').map(amenity => (
            <span key={amenity} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {amenity}
            </span>
          ))}
        </div>
      )
    },
  ];
  // Quick actions for receptionist
  const quickActions = [
    { name: 'Check In', icon: <UserCheck size={18} />, color: 'text-emerald-600 border-emerald-200' },
    { name: 'Check Out', icon: <LogOut size={18} />, color: 'text-amber-600 border-amber-200' },
    { name: 'New Booking', icon: <UserPlus size={18} />, color: 'text-indigo-600 border-indigo-200' },
    { name: 'Rooms', icon: <Hotel size={18} />, color: 'text-blue-600 border-blue-200' },
    { name: 'Food Order', icon: <Utensils size={18} />, color: 'text-rose-600 border-rose-200' },
    { name: 'Vehicle', icon: <Car size={18} />, color: 'text-violet-600 border-violet-200' },
    { name: 'Spa', icon: <ShowerHead size={18} />, color: 'text-teal-600 border-teal-200' },
  ];  return (
    <div className="min-h-screen bg-gray-100 p-8 pl-16 pr-16">
      {/* Header */}      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal text-gray-700">Welcome, Receptionist</h1>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative bg-white rounded-full shadow-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
            />          </div>
          {/* Notification Icon */}
          <div className="relative">
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Notifications"
              title="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          {/* Profile Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="/src/assets/images/profile_image.jpeg"
              alt="Receptionist"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>      
      {/* Dashboard Header - Matching AdminDashboard styling */}
      <div className="rounded-t-2xl p-4 mb-4 bg-[#6B72D6]">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
      </div>

      {/* Quick Actions */}      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>        
        <div className="grid grid-cols-7 gap-2">
          {quickActions.map((action) => (
            <button 
              key={action.name}
              className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white border-2 ${action.color} hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-inner`}
              aria-label={action.name}
            >
              <div className={`p-2 rounded-lg mb-1 ${action.color.replace('border-', 'bg-').replace('600', '100')}`}>
                {action.icon}
              </div>
              <span className={`text-xs font-medium ${action.color.replace('border-', 'text-')}`}>
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </div>      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">          
        {/* Check-in Stats */}
        <Card className="bg-white shadow hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden border-0 transform hover:-translate-y-1">
          {/* Removed top border/line */}
          <div className="flex justify-between items-start p-1 pt-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Check-in Guests</p>
              <h4 className="text-3xl font-bold text-gray-800 mt-2">{dashboardStats.checkIn.count}</h4>
              <div className="flex items-center mt-2">
            <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">{dashboardStats.checkIn.percentage}</span>
            <span className="text-xs text-gray-500 ml-2">vs last week</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl shadow-inner">
              <UserCheck className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 px-1 py-2">
            <span className="text-xs font-medium text-gray-600">Today: <span className="font-bold text-blue-600">{dashboardStats.checkIn.today}</span> guests</span>
          </div>
        </Card>
        {/* Arrivals Stats */}
        <Card className="bg-white shadow hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden border-0 transform hover:-translate-y-1">
          {/* Removed top border/line */}
          <div className="flex justify-between items-start p-1 pt-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Arrivals</p>
              <h4 className="text-3xl font-bold text-gray-800 mt-2">{dashboardStats.arrivals.count}</h4>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">{dashboardStats.arrivals.percentage}</span>
                <span className="text-xs text-gray-500 ml-2">vs last week</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-xl shadow-inner">
              <UserPlus className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 px-1 py-2">
            <span className="text-xs font-medium text-gray-600">Today: <span className="font-bold text-green-600">{dashboardStats.arrivals.today}</span> arrivals</span>
          </div>
        </Card>        
        {/* Departures Stats */}
        <Card className="bg-white shadow hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden border-0 transform hover:-translate-y-1">
          {/* Removed top border/line */}
          <div className="flex justify-between items-start p-1 pt-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Departures</p>
              <h4 className="text-3xl font-bold text-gray-800 mt-2">{dashboardStats.departures.count}</h4>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">{dashboardStats.departures.percentage}</span>
                <span className="text-xs text-gray-500 ml-2">vs last week</span>
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl shadow-inner">
              <LogOut className="text-amber-600" size={24} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 px-1 py-2">
            <span className="text-xs font-medium text-gray-600">Today: <span className="font-bold text-amber-600">{dashboardStats.departures.today}</span> departures</span>
          </div>
        </Card>        
        {/* Guests in House Stats */}
        <Card className="bg-white shadow hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden border-0 transform hover:-translate-y-1">
          {/* Removed top border/line */}
          <div className="flex justify-between items-start p-1 pt-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Guests in House</p>
              <h4 className="text-3xl font-bold text-gray-800 mt-2">{dashboardStats.guestsInHouse.count}</h4>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">{dashboardStats.guestsInHouse.percentage}</span>
                <span className="text-xs text-gray-500 ml-2">occupancy rate</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl shadow-inner">
              <UsersRound className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 px-1 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600"><span className="font-bold text-purple-600">{dashboardStats.guestsInHouse.adults}</span> Adults</span>
              <span className="text-xs font-medium text-gray-600"><span className="font-bold text-purple-600">{dashboardStats.guestsInHouse.children}</span> Children</span>
            </div>
          </div>
        </Card>
      </div>      
      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">        {
      /* Reservations Chart */}          
      <Card className="lg:col-span-2 bg-white shadow-md rounded-xl border-0 overflow-hidden">          
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 via-pink-50/20 to-transparent p-6 relative">
            {/* Pink accent line */}
            {/* <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6B72D6] to-pink-400 rounded-full shadow-sm"></div> */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Reservations Overview</h3>
              <p className="text-sm text-gray-500 mt-1">Monthly booking analytics</p>
            </div>
            <div className="flex space-x-2">
              {["Today", "Weekly", "Monthly", "Yearly"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${
                    timeframeFilter === option
                      ? "bg-[#6B72D6] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setTimeframeFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div><div className="px-6 pb-8 pt-2">
            <ColumnChart 
              data={reservationData}
              height={280}
              color="#6B72D6"
              subtitle="Yearly reservations trend"
            />
          </div>
        </Card>        
        {/* Room Status Pie Chart */}
        <Card className="bg-white shadow rounded-xl border-0 overflow-hidden">
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 to-transparent p-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Room Status</h3>
            </div>
            <button className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors">
              See all
            </button>
          </div>
          <div className="px-4 pb-4">
            <PieChart 
              data={roomStatusData}
              size={200}
            />
          </div>
        </Card>
      </div>      
      {/* Third Row - Table and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">        
        {/* Check-in Guests Table */}
        <Card className="lg:col-span-2 bg-white shadow rounded-xl border-0 overflow-hidden">
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 to-transparent p-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Today's Check-ins</h3>
            </div>
            <button className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors">
              View All
            </button>
          </div>          
          <div className="px-2 pb-2">
            <div className="rounded-lg overflow-hidden shadow-sm">
              <Table columns={checkInColumns} data={upcomingCheckIns} />
            </div>
          </div>
        </Card>        
        {/* Room Types Donut Chart */}
        <Card className="bg-white shadow rounded-xl border-0 overflow-hidden">
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 to-transparent p-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Room Types</h3>
            </div>
            <button className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors">
              Details
            </button>
          </div>
          <div className="px-4 pb-4">
            <DonutChart 
              data={roomTypesData}
              size={200}
            />
          </div>
        </Card>
      </div>      
      {/* Fourth Row - Weekly Occupancy and Available Rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">        
        {/* Weekly Occupancy */}        
        <Card className="bg-white shadow rounded-xl border-0 overflow-hidden">
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 to-transparent p-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Weekly Occupancy</h3>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 bg-green-100 py-1 px-2.5 rounded-full mr-2">+12% vs last week</span>
              <button 
                className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors"
                aria-label="View weekly details"
              >
                See Details
              </button>
            </div>
          </div>
          <div className="px-4 pb-4">
            <BarChart 
              data={weeklyOccupancyData}
              height={220}
              barWidth={25}
            />
          </div>
        </Card>
          {/* Available Rooms Table */}
        <Card className="lg:col-span-2 bg-white shadow rounded-xl border-0 overflow-hidden">
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 to-transparent p-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Available Rooms</h3>
            </div>
            <button className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors">
              View All
            </button>
          </div>          <div className="px-2 pb-2">
            <div className="rounded-lg overflow-hidden shadow-sm">
              <Table columns={roomsColumns} data={availableRooms} />
            </div>
          </div>
        </Card>
      </div>        {/* Calendar Section */}      
      <Card className="bg-white shadow rounded-xl border-0 overflow-hidden mb-6">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#6B72D6]/10 to-transparent p-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Reservations</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors"
              aria-label="Daily view"
            >
              Day
            </button>
            <button 
              className="text-xs text-white font-medium bg-[#6B72D6] px-3 py-1 rounded-full hover:bg-indigo-700 transition-colors"
              aria-label="Weekly view"
            >
              Week
            </button>
            <button 
              className="text-xs text-[#6B72D6] hover:text-indigo-800 font-medium bg-[#6B72D6]/10 px-3 py-1 rounded-full hover:bg-[#6B72D6]/20 transition-colors"
              aria-label="Monthly view"
            >
              Month
            </button>
            <Calendar className="text-[#6B72D6] ml-2" size={20} />
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="flex flex-col p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-inner">
            <div className="flex justify-between items-center mb-4">              <button 
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100" 
                aria-label="Previous month"
                title="Previous month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <h4 className="text-base font-semibold text-gray-800">April 2025</h4>
              <button 
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label="Next month"
                title="Next month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Placeholder for calendar dates - static for demo */}
              <button className="p-1 text-sm text-gray-400">28</button>
              <button className="p-1 text-sm text-gray-400">29</button>
              <button className="p-1 text-sm text-gray-400">30</button>
              <button className="p-1 text-sm">1</button>
              <button className="p-1 text-sm">2</button>
              <button className="p-1 text-sm">3</button>
              <button className="p-1 text-sm">4</button>
              <button className="p-1 text-sm">5</button>
              <button className="p-1 text-sm bg-[#6B72D6] text-white rounded-full">6</button>
              <button className="p-1 text-sm relative">
                7
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
              </button>
              <button className="p-1 text-sm relative">
                8
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span>
              </button>
              <button className="p-1 text-sm">9</button>
              <button className="p-1 text-sm relative">
                10
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
              </button>
              <button className="p-1 text-sm">11</button>
              {/* Additional rows would continue here */}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
              <div className="flex space-x-3">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  <span className="text-xs text-gray-600">Check-ins</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                  <span className="text-xs text-gray-600">Check-outs</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                  <span className="text-xs text-gray-600">Events</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#6B72D6] to-[#8A90E8] text-white hover:opacity-90 px-3 py-1.5 text-xs rounded-full shadow-md hover:shadow-lg transition-all">
                Add Event
              </Button>
            </div>
          </div>
        </div>
      </Card>        
      {/* Footer with gradient background like in AdminDashboard */}
      <div className="bg-[#6B72D6]/10 px-8 py-6 flex justify-between items-center mt-8 -ml-16 -mr-16 -mb-8">
        <div className="flex items-center">
        <div className="flex items-center">
            <span className="text-gray-500 text-sm mr-2">© 2025 Hotel Management System</span>
            <span className="text-xs px-2 py-0.5 bg-[#6B72D6]/10 text-[#6B72D6] rounded-full">v2.1.0</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 text-lg font-medium mr-2">Today's Total Check-ins:</span>
          <span className="font-semibold text-green-600 text-lg">{dashboardStats.checkIn.count}</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptionistDashboard;
