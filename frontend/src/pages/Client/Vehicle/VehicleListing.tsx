import React from 'react';
import { Avatar, Button, Card, Container, Grid, Typography, Box, IconButton } from '@mui/material';
import nissan from '../../../assets/images/vehicles/alphard.png';
import tuktuk from '../../../assets/images/vehicles/tuktuk.png';
import scooty from '../../../assets/images/vehicles/scooty.png';
import userAvatar from '../../../assets/images/avatar.jpg';
import Travel from '../../../assets/images/travel.png';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';

interface VehicleCardProps {
  name: string;
  image: string;
  capacity: number;
  onRentNow: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ name, image, capacity, onRentNow }) => (
  <Card sx={{ 
    p: 2, 
    borderRadius: 2, 
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    position: 'relative'
  }}>
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      mb: 1
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name}</Typography>
    </Box>
    
    <Box sx={{ textAlign: 'center', my: 2, width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={image} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </Box>
    
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      mb: 2,
      color: '#6C7A89',
      width: '100%'
    }}>
      <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: '#6466e9' }} />
      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
        {capacity} {capacity > 1 ? 'People' : 'Person'}
      </Typography>
    </Box>
    
    <Button 
      variant="contained" 
      onClick={onRentNow}
      fullWidth
      sx={{ 
        bgcolor: '#6466e9', 
        borderRadius: 8,
        py: 1,
        '&:hover': {
          bgcolor: '#5355c9'
        }
      }}
    >
      Rent Now
    </Button>
  </Card>
);

const SideNavItem: React.FC<{icon: React.ReactNode, active?: boolean}> = ({ icon, active }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    my: 2,
    p: 1.5,
    borderRadius: '50%',
    bgcolor: active ? 'rgba(100, 102, 233, 0.1)' : 'transparent'
  }}>
    {icon}
  </Box>
);

const VehicleListing: React.FC = () => {
  const vehicles = [
    { id: 1, name: 'Toyota Alphard', image: nissan, capacity: 2 },
    { id: 2, name: 'Tuk tuk', image: tuktuk, capacity: 2 },
    { id: 3, name: 'Scooty', image: scooty, capacity: 1 },
    { id: 4, name: 'Nissan GT - R', image: nissan, capacity: 2 },
    { id: 5, name: 'Tuk tuk', image: tuktuk, capacity: 2 },
    { id: 6, name: 'Scooty', image: scooty, capacity: 1 },
  ];

  const handleRentNow = (vehicleId: number) => {
    console.log(`Renting vehicle with ID: ${vehicleId}`);
  };

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
          backgroundPosition: 'center bottom',
          opacity: 0.4,
          zIndex: -1
        }
      }}
    >
      {/* Top Navigation Bar */}
      <Box sx={{
        height: '8px',
        width: '100%',
        backgroundImage: 'linear-gradient(90deg, rgba(100, 102, 233, 0.2) 0%, rgba(177, 231, 249, 0.3) 100%)',
        position: 'relative',
        zIndex: 1
      }} />
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Side Navigation */}
        <Box sx={{ 
          width: 60, 
          bgcolor: 'white', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.05)',
          position: 'relative',
          zIndex: 1
        }}>
          <SideNavItem icon={<AccessTimeIcon sx={{ color: '#BDBDBD' }} />} />
          <SideNavItem icon={<DirectionsCarIcon sx={{ color: '#6466e9' }} />} active />
          <SideNavItem icon={<PersonIcon sx={{ color: '#BDBDBD' }} />} />
          <SideNavItem icon={<SettingsIcon sx={{ color: '#BDBDBD' }} />} />
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          p: 3,
          position: 'relative',
          zIndex: 1,
          bgcolor: 'rgba(246, 247, 251, 0.7)',
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h5" sx={{ color: '#444', fontWeight: 600 }}>
                Welcome, Nishagi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tue, 07 June 2022
              </Typography>
            </Box>
            <Avatar src={userAvatar} sx={{ width: 40, height: 40 }} />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                mb: 3, 
                backgroundColor: 'rgba(100, 102, 233, 0.2)',
                backgroundImage: 'linear-gradient(90deg, rgba(100, 102, 233, 0.2) 0%, rgba(177, 231, 249, 0.3) 100%)'
              }}>
                <Typography variant="h5" fontWeight="500" color="#6466e9">
                  Rent a Vehicle
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight="500" mb={2} color="#444">
                Select the vehicle
              </Typography>

              <Grid container spacing={3}>
                {vehicles.map(vehicle => (
                  <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                    <VehicleCard
                      name={vehicle.name}
                      image={vehicle.image}
                      capacity={vehicle.capacity}
                      onRentNow={() => handleRentNow(vehicle.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  height: '100%',
                  borderRadius: 4, 
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  backgroundImage: `url(${Travel})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  p: 3,
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
                }}
              >
                <Box 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    p: 2.5, 
                    borderRadius: 2,
                    textAlign: 'right',
                    width: '100%'
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Discover Sri Lanka
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', my: 1 }}>
                    The Pearl of the Indian Ocean
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    Sri Lanka is a tropical paradise, rich in natural beauty and cultural heritage. 
                    With its golden beaches, lush green landscapes, and breathtaking waterfalls, 
                    the island offers an unforgettable experience for travelers. Rolling tea plantations, 
                    serene lakes, and dense wildlife sanctuaries create a picture-perfect escape. Rent a 
                    vehicle and explore its scenic beauty at your own pace, making every moment of 
                    your trip truly special.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleListing;