import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Paper, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { foodService, FoodItem } from '../../../../services/foodService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const FoodList: React.FC = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch foods when component mounts
  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        const data = await foodService.getAllFoods();
        setFoods(data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to load foods:', err);
        setError(err.message || 'Failed to load foods. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  const handleAddFood = () => {
    navigate('/admin/foods/add');
  };

  const handleEditFood = (id: number) => {
    navigate(`/admin/foods/edit/${id}`);
  };

  const handleDeleteFood = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        setLoading(true);
        await foodService.deleteFood(id);
        // Remove the deleted food from the list
        setFoods(foods.filter(food => food.id !== id));
      } catch (err: any) {
        console.error('Failed to delete food:', err);
        setError(err.message || 'Failed to delete food. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && foods.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Food Items</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddFood}
        >
          Add Food
        </Button>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#FEE2E2', color: '#B91C1C' }}>
          <Typography>{error}</Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        {foods.map((food) => (
          <Grid item xs={12} sm={6} md={4} key={food.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={food.image || 'https://via.placeholder.com/300x140?text=No+Image'}
                alt={food.foodName}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {food.foodName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {food.foodDescription}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Rs. {food.price}</Typography>
                  <Box>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditFood(food.id!)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteFood(food.id!)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodList;