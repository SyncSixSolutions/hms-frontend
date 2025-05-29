import React, { useState } from 'react';
import { Avatar, Button, Card, Grid, Typography, Box, Paper, TextField, IconButton, Fade, Grow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaIcon from '@mui/icons-material/Spa';
import FaceIcon from '@mui/icons-material/Face';
import MassageIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import treatment_1 from '../../../assets/images/theraphy/treatment_1.png';
import treatment_2 from '../../../assets/images/theraphy/treatment_2.png';
import treatment_3 from '../../../assets/images/theraphy/treatment_3.png';
import treatment_4 from '../../../assets/images/theraphy/treatment_4.png';
import details_food from '../../../assets/images/theraphy/details_food.png';
import bgphoto from '../../../assets/images/theraphy/background.png';


const spaPromoImage = '/api/placeholder/400/300';
const userAvatar = '/api/placeholder/40/40';

interface TreatmentCardProps {
  id: number;
  name: string;
  image: string;
  description?: string;
  onSelect: (id: number) => void;
  isSelected: boolean;
  bgColor: string;
}

interface Treatment {
  id: number;
  name: string;
  image: string;
  description?: string;
  bgColor: string;
}

// Treatment Card Component - Updated to show only images without text
const TreatmentCard: React.FC<TreatmentCardProps> = ({
  id,
  name,
  image,
  description,
  onSelect,
  isSelected,
  bgColor
}) => (
  <Card
    sx={{
      position: 'relative',
      borderRadius: 3,
      boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
      height: '260px',
      width: '350px',
      cursor: 'pointer',
      overflow: 'hidden',
      border: isSelected ? '3px solid #fff' : 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 8px 24px',
      }
    }}
    onClick={() => onSelect(id)}
  >
    {/* Background Image */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />

    {/* Optional: Light overlay for better hover effect */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.1)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        '&:hover': {
          opacity: 1,
        }
      }}
    />
  </Card>
);

// Updated Booking Side Panel Component with pink color theme
const BookingSidePanel: React.FC<{
  selectedTreatment: Treatment | null;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ selectedTreatment, onClose, onConfirm }) => {
  const [showDateSelection, setShowDateSelection] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Available time slots
  const timeSlots = [
    '08:00 AM',
    '10:00 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
    '08:00 PM',
    '10:00 PM'
  ];

  const handleGetTimeClick = () => {
    setShowDateSelection(true);
  };

  const handleDateConfirm = () => {
    if (selectedDate && selectedTime) {
      console.log('Selected date:', selectedDate);
      console.log('Selected time:', selectedTime);
      onConfirm();
    }
  };

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 3
    }}>
      {!showDateSelection ? (
        // Initial view with treatment details
        <>
          <Fade in timeout={600}>
            <Box sx={{ textAlign: 'center' }}>
              {/* Treatment Image */}
              <Box
                sx={{
                  width: '100%',
                  height: 280,
                  borderRadius: 3,
                  backgroundImage: `url(${selectedTreatment?.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mb: 3
                }}
              />

              {/* Treatment Name */}
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  mb: 2,
                  color: '#333'
                }}
              >
                {selectedTreatment?.name?.replace(/\n/g, ' ')}
              </Typography>

              {/* Small Description */}
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  lineHeight: 1.6,
                  mb: 4
                }}
              >
                {selectedTreatment?.description || 'Professional spa treatment designed to relax and rejuvenate your body and mind.'}
              </Typography>
            </Box>
          </Fade>

          {/* Get A Time Button */}
          <Fade in timeout={800}>
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 3,
                  py: 2,
                  bgcolor: '#e91e63',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#c2185b'
                  }
                }}
                onClick={handleGetTimeClick}
              >
                GET A TIME
              </Button>
            </Box>
          </Fade>
        </>
      ) : (
        // Date and time selection view
        <Grow in timeout={400}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: 3
          }}>

            {/* Treatment summary */}
            <Box sx={{
              mb: 2,
            }}>
              <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 1, color: '#000' }}>
                {selectedTreatment?.name?.replace(/\n/g, ' ')}
              </Typography>
              <Typography variant="body2" sx={{ color: '#000' }}>
                Professional spa treatment
              </Typography>
            </Box>

            {/* Calendar Date Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="400" sx={{ mb: 2, color: '#000' }}>
                Select a Date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={new Date()}
                  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#e91e63',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#e91e63',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#e91e63',
                        },
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Time Selection Boxes */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Typography variant="subtitle1" fontWeight="400" sx={{ mb: 2, color: '#000' }}>
                Select a Time
              </Typography>

              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
                maxHeight: '200px',
                overflow: 'auto'
              }}>
                {timeSlots.map((time) => (
                  <Box
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    sx={{
                      p: 1,
                      border: selectedTime === time ? '2px solid #e91e63' : '1px solid #e91e63',
                      borderRadius: 1.5,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: selectedTime === time ? '#e91e63' : '#fff',
                      transition: 'all 0.2s ease',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        bgcolor: '#e91e63',
                        borderColor: '#e91e63',
                        '& .time-text': {
                        color: '#fff'
                        }
                      }
                    }}
                  >
                   <Typography 
          className="time-text"
          variant="body2" 
          fontWeight={selectedTime === time ? 600 : 400}
          sx={{ 
            color: selectedTime === time ? '#fff' : '#e91e63',
            fontSize: '0.875rem',
            transition: 'color 0.2s ease'
          }}
        >
          {time}
        </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Confirm Button Only */}
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 2,
                  bgcolor: '#e91e63',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#c2185b'
                  },
                  '&:disabled': {
                    bgcolor: '#f8bbd9',
                    color: '#ad1457'
                  }
                }}
                onClick={handleDateConfirm}
                disabled={!selectedDate || !selectedTime}
              >
                Confirm Booking
              </Button>
            </Box>
          </Box>
        </Grow>
      )}
    </Box>
  );
};

const SpaDashboard: React.FC = () => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<number | null>(null);

  const treatments: Treatment[] = [
    {
      id: 1,
      name: 'Massage\nRituals',
      image: treatment_1,
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Relaxing full body massage'
    },
    {
      id: 2,
      name: 'Manicure\n&\nPedicure',
      image: treatment_2,
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Professional nail care'
    },
    {
      id: 3,
      name: 'Beauty\nTreatments',
      image: treatment_3,
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Rejuvenating facial treatments'
    },
    {
      id: 4,
      name: 'Body\nTreatments',
      image: treatment_4,
      bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Full body wellness treatments'
    },
  ];

  const handleSelectTreatment = (treatmentId: number) => {
    setSelectedTreatmentId(treatmentId === selectedTreatmentId ? null : treatmentId);
  };

  const handleConfirmBooking = () => {
    console.log(`Confirming booking for treatment ID: ${selectedTreatmentId}`);
    setSelectedTreatmentId(null);
  };

  const selectedTreatment = selectedTreatmentId
    ? treatments.find(t => t.id === selectedTreatmentId) || null
    : null;

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundImage: `url(${bgphoto})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'

    }}>
      {/* Spa Title Background
      <Box sx={{
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pt: 8
      }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: '#fff', 
            fontWeight: 300, 
            fontSize: '3rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            opacity: 0.8
          }}
        >
          Spa
        </Typography>
      </Box> */}

      {/* Sidebar */}
      <Box sx={{
        width: 80,
        bgcolor: '#fff',
        boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        gap: 3
      }}>
        <Box sx={{
          width: 40,
          height: 40,
          bgcolor: '#e8e5ff',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <HomeIcon sx={{ color: '#6466e9', fontSize: 20 }} />
        </Box>
        <CalendarTodayIcon sx={{ color: '#ccc', fontSize: 20 }} />
        <PersonIcon sx={{ color: '#ccc', fontSize: 20 }} />
        <SettingsIcon sx={{ color: '#ccc', fontSize: 20 }} />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{
          p: 3,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#333', fontWeight: 600 }}>
              Welcome, Nishagi
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
              Tue, 07 June 2022
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <SearchIcon sx={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#ccc',
                fontSize: 20
              }} />
              <TextField
                placeholder="Search"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    pl: 5,
                    borderRadius: 2,
                    bgcolor: 'rgba(248, 249, 250, 0.9)'
                  }
                }}
              />
            </Box>
            <Avatar src={userAvatar} sx={{ width: 40, height: 40 }} />
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 4 }}>
          <Grid container spacing={4}>
            {/* Left Side - Treatments */}
            <Grid item xs={12} md={selectedTreatmentId ? 8 : 8}>
              <Box sx={{
                bgcolor: 'rgba(212, 212, 216, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: 4,
                minHeight: '600px'
              }}>
                {/* <Typography
                  variant="h2"
                  sx={{
                    color: '#fff',
                    fontWeight: 300,
                    fontSize: '3rem',
                    mb: 4
                  }}
                >
                  Spa
                </Typography> */}

                <Typography
                  variant="h5"
                  sx={{
                    color: '#333',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  Treatments
                </Typography>

                <Grid container spacing={3}>
                  {treatments.map(treatment => (
                    <Grid item xs={12} sm={6} key={treatment.id}>
                      <TreatmentCard
                        id={treatment.id}
                        name={treatment.name}
                        image={treatment.image}
                        description={treatment.description}
                        onSelect={handleSelectTreatment}
                        isSelected={treatment.id === selectedTreatmentId}
                        bgColor={treatment.bgColor}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Right Side - Booking Panel or Promo */}
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '600px' }}>
                {selectedTreatmentId ? (
                  <Grow in timeout={400}>
                    <Box sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      p: 3,
                      height: '100%',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
                    }}>
                      <BookingSidePanel
                        selectedTreatment={selectedTreatment}
                        onClose={() => setSelectedTreatmentId(null)}
                        onConfirm={handleConfirmBooking}
                      />
                    </Box>
                  </Grow>
                ) : (
                  <Box sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
                  }}>
                    <Box sx={{
                      height: '100%',
                      backgroundImage: `url(${details_food})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}>

                    </Box>

                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SpaDashboard;