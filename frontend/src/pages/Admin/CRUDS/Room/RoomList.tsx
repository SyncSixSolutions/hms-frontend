import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService, RoomItem } from '../../../../services/roomService';
import Button from '../../../../components/ui/Button';
import { Search, Edit, Trash2, Plus } from 'lucide-react';

const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch rooms when component mounts
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await roomService.getAllRooms();
        setRooms(data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to load rooms:', err);
        setError(err.message || 'Failed to load rooms. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const handleAddRoom = () => {
    navigate('/admin/room/addroom');
  };

  const handleEditRoom = (id: number) => {
    navigate(`/admin/room/editroom/${id}`);
  };

  const handleDeleteRoom = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        setLoading(true);
        await roomService.deleteRoom(id);
        // Remove the deleted room from the list
        setRooms(rooms.filter(room => room.id !== id));
      } catch (err: any) {
        console.error('Failed to delete room:', err);
        setError(err.message || 'Failed to delete room. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.bedType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.reservationStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading && rooms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B72D6] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading room items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-gray-50 to-gray-100"> {/* Same as FoodList */}
      {/* Main container with wider width to minimize edge distance - EXACT SAME AS FoodList */}
      <div className="max-w-[95%] mx-auto">
        {/* Header - now aligned with card below - EXACT SAME AS FoodList */}
        <div className="flex justify-between items-center mb-4"> {/* Same margin as FoodList */}
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Admin</h1> {/* Same text color as FoodList */}
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3"> {/* Same spacing as FoodList */}
            {/* Search Bar - Same as FoodList */}
            <div className="relative bg-white rounded-full shadow-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-56 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            
            {/* Profile Avatar - EXACT SAME AS FoodList */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-md"> {/* Enhanced shadow */}
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>      
      
        {/* Room List Header - matched with FoodList but with enhanced shadow */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Added shadow with hover effect */}
          <div className="rounded-t-lg p-2 bg-[#6B72D6]">
            <h2 className="text-xl font-bold text-white ml-1">All Room Items</h2>
          </div>

          {/* Room List Content */}
          <div className="p-2 bg-white rounded-b-lg">
            <div className="space-y-4">
              {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                  <p>{error}</p>
                </div>
              )}
              
              {/* Room Grid */}
              {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      {/* Room Image */}
                      <div className="h-40 overflow-hidden">
                        <img
                          src={room.images?.[0] || 'https://via.placeholder.com/300x140?text=No+Image'}
                          alt={`Room ${room.roomNumber}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Room Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Room No. {room.roomNumber}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {room.roomSize} {room.roomType} room with {room.bedType}
                        </p>
                        
                        {/* Room Details */}
                        <div className="mb-3">
                          <ul className="space-y-1">
                            <li className="pl-4 relative text-sm text-gray-600">
                              <span className="absolute left-0 text-[#6B72D6]">•</span>
                              Type: {room.roomType}
                            </li>
                            <li className="pl-4 relative text-sm text-gray-600">
                              <span className="absolute left-0 text-[#6B72D6]">•</span>
                              Bed: {room.bedType}
                            </li>
                            <li className="pl-4 relative text-sm text-gray-600">
                              <span className="absolute left-0 text-[#6B72D6]">•</span>
                              Capacity: {room.capacity}
                            </li>
                            <li className="pl-4 relative text-sm text-gray-600">
                              <span className="absolute left-0 text-[#6B72D6]">•</span>
                              Status: {room.reservationStatus}
                            </li>
                            <li className="pl-4 relative text-sm text-gray-600">
                              <span className="absolute left-0 text-[#6B72D6]">•</span>
                              Amenities: {Object.entries(room.amenities)
                                .filter(([_, value]) => value === true)
                                .map(([key]) => key)
                                .slice(0, 3)
                                .map(amenity => {
                                  const formattedAmenity = amenity
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, str => str.toUpperCase());
                                  return formattedAmenity;
                                })
                                .join(', ')}
                            </li>
                          </ul>
                        </div>
                        
                        {/* Price and Actions */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-[#6B72D6]">$ {room.pricePerNight}</span>
                            <p className="text-xs text-gray-500">per night</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="border"
                              onClick={() => handleEditRoom(room.id!)}
                              className="flex items-center gap-1 text-xs px-2 py-1"
                            >
                              <Edit className="w-3 h-3" />
                              Edit
                            </Button>
                            <Button
                              variant="border"
                              onClick={() => handleDeleteRoom(room.id!)}
                              className="flex items-center gap-1 text-xs px-2 py-1 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    {searchTerm ? 'No rooms found matching your search' : 'No rooms available'}
                  </p>
                  {searchTerm ? (
                    <p className="text-gray-400 mb-4">Try adjusting your search term</p>
                  ) : (
                    <p className="text-gray-400 mb-4">Add your first room to get started</p>
                  )}
                  <Button
                    variant="filled"
                    onClick={handleAddRoom}
                    className="flex items-center gap-2 text-white"
                    style={{ backgroundColor: "#6B72D6" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Room
                  </Button>
                </div>
              )}

              {/* Footer section - aligned with bottom edge style like FoodList */}
              <div className="mt-5 bg-gray-100 rounded-lg p-2 flex justify-between items-center shadow-sm hover:shadow transition-shadow duration-300">
                <div>
                  <span className="text-gray-700 text-sm">Total Rooms: </span>
                  <span className="font-medium text-[#6B72D6] text-sm">{filteredRooms.length}</span>
                  {searchTerm && (
                    <span className="text-gray-500 text-xs ml-2">(filtered from {rooms.length})</span>
                  )}
                </div>
                <Button
                  variant="border"
                  onClick={handleAddRoom}
                  className="flex items-center gap-2 text-sm px-3 py-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;