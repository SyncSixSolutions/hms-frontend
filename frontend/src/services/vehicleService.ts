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
  baseURL: 'http://localhost:8765/api/services/vehicle',
});

/**
 * Fetch list of owners
 */
export const getOwners = async (): Promise<Owner[]> => {
  try {
    const response = await apiClient.get('/getOwners');
    console.log('Fetched owners:', response.data);
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

/**
 *  Fetch all vehicles
 */
export interface VehicleResponseDTO {
  vehicle: {
    vehicleId: number;
    vehicleNumber: string;
    passengerCount: number;
    vehicleType: string;
    pricePerKm: number;
    basePrice: number;
    availabilityFrom: string;
    availabilityTo: string;
    description: string;
    ownerId: number;
    createdAt: string;
  };
  availability: {
    slotId: number;
    vehicleId: number;
    availabilityFrom: string;
    availabilityTo: string;
    createdAt: string;
  };
  images: Array<{
    imageId: number;
    vehicleId: number;
    imageUrl: string;
    uploadedAt: string;
  }>;
  owner: {
    ownerId: number;
    vehicleId: number;
    name: string;
    contactNumber: string;
    nic: string;
  };
}

export const getVehiclesByDateRange = async (
  startDate: string,
  endDate: string
): Promise<VehicleResponseDTO[]> => {
  try {
    const response = await apiClient.get('/getVehiclesByDateRange', {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles by date range:', error);
    return [];
  }
};

/**
 * Rent a vehicle
 */
export interface RentVehiclePayload {
  userId: number;
  vehicleId: number;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
}

export const rentVehicle = async (payload: RentVehiclePayload): Promise<boolean> => {
  try {
    const response = await apiClient.post('/rentVehicle', payload);
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error('Error renting vehicle:', error);
    return false;
  }
};