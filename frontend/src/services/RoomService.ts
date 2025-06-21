// services/roomService.ts

const API_BASE_URL = 'http://localhost/8765/api/services/rooms';

export const roomService = {
  /**
   * Add a new room using multipart/form-data.
   * Matches the backend endpoint: POST /api/services/rooms/add
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
};
