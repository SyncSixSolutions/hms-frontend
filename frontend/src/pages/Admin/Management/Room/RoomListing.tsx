import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, Star, Check, X } from 'lucide-react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import room1 from '../../../../assets/images/room1.jpg';
import room2 from '../../../../assets/images/room2.jpg';
import room3 from '../../../../assets/images/room3.jpg';
import room4 from '../../../../assets/images/room4.jpg';
import room5 from '../../../../assets/images/room5.jpg';
import room6 from '../../../../assets/images/room6.jpg';

// Room data type definition
interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: string;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  amenities: string[];
  image: string;
  floor: string;
  lastCleaned: string;
  rating: number;
}

const RoomListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Mock data for rooms
  const roomsData: Room[] = [
    { 
      id: 'R-101', 
      name: 'Ocean View Room', 
      type: 'Deluxe', 
      price: 12500, 
      capacity: '2 Adults, 1 Child', 
      status: 'Available', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Balcony'],
      image: room1,
      floor: '1st Floor',
      lastCleaned: '2025-06-19',
      rating: 4.8
    },
    { 
      id: 'R-102', 
      name: 'Garden View Room', 
      type: 'Standard', 
      price: 8500, 
      capacity: '2 Adults', 
      status: 'Occupied', 
      amenities: ['Wi-Fi', 'AC', 'TV'],
      image: room2,
      floor: '1st Floor',
      lastCleaned: '2025-06-18',
      rating: 4.5
    },
    { 
      id: 'R-201', 
      name: 'Executive Suite', 
      type: 'Suite', 
      price: 22500, 
      capacity: '2 Adults, 2 Children', 
      status: 'Available', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Bathtub', 'Lounge', 'Work Desk'],
      image: room3,
      floor: '2nd Floor',
      lastCleaned: '2025-06-19',
      rating: 4.9
    },
    { 
      id: 'R-202', 
      name: 'Family Room', 
      type: 'Standard', 
      price: 9500, 
      capacity: '4 Adults', 
      status: 'Reserved', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar'],
      image: room4,
      floor: '2nd Floor',
      lastCleaned: '2025-06-17',
      rating: 4.2
    },
    { 
      id: 'R-301', 
      name: 'Presidential Suite', 
      type: 'Suite', 
      price: 35000, 
      capacity: '2 Adults, 2 Children', 
      status: 'Available', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'Private Dining', 'City View', 'Lounge'],
      image: room5,
      floor: '3rd Floor',
      lastCleaned: '2025-06-19',
      rating: 5.0
    },
    { 
      id: 'R-302', 
      name: 'Couple Retreat', 
      type: 'Deluxe', 
      price: 15000, 
      capacity: '2 Adults', 
      status: 'Maintenance', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Balcony', 'Bathtub'],
      image: room6,
      floor: '3rd Floor',
      lastCleaned: '2025-06-16',
      rating: 4.7
    },
    { 
      id: 'R-401', 
      name: 'Standard Twin', 
      type: 'Standard', 
      price: 8000, 
      capacity: '2 Adults', 
      status: 'Available', 
      amenities: ['Wi-Fi', 'AC', 'TV'],
      image: room1,
      floor: '4th Floor',
      lastCleaned: '2025-06-19',
      rating: 4.3
    },
    { 
      id: 'R-402', 
      name: 'Deluxe King', 
      type: 'Deluxe', 
      price: 14000, 
      capacity: '2 Adults, 1 Child', 
      status: 'Occupied', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Bathtub'],
      image: room2,
      floor: '4th Floor',
      lastCleaned: '2025-06-18',
      rating: 4.6
    },
    { 
      id: 'R-501', 
      name: 'Executive King', 
      type: 'Executive', 
      price: 18000, 
      capacity: '2 Adults', 
      status: 'Available', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Bathtub', 'Work Desk'],
      image: room3,
      floor: '5th Floor',
      lastCleaned: '2025-06-19',
      rating: 4.8
    },
    { 
      id: 'R-502', 
      name: 'Honeymoon Suite', 
      type: 'Suite', 
      price: 25000, 
      capacity: '2 Adults', 
      status: 'Reserved', 
      amenities: ['Wi-Fi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'Balcony', 'Ocean View'],
      image: room4,
      floor: '5th Floor',
      lastCleaned: '2025-06-18',
      rating: 4.9
    },
  ];

  // Room types and statuses for filters
  const roomTypes = ['All', 'Standard', 'Deluxe', 'Executive', 'Suite'];
  const statusOptions = ['All', 'Available', 'Occupied', 'Maintenance', 'Reserved'];

  // Filter rooms based on search term, room type, and status
  const filteredRooms = roomsData.filter(room => {
    const matchesSearch = 
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRoomType = selectedRoomType === 'All' || room.type === selectedRoomType;
    const matchesStatus = selectedStatus === 'All' || room.status === selectedStatus;
    
    return matchesSearch && matchesRoomType && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentRooms = filteredRooms.slice(startIndex, startIndex + entriesPerPage);

  // Get status color based on room status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Occupied':
        return 'bg-blue-100 text-blue-700';
      case 'Maintenance':
        return 'bg-amber-100 text-amber-700';
      case 'Reserved':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Format price with thousand separator and LKR symbol
  const formatPrice = (price: number): string => {
    return `LKR ${price.toLocaleString()}`;
  };

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="mr-1 text-amber-500">
          <Star size={16} fill="#F59E0B" />
        </span>
        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Render amenities badges
  const renderAmenities = (amenities: string[]) => {
    const displayCount = 3; // Number of amenities to display before "+X more"
    const visibleAmenities = amenities.slice(0, displayCount);
    const hiddenCount = Math.max(0, amenities.length - displayCount);

    return (
      <div className="flex flex-wrap gap-1">
        {visibleAmenities.map((amenity, index) => (
          <span 
            key={index} 
            className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
          >
            {amenity}
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">
            +{hiddenCount} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Room Management</h1>
          <p className="text-gray-500 mt-1">View and manage all rooms in your hotel</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add New Room
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white rounded-xl shadow border-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{roomsData.length}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-green-500 font-medium mr-1">+2</span> since last month
          </div>
        </Card>

        <Card className="bg-white rounded-xl shadow border-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Available Rooms</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {roomsData.filter(room => room.status === 'Available').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-green-500 font-medium mr-1">42%</span> occupancy rate
          </div>
        </Card>

        <Card className="bg-white rounded-xl shadow border-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Occupied Rooms</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {roomsData.filter(room => room.status === 'Occupied').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-blue-500 font-medium mr-1">+3</span> check-ins today
          </div>
        </Card>

        <Card className="bg-white rounded-xl shadow border-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Maintenance</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {roomsData.filter(room => room.status === 'Maintenance').length}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-amber-500 font-medium mr-1">-1</span> since last week
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white rounded-xl shadow-sm border-0 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search rooms by ID, name, or type..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button 
              variant="secondary" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </Button>
            
            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="newest"
              >
                <option value="newest">Newest First</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Room Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {currentRooms.length > 0 ? (
          currentRooms.map((room) => (
            <Card key={room.id} className="bg-white rounded-xl shadow-sm border-0 p-0 overflow-hidden flex flex-col md:flex-row">
              {/* Room Image */}
              <div className="w-full md:w-40 h-40 overflow-hidden relative">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bg-indigo-600 text-white text-xs font-medium px-2 py-1">
                  {room.id}
                </div>
              </div>
              
              {/* Room Details */}
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.type} • {room.floor}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </div>
                
                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Price per night</p>
                      <p className="font-medium text-gray-800">{formatPrice(room.price)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="text-sm">{room.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      {renderRating(room.rating)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Cleaned</p>
                      <p className="text-sm">{new Date(room.lastCleaned).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Amenities</p>
                  {renderAmenities(room.amenities)}
                </div>
                
                <div className="mt-auto pt-4 flex justify-end gap-2">
                  <Button variant="secondary" className="text-xs px-3 py-1 h-8">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="danger" className="text-xs px-3 py-1 h-8">
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm border-0 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No rooms found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button 
              variant="border" 
              onClick={() => {
                setSearchTerm('');
                setSelectedRoomType('All');
                setSelectedStatus('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredRooms.length > entriesPerPage && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredRooms.length)} of {filteredRooms.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomListing;
