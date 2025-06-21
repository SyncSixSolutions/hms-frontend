export interface ValidationErrors {
  vehicleNumber?: string;
  passengerCount?: string;
  vehicleType?: string;
  pricePerKm?: string;
  basePrice?: string;
  availabilityFrom?: string;
  availabilityTo?: string;
  ownerName?: string;
  contactNumber?: string;
  ownerNIC?: string;
}

export const validateVehicleForm = (formData: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Required field validations
  if (!formData.vehicleNumber.trim()) {
    errors.vehicleNumber = 'Vehicle number is required';
  }

  if (!formData.passengerCount) {
    errors.passengerCount = 'Passenger count is required';
  }

  if (!formData.vehicleType) {
    errors.vehicleType = 'Vehicle type is required';
  }

  if (!formData.pricePerKm.trim()) {
    errors.pricePerKm = 'Price per KM is required';
  } else if (isNaN(parseFloat(formData.pricePerKm)) || parseFloat(formData.pricePerKm) <= 0) {
    errors.pricePerKm = 'Price per KM must be a valid positive number';
  }

  if (!formData.basePrice.trim()) {
    errors.basePrice = 'Base price is required';
  } else if (isNaN(parseFloat(formData.basePrice)) || parseFloat(formData.basePrice) <= 0) {
    errors.basePrice = 'Base price must be a valid positive number';
  }

  if (!formData.ownerName.trim()) {
    errors.ownerName = 'Owner name is required';
  }

  if (!formData.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
    errors.contactNumber = 'Contact number must be 10 digits';
  }

  if (!formData.ownerNIC.trim()) {
    errors.ownerNIC = 'Owner NIC is required';
  }

  // Date validations
  if (!formData.availabilityFrom) {
    errors.availabilityFrom = 'Start date is required';
  }

  if (!formData.availabilityTo) {
    errors.availabilityTo = 'End date is required';
  }

  if (formData.availabilityFrom && formData.availabilityTo) {
    const fromDate = new Date(formData.availabilityFrom);
    const toDate = new Date(formData.availabilityTo);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today) {
      errors.availabilityFrom = 'Start date cannot be in the past';
    }

    if (toDate < fromDate) {
      errors.availabilityTo = 'End date must be after start date';
    }
  }

  return errors;
};
