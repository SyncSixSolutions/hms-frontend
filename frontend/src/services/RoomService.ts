// services/roomService.ts

const API_BASE_URL = 'http://localhost:8765/api/services/rooms';

export interface RoomItem {
  id?: number;
  roomNumber: string;
  roomType: string;
  roomSize: string;
  capacity: number;
  bedType: string;
  pricePerNight: number;
  description?: string;
  imageUrls: string[];
  amenities: { [key: string]: boolean };
  reservationStatus: string;
  roomFloor: string;
}

export const roomService = {
  /**
   * Add a new room using multipart/form-data.
   * Backend: POST /api/services/rooms/add
   */
  addRoom: async (formDataToSend: FormData): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error adding room: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  },

  /**
   * Get all rooms.
   * Backend: GET /api/services/rooms/all
   */
  getAllRooms: async (): Promise<RoomItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching rooms: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  /**
   * Delete a room by Room Number.
   * Backend: DELETE /api/services/rooms/{roomNumber}
   */
  deleteRoom: async (roomNumber: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/delete/${roomNumber}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting room: ${errorText}`);
    }
  },
};
