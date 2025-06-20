import React, { useState, useEffect } from 'react';
import { getVehiclesByDateRange, rentVehicle } from '../../../services/vehicleService'; // adjust path as needed
import { 
  Avatar, 
  Button, 
  Card, 
  Grid, 
  Typography, 
  Box, 
  TextField, 
  IconButton, 
  Fade, 
  Grow, 
  Chip,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// Removing TimePicker import
import nissan from '../../../assets/images/vehicles/alphard.png';
import tuktuk from '../../../assets/images/vehicles/tuktuk.png';
import scooty from '../../../assets/images/vehicles/scooty.png';
import userAvatar from '../../../assets/images/avatar.jpg';
import Travel from '../../../assets/images/travel.png';


import PersonIcon from '@mui/icons-material/Person';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { addDays } from 'date-fns';

// Vehicle details type
interface Vehicle {
  id: number;
  name: string;
  vehicle_number: string;
  image: string;
  images: string[];
  capacity: number;
  vehicle_type: string;
  price_per_km: number;
  base_price: number;
  description: string;
  owner_name: string;
  availability_from: Date;
  availability_to: Date;
}

// Vehicle card component for search results
const VehicleCard: React.FC<{
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}> = ({ vehicle, onSelect }) => (
  <Card 
    sx={{ 
      p: 3, 
      borderRadius: 2, 
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px'
      },
    }}
    onClick={() => onSelect(vehicle)}
  >
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{
            height: 140,
            width: '100%',
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 1,
          }}
        >
          <img 
            src={vehicle.image} 
            alt={vehicle.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }} 
          />
          <Chip
            label={vehicle.vehicle_type}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(100, 102, 233, 0.8)',
              color: 'white',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {vehicle.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: '#6466e9' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                {vehicle.capacity} {vehicle.capacity > 1 ? 'People' : 'Person'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: 16, mr: 0.5, color: '#6466e9' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                ${vehicle.base_price}/day
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ color: '#777', mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {vehicle.description}
          </Typography>
          
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={vehicle.vehicle_number}
              size="small"
              variant="outlined"
              sx={{ borderColor: '#6466e9', color: '#6466e9' }}
            />
            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              size="small"
              sx={{ color: '#6466e9' }}
            >
              View details
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Card>
);

// Vehicle details component
const VehicleDetails: React.FC<{
  vehicle: Vehicle;
  startDate: Date | null;
  endDate: Date | null;
  onBook: () => void;
}> = ({ vehicle, startDate, endDate, onBook }) => {
  const [activeImage, setActiveImage] = useState(vehicle.image);
  const [showAgreement, setShowAgreement] = useState(false);

  const totalDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1
    : 0;
    
  const totalPrice = totalDays * vehicle.base_price;

  return (
    <Box sx={{ p: 2 }}>
      {showAgreement ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="700">Rental Agreement</Typography>
            <Button 
              variant="outlined" 
              onClick={() => setShowAgreement(false)}
              sx={{ borderColor: '#ddd', color: '#555' }}
            >
              Back to Details
            </Button>
          </Box>
          
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>Terms & Conditions</Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              1. <strong>Rental Period:</strong> The rental period begins on {startDate?.toLocaleDateString()} and ends on {endDate?.toLocaleDateString()}.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              2. <strong>Payment:</strong> Full payment of ${totalPrice} is due at the time of booking.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              3. <strong>Security Deposit:</strong> A refundable security deposit of $200 is required.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              4. <strong>Cancellation Policy:</strong> Full refund if cancelled 48 hours before rental period. 50% refund if cancelled 24 hours before rental period. No refund for cancellations less than 24 hours before rental period.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              5. <strong>Insurance:</strong> Basic insurance is included in the rental price. Additional insurance options are available.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              6. <strong>Fuel Policy:</strong> The vehicle will be provided with a full tank of fuel and should be returned with a full tank.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              7. <strong>Mileage Limit:</strong> A limit of 100km per day applies. Additional kilometers will be charged at ${vehicle.price_per_km} per km.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
              8. <strong>Late Return:</strong> Late returns will incur additional charges at an hourly rate.
            </Typography>
          </Paper>
          
          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              bgcolor: '#6466e9',
              '&:hover': {
                bgcolor: '#5355c9'
              }
            }}
            onClick={onBook}
          >
            Accept Terms & Complete Booking
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {/* Image Gallery */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2,
                  position: 'relative',
                }}
              >
                <img 
                  src={activeImage} 
                  alt={vehicle.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }} 
                />
                <Chip
                  label={vehicle.vehicle_type}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: 'rgba(100, 102, 233, 0.8)',
                    color: 'white',
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap', overflow: 'auto' }}>
                {[vehicle.image, ...vehicle.images].map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setActiveImage(img)}
                    sx={{
                      width: 80,
                      height: 60,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImage === img ? '2px solid #6466e9' : '2px solid transparent',
                      opacity: activeImage === img ? 1 : 0.7,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`${vehicle.name} view ${index}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            
            {/* Vehicle Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {vehicle.name}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkspacePremiumIcon sx={{ color: '#6466e9', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    <strong>Vehicle Number:</strong> {vehicle.vehicle_number}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ color: '#6466e9', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    <strong>Capacity:</strong> {vehicle.capacity} {vehicle.capacity > 1 ? 'People' : 'Person'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DriveEtaIcon sx={{ color: '#6466e9', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    <strong>Type:</strong> {vehicle.vehicle_type}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocalTaxiOutlinedIcon sx={{ color: '#6466e9', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    <strong>Owner:</strong> {vehicle.owner_name}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <InfoOutlinedIcon sx={{ color: '#6466e9', mr: 1, fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    <strong>Description:</strong> {vehicle.description}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Pricing Details */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Rental Details
                </Typography>
                
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Base Price</TableCell>
                        <TableCell align="right">${vehicle.base_price} per day</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Price per KM</TableCell>
                        <TableCell align="right">${vehicle.price_per_km}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Rental Period</TableCell>
                        <TableCell align="right">{totalDays} days</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Total Rental Cost</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: '#6466e9' }}>${totalPrice}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Button
                    startIcon={<GavelIcon />}
                    variant="outlined"
                    onClick={() => setShowAgreement(true)}
                    sx={{ borderColor: '#6466e9', color: '#6466e9' }}
                  >
                    View Rental Agreement
                  </Button>
                  
                  <Button
                    variant="contained"
                    onClick={onBook}
                    sx={{ 
                      bgcolor: '#6466e9',
                      '&:hover': {
                        bgcolor: '#5355c9'
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
              
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'rgba(100, 102, 233, 0.05)', 
                border: '1px solid rgba(100, 102, 233, 0.2)' 
              }}>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Availability Period:</strong> {vehicle.availability_from.toLocaleDateString()} to {vehicle.availability_to.toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

const VehicleListing: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 1));
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleConfirmBooking = async () => {
    if (!selectedVehicle || !startDate || !endDate) {
      alert("Missing booking information");
      return;
    }

    const userId = 1; // You should ideally get this from auth context or state
    const vehicleId = selectedVehicle.id;

    // Format dates as "YYYY-MM-DD"
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    try {
      const success = await rentVehicle({
        userId,
        vehicleId,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      });

      if (success) {
        alert(`Booking confirmed for ${selectedVehicle.name}`);
        setSelectedVehicle(null);
        setSearchPerformed(false);
      } else {
        alert("Failed to book the vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An unexpected error occurred while booking.");
    }
  };


  const handleSearch = async () => {
    if (startDate && endDate) {
      setIsLoading(true);
      try {
        const formattedStartDate = startDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const data = await getVehiclesByDateRange(formattedStartDate, formattedEndDate);

        const mappedVehicles = data.map((item) => ({
          id: item.vehicle.vehicleId,
          name: `${item.vehicle.vehicleType} ${item.vehicle.vehicleNumber}`,
          vehicle_number: item.vehicle.vehicleNumber,
          image: item.images[0]?.imageUrl.trim(),
          images: item.images.slice(1).map((img) => img.imageUrl.trim()),
          capacity: item.vehicle.passengerCount,
          vehicle_type: item.vehicle.vehicleType,
          price_per_km: item.vehicle.pricePerKm,
          base_price: item.vehicle.basePrice,
          description: item.vehicle.description,
          owner_name: item.owner.name,
          availability_from: new Date(item.availability.availabilityFrom),
          availability_to: new Date(item.availability.availabilityTo),
        }));

        setVehicles(mappedVehicles);
        setSearchPerformed(true);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        alert("Failed to load vehicles");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please select both start and end dates');
    }
  };

  // Filter available vehicles based on date range
  const availableVehicles = searchPerformed ? vehicles.filter(vehicle => {
    if (!startDate || !endDate) return false;
    return (
      startDate >= vehicle.availability_from &&
      endDate <= vehicle.availability_to
    );
  }) : [];

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
              mb: 2, 
              backgroundColor: 'rgba(100, 102, 233, 0.0)',
              backgroundImage: 'linear-gradient(90deg, rgba(100, 102, 233, 0.3) 0%, rgba(218, 246, 255, 0) 100%)'
            }}
          >
            <Typography variant="h5" fontWeight="700" color="#fff">
              Rent a Vehicle
            </Typography>
          </Box>          <Grid container spacing={2}>
            {/* Search Form */}
            <Grid item xs={12}><Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 4, 
                  mb: 2, 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <Typography variant="h6" fontWeight="700" mb={2}>Search Available Vehicles</Typography>
                  <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Pickup Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        disablePast
                        slotProps={{
                          textField: { 
                            fullWidth: true,
                            required: true,
                            sx: {
                              '& .MuiInputBase-root': {
                                borderRadius: 2,
                                backgroundColor: '#fff'
                              }
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Return Date"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        disablePast
                        slotProps={{
                          textField: { 
                            fullWidth: true,
                            required: true,
                            sx: {
                              '& .MuiInputBase-root': {
                                borderRadius: 2,
                                backgroundColor: '#fff'
                              }
                            }
                          }
                        }}
                        minDate={startDate || undefined}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>                  
                  <Button 
                    variant="contained" 
                    size="medium"
                    onClick={handleSearch}
                    disabled={isLoading}
                    sx={{ 
                      bgcolor: isLoading ? '#a0a1ec' : '#6466e9', 
                      '&:hover': { bgcolor: '#5355c9' },
                      px: 3
                    }}
                  >
                    {isLoading ? 'Searching...' : 'Search Vehicles'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Search Results or Vehicle Details */}
            <Grid item xs={12}>
              {selectedVehicle ? (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 4, 
                    overflow: 'hidden', 
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <Box sx={{ p: 2, bgcolor: '#6466e9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="white" fontWeight="600">Vehicle Details</Typography>
                    <Button 
                      variant="text" 
                      color="inherit" 
                      onClick={() => setSelectedVehicle(null)}
                      sx={{ color: 'white' }}
                    >
                      Back to List
                    </Button>
                  </Box>                  <VehicleDetails 
                    vehicle={selectedVehicle}
                    startDate={startDate}
                    endDate={endDate}
                    onBook={handleConfirmBooking}
                  />
                </Paper>              
                ) : searchPerformed ? (
                <Box>
                  <Paper
                    elevation={0}
                    sx={{                    display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <Typography variant="h6" fontWeight="700">
                      Available Vehicles ({availableVehicles.length})
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarMonthIcon sx={{ color: '#6466e9' }} />
                      <Typography variant="body2" sx={{ color: '#555', fontWeight: 500 }}>
                        {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Paper>
                  
                  <Grid container spacing={2}>
                    {availableVehicles.length > 0 ? (
                      availableVehicles.map((vehicle) => (
                        <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                          <VehicleCard
                            vehicle={vehicle}
                            onSelect={handleSelectVehicle}
                          />
                        </Grid>
                      ))
                    ) : (                      <Grid item xs={12}>
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            p: 5, 
                            textAlign: 'center',
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'rgba(100, 102, 233, 0.1)',
                              mb: 2,
                              mx: 'auto'
                            }}
                          >
                            <CalendarMonthIcon sx={{ fontSize: 28, color: '#6466e9' }} />
                          </Box>
                          <Typography variant="h6" color="text.secondary" mb={1} fontWeight="600">
                            No vehicles available for the selected dates
                          </Typography>
                          <Typography variant="body2" color="text.secondary" mb={3} sx={{ maxWidth: 500, mx: 'auto' }}>
                            Please try different dates or contact our customer support team for assistance with your vehicle rental needs.
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setStartDate(new Date());
                              setEndDate(addDays(new Date(), 1));
                            }}
                            sx={{ 
                              borderColor: '#6466e9', 
                              color: '#6466e9',
                              borderRadius: 2
                            }}
                          >
                            Change Dates
                          </Button>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ) : (                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 5, 
                    textAlign: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '8px',
                      background: 'linear-gradient(90deg, #6466e9 0%, #8B8DFF 100%)',
                    }
                  }}
                >
                  <Box 
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 4
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 200,
                        height: 140,
                        position: 'relative',
                        mb: 1
                      }}
                    >
                      <Box 
                        component="img"
                        src={nissan}
                        alt="Luxury vehicle"
                        sx={{ 
                          width: 160, 
                          height: 'auto', 
                          objectFit: 'contain',
                          zIndex: 1
                        }} 
                      />
                      <Box 
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          width: '80%',
                          height: '30px',
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.08)',
                          filter: 'blur(4px)',
                          zIndex: 0
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" color="text.primary" fontWeight="700" mb={2}>
                    Find the Perfect Vehicle for Your Journey
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth: 600, mx: 'auto' }}>
                    Select your pickup and return dates above to see available vehicles. Our fleet includes various options from scooters to luxury vans.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PriceCheckIcon />}
                    onClick={handleSearch}
                    sx={{ 
                      bgcolor: '#6466e9', 
                      '&:hover': { bgcolor: '#5355c9' },
                      px: 4,
                      py: 1.5,
                      borderRadius: 2
                    }}
                  >
                    Search Available Vehicles
                  </Button>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleListing;
