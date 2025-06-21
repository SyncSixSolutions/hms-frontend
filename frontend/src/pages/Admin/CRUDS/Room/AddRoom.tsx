import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import CardContent from "../../../../components/ui/CardContent";
import Input from "../../../../components/ui/Input";
import Checkbox from "../../../../components/ui/Checkbox";
import { roomService } from "../../../../services/roomService";

import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

interface RoomFormData {
  roomNumber: string;
  roomFloor: string;
  reservationStatus: string;
  roomType: string;
  capacity: string;
  pricePerNight: string;
  bedType: string;
  roomSize: string;
  description: string;
  images: File[];
  imagePreviews: string[];
  amenities: {
    petFriendly: boolean;
    smoking: boolean;
    wifi: boolean;
    miniBar: boolean;
    coffeeMaker: boolean;
    cityView: boolean;
    shower: boolean;
    sofaBox: boolean;
    refrigerator: boolean;
    airConditioner: boolean;
    tvCable: boolean;
    seaView: boolean;
  };
}

const AddRoom: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RoomFormData>({
    roomNumber: "",
    roomFloor: "",
    reservationStatus: "Vacant",
    roomType: "Deluxe",
    capacity: "",
    pricePerNight: "",
    bedType: "King size",
    roomSize: "",
    description: "",
    images: [],
    imagePreviews: [],
    amenities: {
      petFriendly: false,
      smoking: false,
      wifi: false,
      miniBar: false,
      coffeeMaker: false,
      cityView: false,
      shower: false,
      sofaBox: false,
      refrigerator: false,
      airConditioner: false,
      tvCable: false,
      seaView: false,
    },
  });

  // Cleanup function for image preview URLs
  useEffect(() => {
    return () => {
      formData.imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [formData.imagePreviews]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked,
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);

      setFormData({
        ...formData,
        images: [...formData.images, file],
        imagePreviews: [...formData.imagePreviews, previewUrl],
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];

    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Convert floor number from string (e.g., "Floor 3") to integer
      const parsedFloor = parseInt(
        formData.roomFloor.replace(/[^0-9]/g, ""),
        10
      );
      if (isNaN(parsedFloor)) {
        throw new Error("Invalid floor number");
      }

      // 2. Map checked amenities to their corresponding IDs
      const amenityNameToId: Record<string, number> = {
        petFriendly: 1,
        smoking: 2,
        wifi: 3,
        miniBar: 4,
        coffeeMaker: 5,
        cityView: 6,
        shower: 7,
        sofaBox: 8,
        refrigerator: 9,
        airConditioner: 10,
        tvCable: 11,
        seaView: 12,
      };

      const selectedAmenityIds = Object.entries(formData.amenities)
        .filter(([_, isChecked]) => isChecked)
        .map(([key]) => amenityNameToId[key]);

      // 3. Build FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("roomNumber", formData.roomNumber);
      formDataToSend.append("floor", parsedFloor.toString()); // ✅ match backend DTO (floor)
      formDataToSend.append("status", formData.reservationStatus); // ✅ match backend DTO (status)
      formDataToSend.append("roomType", formData.roomType);
      formDataToSend.append("capacity", parseInt(formData.capacity).toString());
      formDataToSend.append(
        "pricePerNight",
        parseFloat(formData.pricePerNight).toString()
      );
      formDataToSend.append("bedType", formData.bedType);
      formDataToSend.append("roomSize", formData.roomSize);
      formDataToSend.append("description", formData.description);

      selectedAmenityIds.forEach((id) =>
        formDataToSend.append("amenityIds", id.toString())
      );
      formData.images.forEach((image) =>
        formDataToSend.append("images", image)
      );

      // 4. Submit to backend
      const response = await fetch(
        "http://localhost:8765/api/services/rooms/add",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit room: ${errorText}`);
      }

      alert("Room added successfully!");
      navigate("/admin/rooms");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/rooms");
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar sx={{ bgcolor: "#6366f1", mr: 2 }} />
        <Typography variant="h6">Admin Panel</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div className="mb-2">
          <Button
            variant="secondary"
            className="w-full text-left justify-start"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </Button>
        </div>
        <div className="mb-2">
          <Button
            variant="primary"
            className="w-full text-left justify-start"
            onClick={() => navigate("/admin/rooms")}
          >
            Room Management
          </Button>
        </div>
        <div className="mb-2">
          <Button
            variant="secondary"
            className="w-full text-left justify-start"
          >
            User Management
          </Button>
        </div>
        <div className="mb-2">
          <Button
            variant="secondary"
            className="w-full text-left justify-start"
          >
            Settings
          </Button>
        </div>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ color: "#334155" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#334155" }}
            >
              Add Room
            </Typography>
            <Avatar sx={{ bgcolor: "#6366f1", width: 35, height: 35 }} />
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

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f3f3f3",
          p: { xs: 0.3, sm: 0.5, md: 1 },
          pt: isMobile ? 2 : 3,
          boxShadow: 3,
        }}
      >
        {/* Desktop/Tablet Header */}
        {!isMobile && (
          <Box
            sx={{
              p: { xs: 1, sm: 2 },
              display: "flex",
              flexDirection: isTablet ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isTablet ? "flex-start" : "center",
              mb: 3,
              gap: isTablet ? 2 : 0,
            }}
          >
            <Box>
              <Typography
                variant={isTablet ? "h6" : "h5"}
                sx={{ color: "#334155", fontWeight: 600 }}
              >
                Welcome, Admin
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: "#64748b",
                  fontSize: "0.9rem",
                }}
              >
                {currentDate}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: isTablet ? "100%" : "auto",
              }}
            >
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                fullWidth={isTablet}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 20, bgcolor: "white" },
                }}
              />
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#6366f1",
                  flexShrink: 0,
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
              Add a new room
            </Typography>
          </div>

          <CardContent className="p-4 -m-4">
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                <p>{error}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              {/* Room Picture Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <Typography variant="subtitle1" fontWeight="600">
                    Room Picture
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: "#64748b" }} />
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Uploaded image previews */}
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Room preview ${index + 1}`}
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

                    {/* Image upload box - only show if less than 4 images */}
                    {formData.imagePreviews.length < 4 && (
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
                          <AddPhotoAlternateIcon
                            sx={{ fontSize: 24, color: "#94a3b8", mb: 1 }}
                          />
                          <span className="text-xs text-gray-500">
                            Add image
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Room Details Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <Typography variant="subtitle1" fontWeight="600">
                    Room Details
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: "#64748b" }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Room number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                    placeholder="Room number"
                  />

                  <Input
                    label="Room floor"
                    name="roomFloor"
                    value={formData.roomFloor}
                    onChange={handleChange}
                    required
                    placeholder="Floor number"
                  />

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Reservation status
                    </label>
                    <select
                      name="reservationStatus"
                      value={formData.reservationStatus}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                               hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                               focus:outline-none transition duration-150 ease-in-out"
                    >
                      <option value="Vacant">Vacant</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Room type
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                               hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                               focus:outline-none transition duration-150 ease-in-out"
                    >
                      <option value="Deluxe">Deluxe</option>
                      <option value="Standard">Standard</option>
                      <option value="Suite">Suite</option>
                      <option value="Executive">Executive</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  <Input
                    label="Room capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    placeholder="2-4 guests"
                  />

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Room price per night
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        $
                      </span>
                      <input
                        name="pricePerNight"
                        value={formData.pricePerNight}
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
                      Bed type
                    </label>
                    <select
                      name="bedType"
                      value={formData.bedType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                                                     hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                                                     focus:outline-none transition duration-150 ease-in-out"
                    >
                      <option value="King size">King size</option>
                      <option value="Queen size">Queen size</option>
                      <option value="Twin">Twin</option>
                      <option value="Double">Double</option>
                      <option value="Single">Single</option>
                    </select>
                  </div>

                  <Input
                    label="Room size (sq ft)"
                    name="roomSize"
                    value={formData.roomSize}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 350"
                  />

                  <div className="mb-2 p-2">
                    <label className="block mb-1 text-sm font-medium text-text">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write room description here..."
                      className="w-full px-3 py-2 border border-border rounded-xl shadow-sm bg-bg text-text 
                                                       hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                                                       focus:outline-none transition duration-150 ease-in-out resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <Typography variant="subtitle1" fontWeight="600">
                    Amenities
                  </Typography>
                  <InfoIcon sx={{ fontSize: 18, color: "#64748b" }} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(formData.amenities).map(
                    ([amenity, checked]) => (
                      <Checkbox
                        key={amenity}
                        label={amenity
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        name={amenity}
                        checked={checked}
                        onChange={handleAmenityChange}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  startIcon={<SaveIcon />}
                >
                  {loading ? "Saving..." : "Save Room"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AddRoom;
