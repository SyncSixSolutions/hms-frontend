import axios from 'axios';

// Define types
export interface Owner {
  id: string;
  name: string;
  contactNumber: string;
  nic: string;
}

export interface AddVehiclePayload {
  vehicle: {
    vehicleNumber: string;
    passengerCount: number;
    vehicleType: string;
    pricePerKm: number;
    basePrice: number;
    availabilityFrom: string;
    availabilityTo: string;
    description?: string;
  };
  availability: {
    availabilityFrom: string;
    availabilityTo: string;
  };
  owner: {
    name: string;
    contactNumber: string;
    nic: string;
  };
  images: Array<{
    imageUrl: string;
    uploadedAt: string;
  }>;
}

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8765/api/v1/vehicle',
});

/**
 * Fetch list of owners
 */
export const getOwners = async (): Promise<Owner[]> => {
  try {
    const response = await apiClient.get('/getOwners');
    return response.data;
  } catch (error) {
    console.error('Error fetching owners:', error);
    return [];
  }
};

/**
 * Submit new vehicle data
 */
export const addVehicle = async (payload: AddVehiclePayload): Promise<boolean> => {
  try {
    const response = await apiClient.post('/addVehicle', payload);
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return false;
  }
};