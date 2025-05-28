import React, { useState } from 'react';
import { Avatar, Button, Card, Grid, Typography, Box, Paper, TextField, IconButton } from '@mui/material';
import nissan from '../../../assets/images/vehicles/alphard.png';
import tuktuk from '../../../assets/images/vehicles/tuktuk.png';
import scooty from '../../../assets/images/vehicles/scooty.png';
import userAvatar from '../../../assets/images/avatar.jpg';
import Travel from '../../../assets/images/travel.png';
import trvl1 from '../../../assets/images/trvl1.png';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

interface VehicleCardProps {
  id: number;
  name: string;
  image: string;
  capacity: number;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

// Vehicle details type
interface Vehicle {
  id: number;
  name: string;
  image: string;
  capacity: number;
}

// Updated VehicleCard component
const VehicleCard: React.FC<VehicleCardProps> = ({ id, name, image, capacity, onSelect, isSelected }) => (
  <Card sx={{ 
    p: 3, 
    borderRadius: 3, 
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    bgcolor: isSelected ? 'rgba(100, 102, 233, 0.05)' : '#ffffff',
    border: isSelected ? '1px solid #6466e9' : '1px solid transparent',
    transition: 'all 0.3s ease'
  }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
      {name}
    </Typography>
    
    <Box
      sx={{
        textAlign: 'center',
        mb: 2,
        width: '100%',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s',
        },
        '&:hover img': {
          transform: 'scale(1.08) rotate(-3deg)',
        }
      }}
    >
      <img src={image} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </Box>
    
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      mb: 2,
      color: '#6C7A89'
    }}>
      <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: '#6466e9' }} />
      <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#6C7A89' }}>
        {capacity} {capacity > 1 ? 'People' : 'Person'}
      </Typography>
    </Box>
    
    <Button 
      variant="contained" 
      onClick={() => onSelect(id)}
      sx={{ 
        bgcolor: isSelected ? '#5355c9' : '#6466e9', 
        borderRadius: 8,
        py: 1,
        mt: 'auto',
        '&:hover': {
          bgcolor: '#5355c9'
        }
      }}
    >
      {isSelected ? 'Selected' : 'Rent Now'}
    </Button>
  </Card>
);

// Booking details side panel component
const BookingSidePanel: React.FC<{
  selectedVehicle: Vehicle | null;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ selectedVehicle, onClose, onConfirm }) => {
  const [rentalType, setRentalType] = useState<'rent' | 'hire'>('rent');

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1
      }}>
        <Typography variant="h6" fontWeight="600">
          Select Method
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex',
        gap: 2,
        mb: 2
      }}>
        <Button
          variant={rentalType === 'rent' ? 'contained' : 'outlined'}
          fullWidth
          sx={{
            borderRadius: 2,
            py: 1.5,
            bgcolor: rentalType === 'rent' ? '#6466e9' : 'transparent',
            borderColor: '#6466e9',
            color: rentalType === 'rent' ? 'white' : '#6466e9',
            '&:hover': {
              bgcolor: rentalType === 'rent' ? '#5355c9' : 'rgba(100, 102, 233, 0.1)',
            }
          }}
          onClick={() => setRentalType('rent')}
        >
          Rent
        </Button>
        <Button
          variant={rentalType === 'hire' ? 'contained' : 'outlined'}
          fullWidth
          sx={{
            borderRadius: 2,
            py: 1.5,
            bgcolor: rentalType === 'hire' ? '#6466e9' : 'transparent',
            borderColor: '#6466e9',
            color: rentalType === 'hire' ? 'white' : '#6466e9',
            '&:hover': {
              bgcolor: rentalType === 'hire' ? '#5355c9' : 'rgba(100, 102, 233, 0.1)',
            }
          }}
          onClick={() => setRentalType('hire')}
        >
          Hire
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
        Pickup details
      </Typography>

      <Box sx={{ mb: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            px: 2,
            py: 1.5,
            color: '#555',
            borderColor: '#ddd',
            borderRadius: 2
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography sx={{ fontWeight: 500, color: '#777' }}>
            Select Date
          </Typography>
        </Button>
      </Box>

      <Box sx={{ mb: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            px: 2,
            py: 1.5,
            color: '#555',
            borderColor: '#ddd',
            borderRadius: 2
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography sx={{ fontWeight: 500, color: '#777' }}>
            Select Time
          </Typography>
        </Button>
      </Box>

      <Box sx={{ mb: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            px: 2,
            py: 1.5,
            color: '#555',
            borderColor: '#ddd',
            borderRadius: 2
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography sx={{ fontWeight: 500, color: '#777' }}>
            Location
          </Typography>
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
        Dropoff details
      </Typography>

      <Box sx={{ mb: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            px: 2,
            py: 1.5,
            color: '#555',
            borderColor: '#ddd',
            borderRadius: 2
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography sx={{ fontWeight: 500, color: '#777' }}>
            Location
          </Typography>
        </Button>
      </Box>

      <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            py: 1.5,
            flex: 1,
            borderColor: '#ddd',
            color: '#666'
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            py: 1.5,
            flex: 1,
            bgcolor: '#6466e9',
            '&:hover': {
              bgcolor: '#5355c9'
            }
          }}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

const VehicleListing: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  
  const vehicles = [
    { id: 1, name: 'Nissan GT - R', image: nissan, capacity: 2 },
    { id: 2, name: 'Tuk tuk', image: tuktuk, capacity: 2 },
    { id: 3, name: 'Scooty', image: scooty, capacity: 1 },
    { id: 4, name: 'Nissan GT - R', image: nissan, capacity: 2 },
    { id: 5, name: 'Tuk tuk', image: tuktuk, capacity: 2 },
    { id: 6, name: 'Scooty', image: scooty, capacity: 1 },
  ];

  const handleSelectVehicle = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId === selectedVehicleId ? null : vehicleId);
  };

  const handleConfirmBooking = () => {
    console.log(`Confirming booking for vehicle ID: ${selectedVehicleId}`);
    // Handle booking confirmation logic here
    setSelectedVehicleId(null);
  };

  const selectedVehicle = selectedVehicleId ? vehicles.find(v => v.id === selectedVehicleId) || null : null;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Travel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
          zIndex: -1
        }
      }}
    >
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Topbar */}
        <Box sx={{
          p: 2,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          mb: 2,
        }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#444', fontWeight: 600, fontSize: '1.3rem' }}>
              Welcome, Janith
            </Typography>
            <Typography
              variant="body2"
              sx={{
              mt: 1.5,
              color: 'grey.600',
              fontSize: '0.9rem'
              }}
            >
              {new Date().toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
            </Typography>
          </Box>
          <Avatar 
            src={userAvatar} 
            sx={{ 
              width: 38, 
              height: 38,
              border: '2px solid white',
              boxShadow: '0px 2px 8px rgba(95, 95, 95, 0.1)'
            }} 
          />
        </Box>

        {/* Page Content */}
        <Box sx={{ px: 4, pt: 0, pb: 4, flex: 1 }}>
          <Box 
            sx={{ 
              p: 2, 
              pl: 3,
              borderRadius: 2, 
              mb: 3, 
              backgroundColor: 'rgba(100, 102, 233, 0.0)',
              backgroundImage: 'linear-gradient(90deg, rgba(100, 102, 233, 0.3) 0%, rgba(218, 246, 255, 0) 100%)'
            }}
          >
            <Typography variant="h5" fontWeight="700" color="#fff">
              Rent a Vehicle
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={selectedVehicleId ? 8 : 8}>
              <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', p: 3, borderRadius: 4 }}>
                <Typography variant="h3" fontWeight="800" mb={3} color="grey.700" sx={{ fontSize: '1.3rem' }}>
                  Select the vehicle
                </Typography>

                <Grid container spacing={3}>
                  {vehicles.map(vehicle => (
                    <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                      <VehicleCard
                        id={vehicle.id}
                        name={vehicle.name}
                        image={vehicle.image}
                        capacity={vehicle.capacity}
                        onSelect={handleSelectVehicle}
                        isSelected={vehicle.id === selectedVehicleId}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {selectedVehicleId ? (
                <Box sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 4, 
                  p: 3, 
                  height: '100%',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
                }}>
                  <BookingSidePanel 
                    selectedVehicle={selectedVehicle}
                    onClose={() => setSelectedVehicleId(null)}
                    onConfirm={handleConfirmBooking}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background: 'rgba(255,255,255,0.85)', 
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    p: 0,
                    minHeight: 480,
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '80%',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: 32,
                      borderTopRightRadius: 8,
                      borderBottomLeftRadius: 500,
                      borderBottomRightRadius: 1000,
                    }}
                  >
                    <img
                      src={trvl1}
                      alt="Discover Sri Lanka"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        display: 'block',
                        borderTopLeftRadius: 32,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 500,
                        borderBottomRightRadius: 1000,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      paddingTop: 0,
                      paddingBottom: 3,
                      paddingLeft: 3,
                      paddingRight: 3,
                      textAlign: 'center',
                      height: '60%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#8d7c6c',
                        fontWeight: 700,
                        letterSpacing: 0.2,
                        textAlign: 'right',
                        fontSize: '1.5rem'
                      }}
                    >
                      Discover Sri Lanka
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: '#222',
                        mb: 1.2,
                        fontSize: { xs: '1.5rem', md: '2.1rem' },
                        lineHeight: 1.13,
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        textAlign: 'right',
                      }}
                    >
                      The Pearl of the <br /> Indian Ocean
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#6c7a89',
                        px: 1,
                        fontWeight: 800,
                        textShadow: '0 1px 2px rgba(255,255,255,0.15)',
                        textAlign: 'right',
                      }}
                    >
                      Sri Lanka is a tropical paradise, rich in natural beauty and cultural heritage. With its golden beaches, lush green landscapes, and breathtaking waterfalls, the island offers an unforgettable experience for travelers. Rolling tea plantations, serene lakes, and dense wildlife sanctuaries create a picture-perfect escape. Rent a vehicle and explore its scenic beauty at your own pace, making every moment of your trip truly special.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleListing;