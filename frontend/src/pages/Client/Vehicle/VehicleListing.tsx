import React from 'react';
import { Avatar, Button, Card, Grid, Typography, Box } from '@mui/material';
import nissan from '../../../assets/images/vehicles/alphard.png';
import tuktuk from '../../../assets/images/vehicles/tuktuk.png';
import scooty from '../../../assets/images/vehicles/scooty.png';
import userAvatar from '../../../assets/images/avatar.jpg';
import Travel from '../../../assets/images/travel.png';
import PersonIcon from '@mui/icons-material/Person';

interface VehicleCardProps {
  name: string;
  image: string;
  capacity: number;
  onRentNow: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ name, image, capacity, onRentNow }) => (
  <Card sx={{ 
    p: 3, 
    borderRadius: 3, 
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    bgcolor: '#ffffff'
  }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
      {name}
    </Typography>
    
    <Box sx={{ textAlign: 'center', mb: 2, width: '100%', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      onClick={onRentNow}
      sx={{ 
        bgcolor: '#6466e9', 
        borderRadius: 8,
        py: 1,
        mt: 'auto',
        '&:hover': {
          bgcolor: '#5355c9'
        }
      }}
    >
      Rent Now
    </Button>
  </Card>
);

const VehicleListing: React.FC = () => {
  const vehicles = [
    { id: 1, name: 'Nissan GT - R', image: nissan, capacity: 2 },
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
              Welcome, Nishagi
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.9rem' }}>
              {new Date().toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
            </Typography>
          </Box>
          <Avatar 
            src={userAvatar} 
            sx={{ 
              width: 38, 
              height: 38,
              border: '2px solid white',
              boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
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
            <Grid item xs={12} md={8}>
              <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', p: 3, borderRadius: 4 }}>
                <Typography variant="h6" fontWeight="500" mb={3} color="#444">
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
              </Box>
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
                  p: 0,
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
                }}
              >
                <Box 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    p: 3, 
                    borderRadius: 2,
                    textAlign: 'center',
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