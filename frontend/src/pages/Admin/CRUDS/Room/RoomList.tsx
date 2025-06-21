// src/pages/admin/room/RoomList.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { roomService, RoomItem } from "../../../../services/roomService";

const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.getAllRooms();
        setRooms(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load rooms:", err);
        setError(err.message || "Error loading rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async (roomNumber: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        setLoading(true);
        await roomService.deleteRoom(roomNumber);
        setRooms(rooms.filter((room) => room.roomNumber !== roomNumber));
      } catch (err: any) {
        console.error("Failed to delete room:", err);
        setError(err.message || "Failed to delete room. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddRoom = () => navigate("/admin/rooms/add");
  const handleEditRoom = (roomNumber: string) => navigate(`/admin/rooms/edit/${roomNumber}`);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (loading && rooms.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", p: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Welcome, Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentDate}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRoom}
        >
          Add Room
        </Button>
      </Box>

      {/* Room List */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Box sx={{ bgcolor: "#6366f1", color: "white", p: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            All Rooms
          </Typography>
        </Box>

        {rooms.map((room, index) => (
          <Box key={room.id}>
            {index > 0 && <Divider />}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "flex-start",
                p: 2,
                "&:hover": { bgcolor: "#f9f9f9" },
              }}
            >
              {/* Room Image */}
              <CardMedia
                component="img"
                image={
                  room.imageUrls?.[0]
                    ? `http://localhost:8765/${room.imageUrls[0]}`
                    : "https://via.placeholder.com/140x90?text=Room"
                }
                alt={`Room ${room.roomNumber}`}
                sx={{
                  width: { xs: "100%", sm: 140 },
                  height: 90,
                  mr: { sm: 2 },
                  mb: { xs: 2, sm: 0 },
                  borderRadius: 1,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleEditRoom(room.roomNumber)}
              />

              {/* Room Details */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600}>
                  Room No. {room.roomNumber}
                </Typography>
                <Typography variant="body2">
                  {room.roomSize} {room.roomType} with {room.bedType}
                </Typography>
                <Typography variant="body2">
                  Capacity - {room.capacity} people
                </Typography>
                <Typography variant="body2">
                  {Object.entries(room.amenities || {})
                    .filter(([_, v]) => v)
                    .map(([k]) =>
                      k
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                    )
                    .slice(0, 4)
                    .join(", ")}
                </Typography>
              </Box>

              {/* Price + Actions */}
              <Box sx={{ minWidth: 100, textAlign: "right" }}>
                <Typography variant="caption" color="text.secondary">
                  Price/night
                </Typography>
                <Typography fontWeight={600}>${room.pricePerNight}</Typography>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleDeleteRoom(room.roomNumber)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default RoomList;
