import React, { useState, useEffect } from 'react';
import { foodService } from '../../../../services/foodService';
import Button from '../../../../components/ui/Button';
import Card from '../../../../components/ui/Card';
import CardContent from '../../../../components/ui/CardContent';
import Input from '../../../../components/ui/Input';

import { 
  Box, 
  Typography, 
  TextField, 
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
      // Create a food data object that matches your backend expectations
      const foodDataForBackend = {
        foodNumber: formData.foodNumber,
        foodName: formData.foodName,
        availableTimes: formData.availableTimes,
        foodNature: formData.foodNature,
        price: formData.price,
        foodType: formData.foodType,
        foodDescription: formData.foodDescription
      };

      // If there's an image, log that it's not handled yet
      if (formData.images.length > 0) {
        console.log("Image upload is not implemented in the backend yet");
      }

      // Use the service to add the food
      await foodService.addFood(foodDataForBackend);
      
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
        <div className="mb-2">
          <Button variant="secondary" className="w-full text-left justify-start" onClick={() => navigate('/dashboard-admin')}>
            Dashboard
          </Button>
        </div>
        <div className="mb-2">
          <Button 
            variant="primary" 
            className="w-full text-left justify-start"
            onClick={() => navigate('/admin/foods')}
          >
            Food Management
          </Button>
        </div>
        <div className="mb-2">
          <Button variant="secondary" className="w-full text-left justify-start">
            User Management
          </Button>
        </div>
        <div className="mb-2">
          <Button variant="secondary" className="w-full text-left justify-start">
            Settings
          </Button>
        </div>
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
        <Card className="mb-4 flex-grow">
          {/* Page Title */}
          <div className="bg-primary text-white p-4 -m-4 mb-4 rounded-t-2xl">
            <Typography variant="h6" fontWeight="600">
              Add a new food
            </Typography>
          </div>

          <CardContent className="p-4 -m-4">
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Picture Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <Typography variant="subtitle1" fontWeight="600">
                    Food Picture
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: '#64748b' }} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {/* Uploaded image previews */}
                  {formData.imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Food preview ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-xl border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  ))}

                  {/* Image upload box */}
                  <div className="relative">
                    <label 
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full aspect-square border border-dashed border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                      <AddPhotoAlternateIcon sx={{ fontSize: 24, color: '#94a3b8', mb: 1 }} />
                      <span className="text-xs text-gray-500">
                        {formData.imagePreviews.length > 0 ? 'Change image' : 'Add image'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Food Details Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <Typography variant="subtitle1" fontWeight="600">
                    Food Details
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: '#64748b' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Food number"
                    name="foodNumber"
                    value={formData.foodNumber}
                    onChange={handleChange}
                    required
                    placeholder="Food number"
                  />
                  
                  <Input
                    label="Food name"
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleChange}
                    required
                    placeholder="Food name"
                  />

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Available times
                    </label>
                    <select
                      name="availableTimes"
                      value={formData.availableTimes}
                      onChange={handleChange as any}
                      required
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                               hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                               focus:outline-none transition duration-150 ease-in-out"
                    >
                      <option value="">-Select-</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="allday">All Day</option>
                    </select>
                  </div>

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Food nature
                    </label>
                    <select
                      name="foodNature"
                      value={formData.foodNature}
                      onChange={handleChange as any}
                      required
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                               hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                               focus:outline-none transition duration-150 ease-in-out"
                    >
                      <option value="">-Select-</option>
                      <option value="veg">Vegetarian</option>
                      <option value="nonveg">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">Rs.</span>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Price"
                        className="w-full px-3 py-2 pl-10 border border-border rounded-3xl shadow-sm bg-bg text-text 
                                 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                                 focus:outline-none transition duration-150 ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Food type
                    </label>
                    <select
                      name="foodType"
                      value={formData.foodType}
                      onChange={handleChange as any}
                      required
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                               hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                               focus:outline-none transition duration-150 ease-in-out"
                    >
                      <option value="">-Select-</option>
                      <option value="appetizer">Appetizer</option>
                      <option value="mainCourse">Main Course</option>
                      <option value="dessert">Dessert</option>
                      <option value="beverage">Beverage</option>
                    </select>
                  </div>

                  <div className="mb-2 p-2 sm:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Food description
                    </label>
                    <textarea
                      name="foodDescription"
                      value={formData.foodDescription}
                      onChange={handleChange}
                      required
                      placeholder="Food description"
                      rows={isMobile ? 3 : 4}
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                               hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                               focus:outline-none transition duration-150 ease-in-out"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 mt-6`}>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 text-black ${isMobile ? 'w-full' : ''}`}
                >
                  <SaveIcon style={{ fontSize: '1.25rem' }} />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  className={isMobile ? 'w-full' : ''}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AddFood;