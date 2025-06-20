import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Car, 
  Download, 
  Filter, 
  ArrowLeft, 
  Check, 
  Printer, 
  Calendar,
  Search,
  Clock,
  FileJson,
  FileSpreadsheet as FileCsv, 
  FileText as FilePdf,
  X
} from "lucide-react";

// Types for vehicle renting based on database schema
interface VehicleRental {
  rental_id: number;
  user_id: number;
  user_name: string; // For display purposes - would be joined from users table
  vehicle_id: number;
  vehicle_number: string; // For display purposes - would be joined from vehicles table
  vehicle_type: string; // For display purposes - would be joined from vehicles table
  vehicle_image: string; // For display purposes - would be joined from vehicles table
  start_date: string;
  end_date: string;
  price: number;
  created_at: string;
  status: 'reserved' | 'active' | 'completed' | 'cancelled'; // Added for UI - derived from dates
}

// Dummy data
const dummyRentals: VehicleRental[] = [
  {
    rental_id: 2001,
    user_id: 301,
    user_name: "Alice Green",    vehicle_id: 101,
    vehicle_number: "ABC-1234",
    vehicle_type: "Sedan",
    vehicle_image: "/src/assets/images/cars.png", 
    start_date: "2025-06-18T09:00:00",
    end_date: "2025-06-18T17:00:00",
    price: 120.0,
    created_at: "2025-06-17T14:30:00",
    status: "completed"
  },
  {
    rental_id: 2002,
    user_id: 302,
    user_name: "Bob White",    vehicle_id: 102,
    vehicle_number: "XYZ-5678",
    vehicle_type: "SUV",
    vehicle_image: "/src/assets/images/dashboard_car.jpg",
    start_date: "2025-06-19T10:00:00",
    end_date: "2025-06-19T15:00:00",
    price: 150.0,
    created_at: "2025-06-18T09:15:00",
    status: "active"
  },
  {
    rental_id: 2003,
    user_id: 303,
    user_name: "Charlie Black",    vehicle_id: 103,
    vehicle_number: "LMN-9012",
    vehicle_type: "Van",
    vehicle_image: "/src/assets/images/dashboard_car2.avif",
    start_date: "2025-06-20T08:00:00",
    end_date: "2025-06-20T20:00:00",
    price: 200.0,
    created_at: "2025-06-19T16:45:00",
    status: "reserved"
  },
  {
    rental_id: 2004,
    user_id: 304,
    user_name: "Diana Blue",    vehicle_id: 104,
    vehicle_number: "JKL-3456",
    vehicle_type: "Convertible",
    vehicle_image: "/src/assets/images/tripGlobe.png",
    start_date: "2025-06-17T12:00:00",
    end_date: "2025-06-17T18:00:00",
    price: 180.0,
    created_at: "2025-06-16T11:20:00",
    status: "cancelled"
  }
];

// Component for Rental Details View
const RentalDetailsView: React.FC<{ 
  rental: VehicleRental | null; 
  onBack: () => void; 
  onPrintReceipt: (rental: VehicleRental) => void;
  updateRentalStatus: (rentalId: number, newStatus: 'reserved' | 'active' | 'completed' | 'cancelled') => void;
}> = ({ rental, onBack, onPrintReceipt, updateRentalStatus }) => {
  if (!rental) return null;
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Rental Details</h3>
        <button
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Rentals
        </button>
      </div>
        <div className="bg-indigo-50 rounded-lg p-4 mb-6 border border-indigo-100">
        {/* Vehicle Image */}
        <div className="mb-4 flex justify-center">
          <div className="w-40 h-32 rounded-md overflow-hidden border border-indigo-200 shadow-sm">
            <img 
              src={rental.vehicle_image} 
              alt={rental.vehicle_type}
              onError={(e) => {
                // Fallback to a car icon if image fails to load
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = "/src/assets/images/cars.png";
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Rental ID</p>
            <p className="font-medium text-gray-800">{rental.rental_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              rental.status === 'reserved' ? 'bg-blue-100 text-blue-800' :
              rental.status === 'active' ? 'bg-indigo-100 text-indigo-800' :
              rental.status === 'completed' ? 'bg-green-100 text-green-800' :
              rental.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
            </span>
          </div>
          <div>            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium text-gray-800">{rental.user_name}</p>
          </div>          <div>
            <p className="text-sm text-gray-500">Vehicle ID</p>
            <p className="font-medium text-gray-800">{rental.vehicle_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Vehicle Type</p>
            <p className="font-medium text-gray-800">{rental.vehicle_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Vehicle Number</p>
            <p className="font-medium text-gray-800">{rental.vehicle_number}</p>
          </div>
          <div>            <p className="text-sm text-gray-500">Total Price</p>
            <p className="font-medium text-gray-800">LKR {rental.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Start Date & Time</p>
            <p className="font-medium text-gray-800">
              {new Date(rental.start_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} at {new Date(rental.start_date).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">End Date & Time</p>
            <p className="font-medium text-gray-800">
              {new Date(rental.end_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} at {new Date(rental.end_date).toLocaleTimeString()}
            </p>          </div>
          <div>
            <p className="text-sm text-gray-500">Booking Created On</p>
            <p className="font-medium text-gray-800">
              {new Date(rental.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} at {new Date(rental.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
        {/* Additional vehicle information could be added here */}
      
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {
            if (!rental) return;
            
            // Determine the next status in the sequence
            const newStatus = 
              rental.status === 'reserved' ? 'active' : 
              rental.status === 'active' ? 'completed' : 
              rental.status === 'completed' ? 'completed' : 'reserved';
            
            // Call the update function
            updateRentalStatus(rental.rental_id, newStatus);
            
            // Show confirmation
            alert(`Rental status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
          }}
          title="Update rental status"
        >
          <Check className="w-4 h-4 mr-2" />
          Update Status
        </button><button
          className="px-4 py-2 border border-indigo-600 text-indigo-600 bg-white rounded-md hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {
            if (rental) {
              // Handle printing the receipt for this rental
              onPrintReceipt(rental);
            }
          }}
          title="Print receipt for this rental"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Receipt
        </button>
      </div>
    </div>
  );
};

// Component for Print Receipt View
const PrintReceiptView: React.FC<{ rental: VehicleRental | null; onBack: () => void }> = ({ rental, onBack }) => {
  if (!rental) return null;
  
  const handlePrint = () => {
    window.print();
  };
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 animate-fadeIn">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h3 className="text-xl font-semibold text-gray-800">Print Receipt</h3>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Back
          </button>
        </div>
      </div>
      
      {/* Receipt Content - This part will be printed */}
      <div className="max-w-2xl mx-auto border border-gray-200 p-6 receipt-content">        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">HMS Vehicle Rental</h2>
          <p className="text-gray-600">123 Rental Avenue, Colombo</p>
          <p className="text-gray-600">Tel: +94 11 234 5678</p>
          
          {/* Vehicle Image in Receipt */}
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-24 rounded-md overflow-hidden border border-gray-200">
              <img 
                src={rental.vehicle_image} 
                alt={rental.vehicle_type}
                onError={(e) => {
                  // Fallback to a car icon if image fails to load
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = "/src/assets/images/cars.png";
                }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Receipt No:</span>
            <span className="font-medium">R-{rental.rental_id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Start Date:</span>
            <span>
              {new Date(rental.start_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} at {new Date(rental.start_date).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">End Date:</span>
            <span>
              {new Date(rental.end_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} at {new Date(rental.end_date).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer:</span>
            <span>{rental.user_name}</span>
          </div>
        </div>
        
        <table className="w-full text-left mb-6">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Service</th>
              <th className="py-2">Duration</th>
              <th className="py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">
                <div className="font-medium">{rental.vehicle_type} Rental</div>
                <div className="text-sm text-gray-600">Vehicle: {rental.vehicle_number}</div>
              </td>
              <td className="py-3">
                {Math.round((new Date(rental.end_date).getTime() - new Date(rental.start_date).getTime()) / (1000 * 60 * 60))} hours
              </td>
              <td className="py-3 text-right">LKR {rental.price.toLocaleString()}</td>
            </tr>            {/* Only vehicle information is shown */}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 font-medium">
              <td colSpan={2} className="py-3">Total</td>              <td className="py-3 text-right">LKR {rental.price.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <p className="text-center text-sm text-gray-600 mb-2">Thank you for choosing our services!</p>
          <p className="text-center text-sm text-gray-600">For cancellations, please contact us at least 24 hours in advance.</p>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>This is a computer-generated receipt.</p>
          <p>No signature required.</p>
        </div>
      </div>
    </div>
  );
};

// Component for Export View
const ExportView: React.FC<{ rentals: VehicleRental[]; onBack: () => void }> = ({ rentals, onBack }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
    const handleExport = () => {
    // Implementation of export functionality
    try {
      if (exportFormat === 'csv') {
        // Create CSV content
        let csvContent = "data:text/csv;charset=utf-8,";
        
        // Add headers
        csvContent += "Rental ID,User Name,Vehicle ID,Vehicle Number,Vehicle Type,Start Date,End Date,Price,Status\n";
        
        // Add data rows
        rentals.forEach(rental => {
          csvContent += `${rental.rental_id},`;
          csvContent += `"${rental.user_name}",`;
          csvContent += `${rental.vehicle_id},`;
          csvContent += `"${rental.vehicle_number}",`;
          csvContent += `"${rental.vehicle_type}",`;
          csvContent += `"${new Date(rental.start_date).toLocaleString()}",`;
          csvContent += `"${new Date(rental.end_date).toLocaleString()}",`;
          csvContent += `${rental.price},`;
          csvContent += `"${rental.status}"\n`;
        });
        
        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `vehicle_rentals_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        document.body.removeChild(link);
      } else if (exportFormat === 'json') {
        // Create JSON data
        const jsonData = JSON.stringify(rentals, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `vehicle_rentals_export_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else if (exportFormat === 'pdf') {
        // Alert for PDF since it would require a PDF library
        alert('PDF export functionality would require a PDF generation library like jsPDF. Implementation would be added in production.');
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("An error occurred during export. Please try again.");
    }
  };
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Export Rentals</h3>
        <button
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Rentals
        </button>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 mb-6">
        <p className="text-gray-700">You are about to export {rentals.length} vehicle rental records. Please select your preferred export format.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'csv' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
          onClick={() => setExportFormat('csv')}
        >
          <FileCsv className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <h4 className="font-medium text-gray-800 mb-1">CSV</h4>
          <p className="text-sm text-gray-600">Export as spreadsheet format</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'json' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
          onClick={() => setExportFormat('json')}
        >
          <FileJson className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <h4 className="font-medium text-gray-800 mb-1">JSON</h4>
          <p className="text-sm text-gray-600">Export as data format</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'pdf' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
          onClick={() => setExportFormat('pdf')}
        >
          <FilePdf className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <h4 className="font-medium text-gray-800 mb-1">PDF</h4>
          <p className="text-sm text-gray-600">Export as document format</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Preview</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rental ID</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Vehicle ID</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Vehicle</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rentals.slice(0, 5).map(rental => (
                <tr key={rental.rental_id} className="text-sm">                  <td className="px-3 py-2">{rental.rental_id}</td>
                  <td className="px-3 py-2">{rental.user_name}</td>
                  <td className="px-3 py-2">{rental.vehicle_id}</td>
                  <td className="px-3 py-2">{rental.vehicle_number}</td>
                  <td className="px-3 py-2">{new Date(rental.created_at).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      rental.status === 'reserved' ? 'bg-blue-100 text-blue-800' :
                      rental.status === 'active' ? 'bg-indigo-100 text-indigo-800' :
                      rental.status === 'completed' ? 'bg-green-100 text-green-800' :
                      rental.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {rental.status}
                    </span>
                  </td>
                </tr>
              ))}
              {rentals.length > 5 && (
                <tr>
                  <td colSpan={6} className="px-3 py-2 text-center text-sm text-gray-500">
                    + {rentals.length - 5} more records...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={handleExport}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export as {exportFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

const VehicleRentingHistory: React.FC = () => {  
  // Animation classes are applied directly in the component HTML
  const [rentals, setRentals] = useState<VehicleRental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<VehicleRental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeView, setActiveView] = useState<'list' | 'details' | 'export' | 'print' | 'advancedFilter'>('list');
  const [selectedRental, setSelectedRental] = useState<VehicleRental | null>(null);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  
  // Advanced filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate API fetch with a delay
    setTimeout(() => {
      setRentals(dummyRentals);
      setFilteredRentals(dummyRentals);
      setIsLoading(false);
    }, 600);
  }, []);
  useEffect(() => {
    let result = rentals;
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(r => r.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r =>
        r.rental_id.toString().includes(term) ||
        r.user_name.toLowerCase().includes(term) ||
        r.vehicle_number.toLowerCase().includes(term)
      );
    }
    
    // Filter for today's rentals only
    if (showTodayOnly) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      result = result.filter((rental) => {
        const rentalDate = new Date(rental.start_date);
        rentalDate.setHours(0, 0, 0, 0);
        return rentalDate.getTime() === today.getTime();
      });
    }
    
    // Apply advanced filters
    result = result.filter((rental) => {
      // Price range filter
      if (rental.price < priceRange[0] || rental.price > priceRange[1]) {
        return false;
      }
      
      // Date range filter
      const rentalDate = new Date(rental.start_date);
      const startFilterDate = new Date(dateRange.start);
      const endFilterDate = new Date(dateRange.end);
      
      if (rentalDate < startFilterDate || rentalDate > endFilterDate) {
        return false;
      }
      
      // Vehicle type filter
      if (vehicleTypeFilter !== "all" && rental.vehicle_type !== vehicleTypeFilter) {
        return false;
      }
      
      return true;
    });
    
    setFilteredRentals(result);
  }, [rentals, statusFilter, searchTerm, showTodayOnly, priceRange, dateRange, vehicleTypeFilter]);

  const handleViewDetails = (rental: VehicleRental) => {
    setSelectedRental(rental);
    setActiveView('details');
  };
  
  const handlePrintReceipt = (rental: VehicleRental) => {
    setSelectedRental(rental);
    setActiveView('print');
  };
  
  const handleExport = () => setActiveView('export');
  
  const handleToggleTodayOnly = () => {
    setShowTodayOnly(!showTodayOnly);
  };
    const handleBackToList = () => {
    setActiveView('list');
    setSelectedRental(null);
  };
  
  const updateRentalStatus = (rentalId: number, newStatus: 'reserved' | 'active' | 'completed' | 'cancelled') => {
    // In a real app, we would call an API to update the status
    // For this example, we'll update it in our local state
    
    // Create updated rental object
    const updatedRental = rentals.find(r => r.rental_id === rentalId);
    
    if (updatedRental) {
      const updatedRentalWithStatus = { ...updatedRental, status: newStatus };
      
      // Update rentals array
      setRentals(prev => prev.map(r => r.rental_id === rentalId ? updatedRentalWithStatus : r));
      
      // Update filtered rentals array
      setFilteredRentals(prev => prev.map(r => r.rental_id === rentalId ? updatedRentalWithStatus : r));
      
      // Update selected rental if it's the one being modified
      if (selectedRental && selectedRental.rental_id === rentalId) {
        setSelectedRental(updatedRentalWithStatus);
      }
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "reserved": return "bg-indigo-100 text-indigo-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };  return (    <div className="min-h-screen bg-no-repeat bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: 'url("/src/assets/images/dashboard_car.jpg")',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(245, 250, 255, 0.92)'
      }}>
      <div className="max-w-7xl mx-auto px-4 py-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-normal text-gray-700">Welcome, Admin</h1>
            <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center space-x-6">
            {/* Notification Icon */}
            <div className="relative">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Notifications"
                title="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            {/* Profile Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src="/src/assets/images/profile_image.jpeg"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>        {/* Dashboard Header - Enhanced styling */}
        <div className="rounded-t-2xl p-6 mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md relative overflow-hidden">
          {/* Vehicle icon pattern overlay */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
            <Car className="w-full h-full" />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-sm flex items-center">
                <Car className="h-6 w-6 mr-2" />
                Vehicle Renting History
              </h2>              <p className="text-white text-opacity-95 mt-1 max-w-xl">
                View and manage all vehicle rentals
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-start space-x-2">              <button
                onClick={handleExport}
                className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-all shadow-sm flex items-center"
                title="Export rental records as CSV, JSON or PDF"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Records
              </button><button
                className="px-4 py-2 border border-white text-white rounded-md hover:bg-white/20 transition-all flex items-center"
                onClick={() => setActiveView('advancedFilter')}
                title="Apply advanced filters like price range, date range, and vehicle type"
              >
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filter
              </button>
            </div>
          </div>
          
          {/* Quick Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'all' 
                  ? 'bg-white text-indigo-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              All Rentals
            </button>
            <button 
              onClick={() => setStatusFilter('reserved')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'reserved' 
                  ? 'bg-white text-indigo-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Reserved
            </button>
            <button 
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'active' 
                  ? 'bg-white text-blue-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'completed' 
                  ? 'bg-white text-green-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Completed
            </button>            <button 
              onClick={() => setStatusFilter('cancelled')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'cancelled' 
                  ? 'bg-white text-red-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Cancelled
            </button>
            <button 
              onClick={handleToggleTodayOnly}
              className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center ${
                showTodayOnly
                  ? 'bg-white text-indigo-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Today Only
            </button>
          </div>
        </div>        {activeView === 'list' && (
          <>            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by rental ID, customer, or vehicle..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-indigo-600">{filteredRentals.length}</span> {filteredRentals.length === 1 ? 'rental' : 'rentals'}
                  {showTodayOnly && <span> from today</span>}
                  {statusFilter !== 'all' && <span> with status <span className="font-medium">{statusFilter}</span></span>}
                </p>
                {(showTodayOnly || statusFilter !== 'all' || searchTerm) && (
                  <button 
                    onClick={() => {
                      setShowTodayOnly(false);
                      setStatusFilter('all');
                      setSearchTerm('');
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Rental Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
                <p className="text-sm text-indigo-600 font-medium mb-1">Total Rentals</p>
                <p className="text-2xl font-bold text-indigo-900">{rentals.length}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
                <p className="text-sm text-indigo-600 font-medium mb-1">Active Rentals</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {rentals.filter(r => r.status === 'active').length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
                <p className="text-sm text-indigo-600 font-medium mb-1">Reserved</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {rentals.filter(r => r.status === 'reserved').length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
                <p className="text-sm text-indigo-600 font-medium mb-1">Total Revenue</p>                <p className="text-2xl font-bold text-indigo-900">
                  LKR {rentals.reduce((sum, r) => sum + r.price, 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Rental List */}            
            {isLoading ? (
              <div className="bg-white p-8 rounded-lg shadow text-center transition-all duration-300 ease-in-out">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                <p className="text-indigo-600 text-lg font-medium mt-4">Loading rental data...</p>
                <p className="text-sm text-gray-500 mt-2">This won't take long...</p>
              </div>
            ) : filteredRentals.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No rentals found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRentals.map(rental => (
                  <div 
                    key={rental.rental_id} 
                    className="bg-white rounded-lg shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(rental.status)}`}>
                            {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">Rental #{rental.rental_id}</span>
                        </div>                        
                        <div className="text-lg font-semibold text-indigo-700">
                          LKR {rental.price.toLocaleString()}
                        </div>
                      </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">                        <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-indigo-100">
                          <img 
                            src={rental.vehicle_image} 
                            alt={rental.vehicle_type}
                            onError={(e) => {
                              // Fallback to a car icon if image fails to load
                              (e.target as HTMLImageElement).onerror = null;
                              (e.target as HTMLImageElement).src = "/src/assets/images/cars.png";
                              // Add a small delay to allow the new image to load
                              setTimeout(() => {
                                (e.target as HTMLElement).classList.add('fallback-image');
                              }, 100);
                            }}
                            className="w-full h-full object-cover transition-all duration-300"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <Car className="h-5 w-5 text-indigo-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">{rental.vehicle_type} - {rental.vehicle_number}</h3>
                          </div>
                          <p className="text-gray-600">Customer: {rental.user_name}</p>
                        </div>
                        
                        <div className="flex-none">
                          <div className="text-sm text-gray-500 mb-1">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            {new Date(rental.start_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {new Date(rental.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                            {new Date(rental.end_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handlePrintReceipt(rental)}
                          className="px-3 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors text-sm flex items-center"
                          title="Print receipt for this rental"
                        >
                          <Printer className="w-4 h-4 mr-1" />
                          Print Receipt
                        </button>
                        <button
                          onClick={() => handleViewDetails(rental)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm flex items-center"
                          title="View complete rental details"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {/* Details View */}        
        {/* Rental Details View */}          {activeView === 'details' && selectedRental && (
          <RentalDetailsView 
            rental={selectedRental} 
            onBack={handleBackToList} 
            onPrintReceipt={handlePrintReceipt}
            updateRentalStatus={updateRentalStatus}
          />
        )}
        
        {/* Print Receipt View */}
        {activeView === 'print' && selectedRental && (
          <PrintReceiptView rental={selectedRental} onBack={handleBackToList} />
        )}
          {/* Export View */}
        {activeView === 'export' && (
          <ExportView rentals={filteredRentals} onBack={handleBackToList} />
        )}
        
        {/* Advanced Filter View */}
        {activeView === 'advancedFilter' && (
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 animate-fadeIn">            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Advanced Filters</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setDateRange({
                      start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
                      end: new Date().toISOString().split('T')[0]
                    });
                    setVehicleTypeFilter("all");
                  }}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                  title="Reset all filters to default values"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reset
                </button>
                <button
                  onClick={handleBackToList}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Rentals
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range Filter */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-indigo-800 mb-3">Price Range</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>LKR {priceRange[0]}</span>
                    <span>LKR {priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-indigo-600"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-24 p-1 border border-gray-300 rounded"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="w-24 p-1 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              {/* Date Range Filter */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-indigo-800 mb-3">Date Range</h4>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              {/* Vehicle Type Filter */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-indigo-800 mb-3">Vehicle Type</h4>
                <select
                  value={vehicleTypeFilter}
                  onChange={(e) => setVehicleTypeFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="all">All Vehicle Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                  <option value="Convertible">Convertible</option>
                </select>
              </div>
              
              {/* Reset Filters */}
              <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setDateRange({
                      start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
                      end: new Date().toISOString().split('T')[0]
                    });
                    setVehicleTypeFilter("all");
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleBackToList}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
      </div>
      {/* Footer */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6 flex justify-between items-center mt-8 rounded-b-lg -mb-11">
          <div className="flex items-center flex-1">
            <div className="flex items-center">
              <span className="text-gray-600 text-sm mr-2">© 2025 HMS - NovaSynergy</span>
              <span className="text-xs px-2 py-0.5 bg-[#6B72D6]/20 text-[#6B72D6] rounded-full">v2.1.0</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-indigo-700 text-lg font-medium mr-2">
              Total Revenue:
            </span>            <span className="font-semibold text-indigo-700 text-lg">
              LKR {rentals.reduce((sum, r) => sum + r.price, 0).toLocaleString()}
            </span>
          </div>
        </div>
    </div>
  );
};

export default VehicleRentingHistory;
