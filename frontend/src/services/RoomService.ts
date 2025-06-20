// Define the API endpoint for room operations
const API_BASE_URL = 'http://localhost:8080/api/services/rooms'; // Update with your actual API endpoint

export interface RoomItem {
  id?: number;
  roomNumber: string;
  roomFloor: string;
  reservationStatus: string;
  roomType: string;
  capacity: string;
  pricePerNight: string;
  bedType: string;
  roomSize: string;
  description: string;
  images?: string[];
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

export const roomService = {
  getAllRooms: async (): Promise<RoomItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      
      if (!response.ok) {
        throw new Error(`Error fetching rooms: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching all rooms:', error);
      throw error;
    }
  },
  
  getRoomById: async (id: number): Promise<RoomItem> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching room: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching room with id ${id}:`, error);
      throw error;
    }
  },
  
  addRoom: async (roomData: RoomItem): Promise<RoomItem> => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
      
      if (!response.ok) {
        throw new Error(`Error adding room: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  },
  
  updateRoom: async (id: number, roomData: Partial<RoomItem>): Promise<RoomItem> => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
      
      if (!response.ok) {
        throw new Error(`Error updating room: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating room with id ${id}:`, error);
      throw error;
    }
  },
  
  deleteRoom: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting room: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting room with id ${id}:`, error);
      throw error;
    }
  },
  
  // Additional methods for specific filtering
  
  // Get rooms by floor
  getRoomsByFloor: async (floor: string): Promise<RoomItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/floor/${floor}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching rooms from floor ${floor}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching rooms from floor ${floor}:`, error);
      throw error;
    }
  },
  
  // Get rooms by status
  getRoomsByStatus: async (status: string): Promise<RoomItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/status/${status}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching rooms with status ${status}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching rooms with status ${status}:`, error);
      throw error;
    }
  },
  
  // Get rooms by type
  getRoomsByType: async (type: string): Promise<RoomItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/type/${type}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching rooms of type ${type}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching rooms of type ${type}:`, error);
      throw error;
    }
  },
  
  // Upload room image
  uploadRoomImage: async (roomId: number, imageFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch(`${API_BASE_URL}/${roomId}/image`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error uploading room image: ${response.status}`);
      }
      
      return await response.text(); // Assuming the response is the image URL
    } catch (error) {
      console.error(`Error uploading image for room ${roomId}:`, error);
      throw error;
    }
  }
};