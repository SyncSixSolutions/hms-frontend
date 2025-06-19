import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Paper, Grid, Card, CardContent, CardMedia, IconButton, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BedIcon from '@mui/icons-material/Bed';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';

// You'll need to create this service
// import { roomService, RoomItem } from '../../../../services/roomService';

// Define the Room interface until you create the real service
interface RoomItem {
  id?: number;
  roomNumber: string;
  roomFloor: string;
  reservationStatus: string;
  roomType: string;
  capacity: string;
  pricePerNight: string;
  bedType: string;
  roomSize: string;
  description: string;
  images?: string[];
  amenities: {
    petFriendly: boolean;
    smoking: boolean;
    wifi: boolean;
    miniBar: boolean;
    coffeeMaker: boolean;
    cityView: boolean;
    shower: boolean;
    sofaBox: boolean;
    refrigerator: boolean;
    airConditioner: boolean;
    tvCable: boolean;
    seaView: boolean;
  };
}

// Mock roomService until you create the real one
const roomService = {
  getAllRooms: async (): Promise<RoomItem[]> => {
    // This is mock data - replace with actual API call
    return [
      {
        id: 1,
        roomNumber: '101',
        roomFloor: '1',
        reservationStatus: 'Vacant',
        roomType: 'Deluxe',
        capacity: '2-4 guests',
        pricePerNight: '150',
        bedType: 'King size',
        roomSize: '400 sq ft',
        description: 'Spacious room with beautiful view and modern amenities.',
        images: ['https://via.placeholder.com/300x200?text=Deluxe+Room'],
        amenities: {
          petFriendly: true,
          smoking: false,
          wifi: true,
          miniBar: true,
          coffeeMaker: true,
          cityView: false,
          shower: true,
          sofaBox: true,
          refrigerator: false,
          airConditioner: true,
          tvCable: true,
          seaView: false
        }
      },
      {
        id: 2,
        roomNumber: '102',
        roomFloor: '1',
        reservationStatus: 'Reserved',
        roomType: 'Suite',
        capacity: '2 guests',
        pricePerNight: '250',
        bedType: 'Queen size',
        roomSize: '600 sq ft',
        description: 'Luxury suite with separate living area and premium amenities.',
        images: ['https://via.placeholder.com/300x200?text=Suite+Room'],
        amenities: {
          petFriendly: false,
          smoking: false,
          wifi: true,
          miniBar: true,
          coffeeMaker: true,
          cityView: true,
          shower: true,
          sofaBox: true,
          refrigerator: true,
          airConditioner: true,
          tvCable: true,
          seaView: true
        }
      },
      {
        id: 3,
        roomNumber: '201',
        roomFloor: '2',
        reservationStatus: 'Occupied',
        roomType: 'Standard',
        capacity: '2 guests',
        pricePerNight: '100',
        bedType: 'Double',
        roomSize: '300 sq ft',
        description: 'Comfortable standard room with all basic amenities.',
        images: ['https://via.placeholder.com/300x200?text=Standard+Room'],
        amenities: {
          petFriendly: false,
          smoking: false,
          wifi: true,
          miniBar: false,
          coffeeMaker: true,
          cityView: false,
          shower: true,
          sofaBox: false,
          refrigerator: false,
          airConditioner: true,
          tvCable: true,
          seaView: false
        }
      }
    ];
  },
  deleteRoom: async (id: number): Promise<void> => {
    // This is a mock - replace with actual API call
    console.log(`Deleting room with ID: ${id}`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }
};

const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Vacant':
        return 'success';
      case 'Reserved':
        return 'warning';
      case 'Occupied':
        return 'error';
      case 'Maintenance':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading && rooms.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Hotel Rooms</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddRoom}
        >
          Add Room
        </Button>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#FEE2E2', color: '#B91C1C' }}>
          <Typography>{error}</Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={room.images?.[0] || 'https://via.placeholder.com/300x180?text=No+Image'}
                  alt={`Room ${room.roomNumber}`}
                />
                <Chip 
                  label={room.reservationStatus} 
                  color={getStatusColor(room.reservationStatus) as any}
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                    fontWeight: 'bold'
                  }} 
                />
                <Chip 
                  label={`Room ${room.roomNumber}`} 
                  variant="filled"
                  color="primary"
                  size="medium"
                  sx={{ 
                    position: 'absolute', 
                    bottom: -12, 
                    left: 16,
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }} 
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {room.roomType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Floor: {room.roomFloor} | {room.roomSize}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {room.description.length > 100 
                    ? `${room.description.substring(0, 100)}...` 
                    : room.description}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                  {room.amenities.wifi && <Chip icon={<WifiIcon />} label="WiFi" size="small" variant="outlined" />}
                  {room.amenities.airConditioner && <Chip icon={<AcUnitIcon />} label="AC" size="small" variant="outlined" />}
                  {room.amenities.tvCable && <Chip icon={<TvIcon />} label="TV" size="small" variant="outlined" />}
                  {/* Add more amenity chips as needed */}
                </Stack>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 'auto'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <BedIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2">{room.bedType}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2">{room.capacity.split(' ')[0]}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {room.pricePerNight}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid rgba(0, 0, 0, 0.12)'
                }}>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleEditRoom(room.id!)}
                    aria-label="edit"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteRoom(room.id!)}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomList;