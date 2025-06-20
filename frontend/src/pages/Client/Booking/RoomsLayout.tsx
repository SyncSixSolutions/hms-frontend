import React from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  { id: 1, name: "Room 101", x: 1, y: 1 },
  { id: 2, name: "Room 102", x: 2, y: 1 },
  { id: 3, name: "Room 103", x: 3, y: 1 },
  { id: 4, name: "Room 104", x: 1, y: 2 },
  { id: 5, name: "Room 105", x: 2, y: 2 },
  { id: 6, name: "Room 106", x: 3, y: 2 },
];

const dummyBookingData = {
  guest: "John Doe",
  date: "2025-06-20",
  nights: 2,
};

const RoomsLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleRoomClick = (room: typeof rooms[0]) => {
    navigate("/confirmBooking", {
      state: {
        room,
        ...dummyBookingData,
      },
    });
  };

  return (
    <div>
      <h2>Floor 1 Layout</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 120px)",
          gridTemplateRows: "repeat(2, 120px)",
          gap: "20px",
          background: "#f0f0f0",
          padding: "30px",
          borderRadius: "12px",
          width: "max-content",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room)}
            style={{
              background: "#fff",
              border: "2px solid #1976d2",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "background 0.2s",
            }}
            title={room.name}
          >
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsLayout;