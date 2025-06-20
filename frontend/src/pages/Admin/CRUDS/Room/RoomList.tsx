import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Card, CardMedia, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { roomService, RoomItem } from '../../../../services/roomService';

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

  const handleEditRoom = (id: number) => {
    navigate(`/admin/room/editroom/${id}`);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  if (loading && rooms.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: '#f8f9fa', 
      minHeight: '100vh', 
      padding: { xs: 2, md: 4 } 
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' },
        marginBottom: 4
      }}>
        <Box>
          <Typography variant="h5" component="h1" fontWeight="600">
            Welcome, Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentDate}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: { xs: 2, md: 0 },
          width: { xs: '100%', md: 'auto' }
        }}>
          <Box 
            component="input"
            placeholder="Search"
            sx={{ 
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              padding: '8px 16px',
              width: { xs: '100%', md: '200px' },
              mr: 2
            }}
          />
          <img 
            src="https://via.placeholder.com/40x40" 
            alt="Admin" 
            style={{ borderRadius: '50%' }} 
          />
        </Box>
      </Box>

      {/* Room List Section */}
      <Card sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        mb: 3
      }}>
        {/* Title Section */}
        <Box sx={{ 
          bgcolor: '#6366f1', 
          color: 'white', 
          p: 2
        }}>
          <Typography variant="h6" fontWeight="600">
            All rooms
          </Typography>
        </Box>

        {/* Room Items */}
        {rooms.map((room, index) => (
          <Box key={room.id} sx={{ position: 'relative' }}>
            {index > 0 && <Divider />}
            <Box sx={{ 
              display: 'flex', 
              p: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              '&:hover': {
                bgcolor: '#f9f9f9'
              }
            }}>
              {/* Room Image */}
              <Box sx={{ 
                width: { xs: '100%', sm: 140 }, 
                height: { xs: 140, sm: 90 }, 
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
                flexShrink: 0
              }}>
                <CardMedia
                  component="img"
                  image={room.images?.[0] || 'https://via.placeholder.com/140x90?text=Room'}
                  alt={`Room ${room.roomNumber}`}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                  onClick={() => handleEditRoom(room.id!)}
                  style={{ cursor: 'pointer' }}
                />
              </Box>

              {/* Room Details */}
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    Room No. {room.roomNumber}
                  </Typography>
                </Box>
                
                <Typography variant="body2">
                  {room.roomSize} {room.roomType} room with {room.bedType}
                </Typography>
                
                <Typography variant="body2">
                  Attached bath room with tubs
                </Typography>
                
                <Typography variant="body2">
                  Capacity - {room.capacity.split(' ')[0]}
                </Typography>
                
                <Typography variant="body2">
                  {Object.entries(room.amenities)
                    .filter(([_, value]) => value === true)
                    .map(([key]) => key)
                    .slice(0, 4)
                    .map(amenity => {
                      const formattedAmenity = amenity
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase());
                      return formattedAmenity;
                    })
                    .join(', ')}
                </Typography>
              </Box>

              {/* Room Price & Actions */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                minWidth: { xs: '100%', sm: 100 },
                mt: { xs: 2, sm: 0 }
              }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary">
                    Room price per night *
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="600">
                    $ {room.pricePerNight}
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteRoom(room.id!)}
                  sx={{ mt: { xs: 2, sm: 0 } }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Card>

      {/* Add Room Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddRoom}
          sx={{ 
            borderRadius: 20,
            px: 3
          }}
        >
          Add Room
        </Button>
      </Box>
    </Box>
  );
};

export default RoomList;