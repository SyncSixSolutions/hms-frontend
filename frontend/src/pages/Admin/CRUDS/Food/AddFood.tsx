import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Paper, 
  Grid, 
  MenuItem, 
  Avatar,
  Card,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
// Import your admin avatar if you have one or use a placeholder
// import adminAvatar from '../../../../assets/images/admin-avatar.png';

interface FoodFormData {
  foodNumber: string;
  foodName: string;
  availableTimes: string;
  foodNature: string;
  price: string;
  foodType: string;
  foodDescription: string;
  images: File[];
}


const AddFood: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [formData, setFormData] = useState<FoodFormData>({
    foodNumber: '',
    foodName: '',
    availableTimes: '',
    foodNature: '',
    price: '',
    foodType: '',
    foodDescription: '',
    images: []
  });

  // Sample images for demonstration - replace with your actual food images
  const [sampleImages] = useState<string[]>([
    'https://source.unsplash.com/random/200x200/?salad',
    'https://source.unsplash.com/random/200x200/?food'
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const foodFormData = new FormData();
  foodFormData.append('foodNumber', formData.foodNumber);
  foodFormData.append('foodName', formData.foodName);
  foodFormData.append('availableTimes', formData.availableTimes);
  foodFormData.append('foodNature', formData.foodNature);
  foodFormData.append('price', formData.price);
  foodFormData.append('foodType', formData.foodType);
  foodFormData.append('foodDescription', formData.foodDescription);

  // Append only the first image (if you only support one)
  if (formData.images.length > 0) {
    foodFormData.append('image', formData.images[0]); // 'image' is the backend field name
  }

  try {
    const response = await fetch('http://localhost:9000/foods-service/foods/add', {
      method: 'POST',
      body: foodFormData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Food added successfully:', result);
    } else {
      console.error('Failed to add food');
    }
  } catch (err) {
    console.error('Error during submission:', err);
  }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting food data:', formData);
    // Call API to save data
  };

  const handleCancel = () => {
    // Handle cancellation logic
    console.log('Cancelled');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ bgcolor: '#6366f1', mr: 2 }} />
        <Typography variant="h6">Admin Panel</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Dashboard</Button>
        <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Food Management</Button>
        <Button variant="text" sx={{ justifyContent: 'flex-start' }}>User Management</Button>
        <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Settings</Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
          <Toolbar>
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ color: '#334155' }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#334155' }}>
              Add Food
            </Typography>
            <Avatar sx={{ bgcolor: '#6366f1', width: 35, height: 35 }} />
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>

      <Container maxWidth="lg" sx={{ 
        flexGrow: 1,
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#f8f9fa',
        p: { xs: 1, sm: 2, md: 3 },
        pt: isMobile ? 2 : 3,
      }}>
        {/* Desktop/Tablet Header */}
        {!isMobile && (
          <Box sx={{
            p: { xs: 1, sm: 2 },
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isTablet ? 'flex-start' : 'center',
            mb: 3,
            gap: isTablet ? 2 : 0
          }}>
            <Box>
              <Typography 
                variant={isTablet ? "h6" : "h5"} 
                sx={{ color: '#334155', fontWeight: 600 }}
              >
                Welcome, Admin
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}
              >
                {currentDate}
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              width: isTablet ? '100%' : 'auto'
            }}>
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                fullWidth={isTablet}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 20, bgcolor: 'white' }
                }}
              />
              <Avatar 
                // src={adminAvatar} 
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: '#6366f1',
                  flexShrink: 0
                }} 
              />
            </Box>
          </Box>
        )}

        {/* Main Content */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            mb: 4,
            flexGrow: 1
          }}
        >
          {/* Page Title */}
          <Box sx={{ bgcolor: '#6366f1', color: 'white', p: 2 }}>
            <Typography variant="h6" fontWeight="600">
              Add a new food
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <form onSubmit={handleSubmit}>
              {/* Food Picture Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    Food Picture
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: '#64748b' }} />
                </Box>

                <Grid container spacing={2}>
                  {/* Sample food images */}
                  {sampleImages.map((img, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                      <Box
                        component="img"
                        src={img}
                        alt={`Food preview ${index + 1}`}
                        sx={{
                          width: '100%',
                          aspectRatio: '1/1',
                          objectFit: 'cover',
                          borderRadius: 2,
                          border: '1px solid #e2e8f0'
                        }}
                      />
                    </Grid>
                  ))}

                  {/* Image upload box */}
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                    <Box
                      sx={{
                        width: '100%',
                        aspectRatio: '1/1',
                        border: '1px dashed #cbd5e1',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          bgcolor: '#f1f5f9',
                        }
                      }}
                      component="label"
                      htmlFor="image-upload"
                    >
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      <AddPhotoAlternateIcon sx={{ fontSize: 24, color: '#94a3b8', mb: 1 }} />
                      <Typography variant="caption" color="#64748b" align="center">
                        Add image
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Food Details Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    Food Details
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: '#64748b' }} />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Food number"
                      name="foodNumber"
                      value={formData.foodNumber}
                      onChange={handleChange}
                      fullWidth
                      required
                      placeholder="Food number"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Food name"
                      name="foodName"
                      value={formData.foodName}
                      onChange={handleChange}
                      fullWidth
                      required
                      placeholder="Food name"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Available times"
                      name="availableTimes"
                      value={formData.availableTimes}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="">-Select-</MenuItem>
                      <MenuItem value="breakfast">Breakfast</MenuItem>
                      <MenuItem value="lunch">Lunch</MenuItem>
                      <MenuItem value="dinner">Dinner</MenuItem>
                      <MenuItem value="allday">All Day</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Food nature"
                      name="foodNature"
                      value={formData.foodNature}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="">-Select-</MenuItem>
                      <MenuItem value="veg">Vegetarian</MenuItem>
                      <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
                      <MenuItem value="vegan">Vegan</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      fullWidth
                      required
                      placeholder="Rs. Price"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Food type"
                      name="foodType"
                      value={formData.foodType}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="">-Select-</MenuItem>
                      <MenuItem value="appetizer">Appetizer</MenuItem>
                      <MenuItem value="mainCourse">Main Course</MenuItem>
                      <MenuItem value="dessert">Dessert</MenuItem>
                      <MenuItem value="beverage">Beverage</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Food description"
                      name="foodDescription"
                      value={formData.foodDescription}
                      onChange={handleChange}
                      fullWidth
                      required
                      placeholder="Food description"
                      variant="outlined"
                      size="small"
                      multiline
                      rows={isMobile ? 3 : 4}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2, 
                mt: 4 
              }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={isMobile}
                  startIcon={<SaveIcon />}
                  sx={{
                    bgcolor: '#6366f1',
                    borderRadius: 2,
                    py: 1,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#5355c9'
                    }
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth={isMobile}
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#cbd5e1',
                    color: '#64748b',
                    borderRadius: 2,
                    py: 1,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                      borderColor: '#cbd5e1',
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddFood;