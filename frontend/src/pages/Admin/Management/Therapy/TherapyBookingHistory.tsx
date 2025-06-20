import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Search, 
  Calendar, 
  Filter, 
  FileText,
  Check,
  Clock,
  X,
  User,
  ChevronDown,
  ArrowLeft,
  Printer,
  Download,
  FileJson,
  FileSpreadsheet as FileCsv, 
  FileText as FilePdf,
  Info,
  Leaf as Spa,
  CheckCircle
} from "lucide-react";

// Types based on the therapy bookings schema
interface TherapyBooking {
  booking_id: number;
  user_id: number;
  user_name: string;
  therapy_id: number;
  therapy_name: string;
  therapy_type: string;
  booking_date: string;
  booking_time: string;
  duration: number; // in minutes
  price: number;
  therapist_name: string | null;
  room_number: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes: string | null;
  special_requests: string | null;
}

// Dummy data for therapy bookings
const dummyBookings: TherapyBooking[] = [
  {
    booking_id: 5001,
    user_id: 101,
    user_name: "Jane Smith",
    therapy_id: 12,
    therapy_name: "Deep Tissue Massage",
    therapy_type: "Massage Therapy",
    booking_date: "2025-06-19",
    booking_time: "10:00",
    duration: 60,
    price: 8500,
    therapist_name: "Michael Chen",
    room_number: "Spa Room 3",
    status: "completed",
    notes: "Regular client, prefers extra focus on shoulders",
    special_requests: "Aromatherapy add-on"
  },
  {
    booking_id: 5002,
    user_id: 102,
    user_name: "Robert Johnson",
    therapy_id: 8,
    therapy_name: "Hot Stone Therapy",
    therapy_type: "Massage Therapy",
    booking_date: "2025-06-20",
    booking_time: "14:30",
    duration: 90,
    price: 12000,
    therapist_name: "Sarah Williams",
    room_number: "Spa Room 1",
    status: "confirmed",
    notes: null,
    special_requests: "Temperature sensitivity, please test stones first"
  },
  {
    booking_id: 5003,
    user_id: 103,
    user_name: "Emily Davis",
    therapy_id: 5,
    therapy_name: "Aromatherapy Session",
    therapy_type: "Aromatherapy",
    booking_date: "2025-06-20",
    booking_time: "16:00",
    duration: 45,
    price: 7500,
    therapist_name: "David Kumar",
    room_number: "Wellness Suite 2",
    status: "pending",
    notes: "First-time client",
    special_requests: "No lavender oil due to allergies"
  },
  {
    booking_id: 5004,
    user_id: 104,
    user_name: "Michael Brown",
    therapy_id: 15,
    therapy_name: "Swedish Massage",
    therapy_type: "Massage Therapy",
    booking_date: "2025-06-18",
    booking_time: "11:00",
    duration: 60,
    price: 7500,
    therapist_name: "Jennifer Lopez",
    room_number: "Spa Room 2",
    status: "cancelled",
    notes: "Cancellation due to illness",
    special_requests: null
  },
  {
    booking_id: 5005,
    user_id: 105,
    user_name: "Sarah Thompson",
    therapy_id: 3,
    therapy_name: "Reflexology",
    therapy_type: "Alternative Therapy",
    booking_date: "2025-06-21",
    booking_time: "09:15",
    duration: 45,
    price: 6500,
    therapist_name: "Thomas Lee",
    room_number: "Therapy Room 4",
    status: "confirmed",
    notes: null,
    special_requests: "Foot sensitivity on left foot"
  },
  {
    booking_id: 5006,
    user_id: 106,
    user_name: "David Wilson",
    therapy_id: 7,
    therapy_name: "Ayurvedic Massage",
    therapy_type: "Holistic Therapy",
    booking_date: "2025-06-17",
    booking_time: "13:00",
    duration: 75,
    price: 9500,
    therapist_name: "Priya Sharma",
    room_number: "Wellness Suite 1",
    status: "no-show",
    notes: "Client didn't arrive for appointment",
    special_requests: "Wanted specific oil blend"
  },
  {
    booking_id: 5007,
    user_id: 107,
    user_name: "Lisa Martinez",
    therapy_id: 10,
    therapy_name: "Facial Treatment",
    therapy_type: "Facial Therapy",
    booking_date: "2025-06-20",
    booking_time: "12:00",
    duration: 60,
    price: 9000,
    therapist_name: "Grace Kim",
    room_number: "Beauty Suite 2",
    status: "pending",
    notes: "Sensitive skin, use hypoallergenic products",
    special_requests: null
  }
];

// Component for Booking Details View
const BookingDetailsView: React.FC<{ booking: TherapyBooking | null; onBack: () => void }> = ({ booking, onBack }) => {
  if (!booking) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
        <button
          onClick={onBack}
          className="text-teal-600 hover:text-teal-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Bookings
        </button>
      </div>
      
      <div className="bg-teal-50 rounded-lg p-4 mb-6 border border-teal-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="font-medium text-gray-800">{booking.booking_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              booking.status === 'pending' ? 'bg-blue-100 text-blue-800' :
              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              booking.status === 'completed' ? 'bg-teal-100 text-teal-800' :
              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              booking.status === 'no-show' ? 'bg-amber-100 text-amber-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium text-gray-800">{booking.user_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Therapy Type</p>
            <p className="font-medium text-gray-800">{booking.therapy_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Therapy Name</p>
            <p className="font-medium text-gray-800">{booking.therapy_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium text-gray-800">LKR {booking.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-medium text-gray-800">
              {new Date(booking.booking_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} at {booking.booking_time}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium text-gray-800">{booking.duration} minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Therapist</p>
            <p className="font-medium text-gray-800">{booking.therapist_name || 'Not assigned'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room</p>
            <p className="font-medium text-gray-800">{booking.room_number || 'Not assigned'}</p>
          </div>
        </div>
        
        {(booking.notes || booking.special_requests) && (
          <div className="mt-4 pt-4 border-t border-teal-100">
            {booking.notes && (
              <div className="mb-3">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium text-gray-800">{booking.notes}</p>
              </div>
            )}
            {booking.special_requests && (
              <div>
                <p className="text-sm text-gray-500">Special Requests</p>
                <p className="font-medium text-gray-800">{booking.special_requests}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {alert('Status updated!')}}
          title="Update booking status"
        >
          <Check className="w-4 h-4 mr-2" />
          Update Status
        </button>
        <button
          className="px-4 py-2 border border-teal-600 text-teal-600 bg-white rounded-md hover:bg-teal-50 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {alert('Receipt printed!')}}
          title="Print receipt for this booking"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Receipt
        </button>
      </div>
    </div>
  );
};

// Component for Print Receipt View
const PrintReceiptView: React.FC<{ booking: TherapyBooking | null; onBack: () => void }> = ({ booking, onBack }) => {
  if (!booking) return null;
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h3 className="text-xl font-semibold text-gray-800">Print Receipt</h3>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center"
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
      <div className="max-w-2xl mx-auto border border-gray-200 p-6 receipt-content">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">HMS Therapy Center</h2>
          <p className="text-gray-600">123 Wellness Avenue, Colombo</p>
          <p className="text-gray-600">Tel: +94 11 234 5678</p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Receipt No:</span>
            <span className="font-medium">R-{booking.booking_id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span>
              {new Date(booking.booking_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Time:</span>
            <span>{booking.booking_time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Client:</span>
            <span>{booking.user_name}</span>
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
                <div className="font-medium">{booking.therapy_name}</div>
                <div className="text-sm text-gray-600">{booking.therapy_type}</div>
              </td>
              <td className="py-3">{booking.duration} minutes</td>
              <td className="py-3 text-right">LKR {booking.price.toLocaleString()}</td>
            </tr>
            {booking.special_requests && (
              <tr>
                <td className="py-3">
                  <div className="font-medium">Special Request</div>
                  <div className="text-sm text-gray-600">{booking.special_requests}</div>
                </td>
                <td className="py-3">-</td>
                <td className="py-3 text-right">LKR 0.00</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 font-medium">
              <td colSpan={2} className="py-3">Total</td>
              <td className="py-3 text-right">LKR {booking.price.toLocaleString()}</td>
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
const ExportView: React.FC<{ bookings: TherapyBooking[]; onBack: () => void }> = ({ bookings, onBack }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  
  const handleExport = () => {
    // In a real application, this would implement actual export functionality
    alert(`Exporting ${bookings.length} bookings as ${exportFormat.toUpperCase()}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Export Bookings</h3>
        <button
          onClick={onBack}
          className="text-teal-600 hover:text-teal-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Bookings
        </button>
      </div>
      
      <div className="bg-teal-50 rounded-lg p-4 mb-6">
        <p className="text-gray-700">You are about to export {bookings.length} therapy booking records. Please select your preferred export format.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'csv' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}
          onClick={() => setExportFormat('csv')}
        >
          <FileCsv className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <h4 className="font-medium text-gray-800 mb-1">CSV</h4>
          <p className="text-sm text-gray-600">Export as spreadsheet format</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'json' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}
          onClick={() => setExportFormat('json')}
        >
          <FileJson className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <h4 className="font-medium text-gray-800 mb-1">JSON</h4>
          <p className="text-sm text-gray-600">Export as data format</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'pdf' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}
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
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Client</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Service</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.slice(0, 3).map(booking => (
                <tr key={booking.booking_id}>
                  <td className="py-2 px-3 text-sm text-gray-800">{booking.booking_id}</td>
                  <td className="py-2 px-3 text-sm text-gray-800">{booking.user_name}</td>
                  <td className="py-2 px-3 text-sm text-gray-800">{booking.therapy_name}</td>
                  <td className="py-2 px-3 text-sm text-gray-800">
                    {new Date(booking.booking_date).toLocaleDateString()} {booking.booking_time}
                  </td>
                  <td className="py-2 px-3">                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'completed' ? 'bg-teal-100 text-teal-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      booking.status === 'no-show' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
              {bookings.length > 3 && (
                <tr>
                  <td colSpan={5} className="py-2 px-3 text-sm text-gray-500 text-center">
                    ... and {bookings.length - 3} more records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export as {exportFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

const TherapyBookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<TherapyBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<TherapyBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'details' | 'print' | 'export'>('list');
  const [selectedBooking, setSelectedBooking] = useState<TherapyBooking | null>(null);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [therapyTypeFilter, setTherapyTypeFilter] = useState<string>("all");

  // Get unique therapy types for filter dropdown
  const therapyTypes = [...new Set(dummyBookings.map(booking => booking.therapy_type))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(dummyBookings);
      setFilteredBookings(dummyBookings);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle view switching
  const handleViewDetails = (booking: TherapyBooking) => {
    setSelectedBooking(booking);
    setActiveView('details');
  };
  
  const handlePrintReceipt = (booking: TherapyBooking) => {
    setSelectedBooking(booking);
    setActiveView('print');
  };
  
  const handleExport = () => {
    setActiveView('export');
  };
  
  const handleToggleTodayOnly = () => {
    setShowTodayOnly(!showTodayOnly);
  };
  
  const handleBackToList = () => {
    setActiveView('list');
    setSelectedBooking(null);
  };
  
  useEffect(() => {
    let result = bookings;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    // Filter by therapy type
    if (therapyTypeFilter !== "all") {
      result = result.filter((booking) => booking.therapy_type === therapyTypeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.booking_id.toString().includes(term) ||
          booking.user_name.toLowerCase().includes(term) ||
          booking.therapy_name.toLowerCase().includes(term) ||
          (booking.therapist_name && booking.therapist_name.toLowerCase().includes(term))
      );
    }
    
    // Filter for today's bookings only
    if (showTodayOnly) {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD
      
      result = result.filter((booking) => booking.booking_date === todayString);
    }

    setFilteredBookings(result);
  }, [bookings, statusFilter, searchTerm, showTodayOnly, therapyTypeFilter]);

  const handleStatusChange = (bookingId: number, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show') => {
    // In a real app, this would make an API call
    setBookings(bookings.map(booking => 
      booking.booking_id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const toggleBookingExpand = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  // Format price with thousand separator and LKR symbol
  const formatPrice = (price: number): string => {
    return `LKR ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-fixed bg-center" 
      style={{
        backgroundImage: 'url("/src/assets/images/treatment.jpg")',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}>
      <div className="max-w-7xl mx-auto px-4 py-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
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
        </div>          
          {/* Dashboard Header - Enhanced styling */}
        <div className="rounded-t-2xl p-6 mb-6 bg-gradient-to-r from-teal-600 to-teal-400 shadow-md relative overflow-hidden">
          {/* Therapy icon pattern overlay */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 2a1 1 0 011 1v3a1 1 0 01-2 0V7a1 1 0 011-1zm-3.536.464a1 1 0 10-1.414 1.414 6 6 0 018.486 0 1 1 0 00-1.415-1.414 4 4 0 00-5.657 0zM12 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
            </svg>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-sm flex items-center">
                <Spa className="h-6 w-6 mr-2" />
                Therapy Bookings History
              </h2>
              <p className="text-white text-opacity-95 mt-1 max-w-xl">
                View and manage all therapy appointments - track status, process bookings, and generate reports
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-start space-x-2">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-teal-50 transition-all shadow-sm flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Records
              </button>
              <button
                className="px-4 py-2 border border-white text-white rounded-md hover:bg-white/20 transition-all flex items-center"
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
                  ? 'bg-white text-teal-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              All Bookings
            </button>
            <button 
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'pending' 
                  ? 'bg-white text-blue-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setStatusFilter('confirmed')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'confirmed' 
                  ? 'bg-white text-green-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Confirmed
            </button>
            <button 
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                statusFilter === 'completed' 
                  ? 'bg-white text-teal-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={handleToggleTodayOnly}
              className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center ${
                showTodayOnly 
                  ? 'bg-white text-amber-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Calendar className="mr-1 h-3 w-3" />
              Today Only
            </button>
          </div>
        </div>

        {activeView === 'list' && (
          <>            {/* Booking Statistics*/}
            <div className="mb-6 bg-white rounded-lg shadow">
              <div className="bg-teal-600 rounded-t-lg px-6 py-3">
                <h2 className="text-lg font-medium text-white flex items-center">
                  <Spa className="h-5 w-5 mr-2" />
                  Booking Statistics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-l-teal-500 border-y border-r border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Bookings</div>
                      <div className="p-2 bg-teal-50 rounded-md text-teal-600">
                        <FileText size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{bookings.length}</div>
                    <div className="mt-2 text-xs text-gray-500">All time bookings</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-l-green-500 border-y border-r border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confirmed</div>
                      <div className="p-2 bg-green-50 rounded-md text-green-600">
                        <Check size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {bookings.filter(booking => booking.status === 'confirmed').length}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${(bookings.filter(booking => booking.status === 'confirmed').length / bookings.length * 100) || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        {Math.round((bookings.filter(booking => booking.status === 'confirmed').length / bookings.length * 100) || 0)}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-l-blue-500 border-y border-r border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</div>
                      <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                        <Clock size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {bookings.filter(booking => booking.status === 'pending').length}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(bookings.filter(booking => booking.status === 'pending').length / bookings.length * 100) || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        {Math.round((bookings.filter(booking => booking.status === 'pending').length / bookings.length * 100) || 0)}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-l-amber-500 border-y border-r border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Today's Bookings</div>
                      <div className="p-2 bg-amber-50 rounded-md text-amber-600">
                        <Calendar size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">
                      {bookings.filter(booking => 
                        booking.booking_date === new Date().toISOString().split('T')[0]
                      ).length}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                    </div>
                  </div>
                </div>
                
                {/* Additional Stats Row */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-lg shadow text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">Total Revenue</h3>
                        <p className="text-2xl font-bold mt-2">
                          LKR {bookings
                            .filter(b => b.status === 'completed' || b.status === 'confirmed')
                            .reduce((sum, booking) => sum + booking.price, 0)
                            .toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FileText className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="text-xs text-teal-100 mt-4">From confirmed and completed bookings</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Booking Status Distribution</h3>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'confirmed', 'completed', 'cancelled', 'no-show'].map(status => {
                        const count = bookings.filter(b => b.status === status).length;
                        const percentage = Math.round((count / bookings.length) * 100) || 0;
                        return (
                          <div key={status} className="flex-grow min-w-[120px]">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span className="capitalize">{status}</span>
                              <span>{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full ${
                                status === 'pending' ? 'bg-blue-500' :
                                status === 'confirmed' ? 'bg-green-500' :
                                status === 'completed' ? 'bg-teal-500' :
                                status === 'cancelled' ? 'bg-red-500' :
                                'bg-amber-500'
                              }`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Therapy Type Distribution</h3>
                    <div className="space-y-2">
                      {therapyTypes.slice(0, 4).map((type, index) => {
                        const count = bookings.filter(b => b.therapy_type === type).length;
                        const percentage = Math.round((count / bookings.length) * 100) || 0;
                        return (
                          <div key={type} className="flex flex-col">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{type}</span>
                              <span>{count} bookings ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full bg-teal-${500 - index * 100}`} 
                                style={{ 
                                  width: `${percentage}%`, 
                                  backgroundColor: index === 0 ? '#14b8a6' : 
                                                 index === 1 ? '#0d9488' : 
                                                 index === 2 ? '#0f766e' : 
                                                 '#115e59'
                                }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="mb-6 bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="relative w-full md:w-auto mb-4 md:mb-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600">Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no-show">No Show</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600">Type:</span>
                      <select
                        value={therapyTypeFilter}
                        onChange={(e) => setTherapyTypeFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      >
                        <option value="all">All Types</option>
                        {therapyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <button
                      onClick={handleToggleTodayOnly}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                        showTodayOnly 
                          ? 'bg-teal-500 text-white' 
                          : 'border border-gray-300 text-gray-700'
                      }`}
                    >
                      <Calendar size={16} />
                      Today's Bookings
                    </button>
                    
                    <button
                      onClick={handleExport}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-200 transition-colors ml-auto"
                    >
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>
                
                {filteredBookings.length > 0 ? (
                  <div className="text-sm text-gray-600 mt-2">
                    Showing {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'}
                  </div>
                ) : (
                  <div className="text-sm text-amber-600 mt-2 flex items-center">
                    <Info size={16} className="mr-1" />
                    No bookings match your filters. Try adjusting your search criteria.
                  </div>
                )}
              </div>
            </div>
            
            {isLoading ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600">Loading bookings...</p>
              </div>
            ) : (
              <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
                {filteredBookings.length > 0 ? (
                  <div className="overflow-x-auto">                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Booking ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Client
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Service
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBookings.map((booking) => (
                          <React.Fragment key={booking.booking_id}>
                            <tr 
                              className={`hover:bg-gray-50 transition-colors ${expandedBooking === booking.booking_id ? 'bg-teal-50 border-l-4 border-l-teal-500 border-y-0 border-r-0' : ''}`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                #{booking.booking_id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                                    <User className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{booking.user_name}</div>
                                    <div className="text-xs text-gray-500">ID: {booking.user_id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                <div className="font-medium">{booking.therapy_name}</div>
                                <div className="text-xs text-gray-500">{booking.therapy_type}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 text-teal-500 mr-2" />
                                  <div>
                                    <div>{new Date(booking.booking_date).toLocaleDateString('en-US', {
                                      month: 'short', day: 'numeric', year: 'numeric'
                                    })}</div>
                                    <div className="text-xs text-gray-500">
                                      {booking.booking_time} ({booking.duration} mins)
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {formatPrice(booking.price)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  booking.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  booking.status === 'completed' ? 'bg-teal-100 text-teal-800' :
                                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  booking.status === 'no-show' ? 'bg-amber-100 text-amber-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {booking.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                                  {booking.status === 'confirmed' && <Check className="mr-1 h-3 w-3" />}
                                  {booking.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                                  {booking.status === 'cancelled' && <X className="mr-1 h-3 w-3" />}
                                  {booking.status === 'no-show' && <X className="mr-1 h-3 w-3" />}
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleViewDetails(booking)}
                                    className="px-2 py-1 text-xs rounded bg-teal-50 text-teal-600 hover:bg-teal-100"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => toggleBookingExpand(booking.booking_id)}
                                    className="px-2 py-1 text-xs rounded bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center"
                                  >
                                    {expandedBooking === booking.booking_id ? (
                                      <>Hide <ChevronDown className="ml-1 h-3 w-3" /></>
                                    ) : (
                                      <>Details <ChevronDown className="ml-1 h-3 w-3" /></>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handlePrintReceipt(booking)}
                                    className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center"
                                  >
                                    <Printer className="mr-1 h-3 w-3" />
                                    Receipt
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {expandedBooking === booking.booking_id && (
                              <tr className="bg-teal-50 border-l-4 border-l-teal-500 border-y-0 border-r-0">
                                <td colSpan={7} className="px-6 py-4">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <h4 className="font-medium text-teal-600 mb-3 pb-2 border-b flex items-center">
                                        <User className="h-4 w-4 mr-2" />
                                        Therapist & Room
                                      </h4>
                                      <div className="space-y-2">
                                        <div>
                                          <span className="text-xs text-gray-500 block">Assigned Therapist</span>
                                          <span className="text-gray-800 font-medium">{booking.therapist_name || "Not assigned"}</span>
                                        </div>
                                        <div>
                                          <span className="text-xs text-gray-500 block">Room Assignment</span>
                                          <span className="text-gray-800 font-medium">{booking.room_number || "Not assigned"}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <h4 className="font-medium text-teal-600 mb-3 pb-2 border-b flex items-center">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Notes & Requests
                                      </h4>
                                      <div className="space-y-2">
                                        <div>
                                          <span className="text-xs text-gray-500 block">Client Notes</span>
                                          <span className="text-gray-800">{booking.notes || "No notes provided"}</span>
                                        </div>
                                        <div>
                                          <span className="text-xs text-gray-500 block">Special Requests</span>
                                          <span className="text-gray-800">{booking.special_requests || "No special requests"}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <h4 className="font-medium text-teal-600 mb-3 pb-2 border-b flex items-center">
                                        <Check className="h-4 w-4 mr-2" />
                                        Update Status
                                      </h4>
                                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                        <button
                                          onClick={() => handleStatusChange(booking.booking_id, 'pending')}
                                          className={`px-2 py-2 text-xs rounded-md flex flex-col items-center justify-center ${
                                            booking.status === 'pending' 
                                              ? 'bg-blue-500 text-white' 
                                              : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
                                          }`}
                                        >
                                          <Clock className={`h-4 w-4 ${booking.status === 'pending' ? 'text-white' : 'text-blue-500'} mb-1`} />
                                          <span>Pending</span>
                                        </button>
                                        <button
                                          onClick={() => handleStatusChange(booking.booking_id, 'confirmed')}
                                          className={`px-2 py-2 text-xs rounded-md flex flex-col items-center justify-center ${
                                            booking.status === 'confirmed' 
                                              ? 'bg-green-500 text-white' 
                                              : 'bg-white border border-green-200 text-green-700 hover:bg-green-50'
                                          }`}
                                        >
                                          <Check className={`h-4 w-4 ${booking.status === 'confirmed' ? 'text-white' : 'text-green-500'} mb-1`} />
                                          <span>Confirmed</span>
                                        </button>
                                        <button
                                          onClick={() => handleStatusChange(booking.booking_id, 'completed')}
                                          className={`px-2 py-2 text-xs rounded-md flex flex-col items-center justify-center ${
                                            booking.status === 'completed' 
                                              ? 'bg-teal-500 text-white' 
                                              : 'bg-white border border-teal-200 text-teal-700 hover:bg-teal-50'
                                          }`}
                                        >
                                          <CheckCircle className={`h-4 w-4 ${booking.status === 'completed' ? 'text-white' : 'text-teal-500'} mb-1`} />
                                          <span>Completed</span>
                                        </button>
                                        <button
                                          onClick={() => handleStatusChange(booking.booking_id, 'cancelled')}
                                          className={`px-2 py-2 text-xs rounded-md flex flex-col items-center justify-center ${
                                            booking.status === 'cancelled' 
                                              ? 'bg-red-500 text-white' 
                                              : 'bg-white border border-red-200 text-red-700 hover:bg-red-50'
                                          }`}
                                        >
                                          <X className={`h-4 w-4 ${booking.status === 'cancelled' ? 'text-white' : 'text-red-500'} mb-1`} />
                                          <span>Cancelled</span>
                                        </button>
                                        <button
                                          onClick={() => handleStatusChange(booking.booking_id, 'no-show')}
                                          className={`px-2 py-2 text-xs rounded-md flex flex-col items-center justify-center ${
                                            booking.status === 'no-show' 
                                              ? 'bg-amber-500 text-white' 
                                              : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'
                                          }`}
                                        >
                                          <X className={`h-4 w-4 ${booking.status === 'no-show' ? 'text-white' : 'text-amber-500'} mb-1`} />
                                          <span>No Show</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <X className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No bookings found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        
        {activeView === 'details' && (
          <BookingDetailsView 
            booking={selectedBooking} 
            onBack={handleBackToList} 
          />
        )}
        
        {activeView === 'print' && (
          <PrintReceiptView 
            booking={selectedBooking} 
            onBack={handleBackToList} 
          />
        )}
        
        {activeView === 'export' && (
          <ExportView 
            bookings={filteredBookings} 
            onBack={handleBackToList} 
          />
        )}
      </div>
        {/* Footer with gradient background */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-6 flex flex-col md:flex-row justify-between items-center mt-8 rounded-b-lg -mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <span className="text-white text-sm mr-2 font-medium">© 2025 HMS - NovaSynergy</span>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="text-xs px-3 py-1 bg-white/20 text-white rounded-full flex items-center">
              <Spa className="h-3 w-3 mr-1" /> 
              Therapy Module v1.2
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-teal-100">Total Bookings</span>
            <div className="flex items-center">
              <span className="font-semibold text-white text-lg">{bookings.length}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-teal-100">Revenue</span>
            <div className="flex items-center">
              <span className="font-semibold text-white text-lg">
                LKR {bookings
                  .filter(b => b.status === 'completed' || b.status === 'confirmed')
                  .reduce((sum, booking) => sum + booking.price, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyBookingHistory;
