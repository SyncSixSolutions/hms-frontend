import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  useMediaQuery,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  imagePreviews: string[];  
}

const AddFood: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FoodFormData>({
    foodNumber: '',
    foodName: '',
    availableTimes: '',
    foodNature: '',
    price: '',
    foodType: '',
    foodDescription: '',
    images: [],
    imagePreviews: []
  });

  // Cleanup function for image preview URLs
  useEffect(() => {
    return () => {
      // Clean up the object URLs when component unmounts
      formData.imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      
      setFormData({
        ...formData,
        images: [file],
        imagePreviews: [previewUrl]
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create a data object that matches your backend DTO structure
      const foodDataForBackend = {
        foodNumber: formData.foodNumber,
        foodName: formData.foodName,
        availableTimes: formData.availableTimes,
        foodNature: formData.foodNature,
        price: formData.price,
        foodType: formData.foodType,
        foodDescription: formData.foodDescription
        // Image is not included in the JSON data
      };

      // If there's an image, we need to handle it with FormData
      if (formData.images.length > 0) {
        // For now, we're assuming the backend doesn't handle image uploads
        // If your backend is updated to handle images, you would implement that here
        console.log("Image upload is not implemented in the backend yet");
      }

      // Make the API call to add the food item
      const response = await fetch('http://localhost:8080/api/services/meals/addMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodDataForBackend),
      });

      if (!response.ok) {
        // Try to get error message from response
        let errorMsg = 'Failed to add food. Please try again.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // If parsing JSON fails, use the default error message
        }
        throw new Error(errorMsg);
      }

      const result = await response.json();
      console.log('Food added successfully:', result);
      
      // Show success message
      alert('Food added successfully!');
      
      // Navigate back to the food list
      navigate('/admin/foods');
    } catch (err: any) {
      console.error('Error during submission:', err);
      setError(err.message || 'Error connecting to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Navigate back to the food list page
    navigate('/admin/foods');
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
        <Button 
          variant="text" 
          sx={{ 
            justifyContent: 'flex-start',
            bgcolor: 'rgba(99, 102, 241, 0.08)',
            color: '#6366f1'
          }}
          onClick={() => navigate('/admin/foods')}
        >
          Food Management
        </Button>
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
            {error && (
              <Box sx={{ 
                bgcolor: '#FEE2E2', 
                color: '#B91C1C', 
                p: 2, 
                borderRadius: 1,
                mb: 3 
              }}>
                <Typography>{error}</Typography>
              </Box>
            )}
            
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
                  {/* Uploaded image previews */}
                  {formData.imagePreviews.map((preview, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={preview}
                          alt={`Food preview ${index + 1}`}
                          sx={{
                            width: '100%',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                            borderRadius: 2,
                            border: '1px solid #e2e8f0'
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveImage(index)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            '&:hover': {
                              bgcolor: '#f1f5f9',
                            }
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
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
                        {formData.imagePreviews.length > 0 ? 'Change image' : 'Add image'}
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
                  disabled={loading}
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
                  {loading ? 'Saving...' : 'Save Changes'}
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