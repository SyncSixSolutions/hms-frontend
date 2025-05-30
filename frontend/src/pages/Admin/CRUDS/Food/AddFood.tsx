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
  InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
// Import your admin avatar if you have one or use a placeholder
// import adminAvatar from '../../../assets/images/admin-avatar.png';

interface FoodFormData {
  foodNumber: string;
  foodName: string;
  availableTimes: string;
  foodNature: string;
  price: string;
  foodType: string;
  foodDescription: string;
  images: string[];
}

const AddFood: React.FC = () => {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl]
      });
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

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f8f9fa',
        p: 3
      }}
    >
      {/* Header */}
      <Box sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#334155', fontWeight: 600 }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
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
              bgcolor: '#6366f1'
            }} 
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          mb: 4
        }}
      >
        {/* Page Title */}
        <Box sx={{ bgcolor: '#6366f1', color: 'white', p: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Add a new food
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
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
                  <Grid item key={index}>
                    <Box
                      component="img"
                      src={img}
                      alt={`Food preview ${index + 1}`}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                      }}
                    />
                  </Grid>
                ))}

                {/* Image upload box */}
                <Grid item>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
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
                    <Typography variant="caption" color="#64748b">
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
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
    </Box>
  );
};

export default AddFood;