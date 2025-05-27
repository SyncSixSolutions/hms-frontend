import React from 'react';
import { Avatar, Button, Card, Container, Grid, Typography, Box } from '@mui/material';
import nissan from '../../../assets/images/vehicles/alphard.png';
import tuktuk from '../../../assets/images/vehicles/tuktuk.png';
import scooty from '../../../assets/images/vehicles/scooty.png';
import userAvatar from '../../../assets/images/avatar.jpg';
import Travel from '../../../assets/images/travel.png';

interface VehicleCardProps {
  name: string;
  image: string;
  capacity: number;
  onRentNow: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ name, image, capacity, onRentNow }) => (
  <Card sx={{ p: 2, borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name}</Typography>
        <Box display="flex" alignItems="center" gap={1} mt={0.5} mb={2}>
          <Avatar sx={{ width: 20, height: 20, bgcolor: 'primary.light' }} />
          <Typography variant="body2" color="text.secondary">
            {capacity} {capacity > 1 ? 'People' : 'Person'}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={onRentNow}
          sx={{ 
            bgcolor: '#6466e9', 
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#5355c9'
            }
          }}
        >
          Rent Now
        </Button>
      </Grid>
      <Grid item xs={4}>
        <img src={image} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
    </Grid>
  </Card>
);

const VehicleListing: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString('en-US', { weekday: 'short' })}, ${String(currentDate.getDate()).padStart(2, '0')} ${currentDate.toLocaleDateString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;
  
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
    // Add logic to navigate to booking page or open modal
  };

  return (
    <Container maxWidth={false} sx={{ py: 3, px: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight="500">Welcome, Nishagi</Typography>
          <Typography variant="body2" color="text.secondary">{formattedDate}</Typography>
        </Box>
        <Avatar src={userAvatar} sx={{ width: 40, height: 40 }} />
      </Box>

      <Grid container spacing={4} sx={{ minHeight: 'calc(100vh - 150px)' }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            mb: 3, 
            background: 'linear-gradient(90deg, rgba(198,198,246,1) 0%, rgba(177,231,249,1) 100%)' 
          }}>
            <Typography variant="h5" fontWeight="bold" color="white">
              Rent a Vehicle
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight="500" mb={2}>
            Select the vehicle
          </Typography>

          <Grid container spacing={3}>
            {vehicles.map(vehicle => (
              <Grid item xs={12} sm={6} key={vehicle.id}>
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

        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <Box 
            sx={{ 
              flex: 1,
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
                backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                p: 2, 
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Discover Sri Lanka
              </Typography>
              <Typography variant="h4" fontWeight="bold" my={1}>
                The Pearl of the Indian Ocean
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sri Lanka is a tropical paradise, rich in natural beauty and cultural heritage. 
                With its golden beaches, lush green landscapes, and breathtaking waterfalls, 
                the island offers an unforgettable experience for travelers. Rolling tea plantations, 
                serene lakes, and dense wildlife sanctuaries create a picture-perfect escape. 
                Rent a vehicle and explore its scenic beauty at your own pace, 
                making every moment of your trip truly special.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VehicleListing;