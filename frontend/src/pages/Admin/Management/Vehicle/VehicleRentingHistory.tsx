import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

// Types for vehicle renting and therapy
interface TherapyDetail {
  therapy_id: number;
  therapy_name: string;
  therapist: string;
  session_time: string;
  notes: string;
}

interface VehicleRental {
  rental_id: number;
  customer_id: number;
  customer_name: string;
  vehicle_number: string;
  vehicle_type: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'reserved' | 'active' | 'completed' | 'cancelled';
  therapy_details: TherapyDetail[];
}

// Dummy data
const dummyRentals: VehicleRental[] = [
  {
    rental_id: 2001,
    customer_id: 301,
    customer_name: "Alice Green",
    vehicle_number: "ABC-1234",
    vehicle_type: "Sedan",
    start_date: "2025-06-18T09:00:00",
    end_date: "2025-06-18T17:00:00",
    total_price: 120.0,
    status: "completed",
    therapy_details: [
      {
        therapy_id: 1,
        therapy_name: "Aromatherapy",
        therapist: "Dr. Smith",
        session_time: "2025-06-18T13:00:00",
        notes: "Relaxation session"
      }
    ]
  },
  {
    rental_id: 2002,
    customer_id: 302,
    customer_name: "Bob White",
    vehicle_number: "XYZ-5678",
    vehicle_type: "SUV",
    start_date: "2025-06-19T10:00:00",
    end_date: "2025-06-19T15:00:00",
    total_price: 150.0,
    status: "active",
    therapy_details: [
      {
        therapy_id: 2,
        therapy_name: "Hydrotherapy",
        therapist: "Dr. Lee",
        session_time: "2025-06-19T11:30:00",
        notes: "Joint pain relief"
      },
      {
        therapy_id: 3,
        therapy_name: "Massage",
        therapist: "Dr. Kim",
        session_time: "2025-06-19T14:00:00",
        notes: "Back massage"
      }
    ]
  },
  {
    rental_id: 2003,
    customer_id: 303,
    customer_name: "Charlie Black",
    vehicle_number: "LMN-9012",
    vehicle_type: "Van",
    start_date: "2025-06-20T08:00:00",
    end_date: "2025-06-20T20:00:00",
    total_price: 200.0,
    status: "reserved",
    therapy_details: []
  },
  {
    rental_id: 2004,
    customer_id: 304,
    customer_name: "Diana Blue",
    vehicle_number: "JKL-3456",
    vehicle_type: "Convertible",
    start_date: "2025-06-17T12:00:00",
    end_date: "2025-06-17T18:00:00",
    total_price: 180.0,
    status: "cancelled",
    therapy_details: [
      {
        therapy_id: 4,
        therapy_name: "Reflexology",
        therapist: "Dr. Patel",
        session_time: "2025-06-17T15:00:00",
        notes: "Foot therapy"
      }
    ]
  }
];

const VehicleRentingHistory: React.FC = () => {
  const [rentals, setRentals] = useState<VehicleRental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<VehicleRental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeView, setActiveView] = useState<'list' | 'details' | 'export'>('list');
  const [selectedRental, setSelectedRental] = useState<VehicleRental | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setRentals(dummyRentals);
      setFilteredRentals(dummyRentals);
      setIsLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    let result = rentals;
    if (statusFilter !== "all") {
      result = result.filter(r => r.status === statusFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r =>
        r.rental_id.toString().includes(term) ||
        r.customer_name.toLowerCase().includes(term) ||
        r.vehicle_number.toLowerCase().includes(term)
      );
    }
    setFilteredRentals(result);
  }, [rentals, statusFilter, searchTerm]);

  const handleViewDetails = (rental: VehicleRental) => {
    setSelectedRental(rental);
    setActiveView('details');
  };
  const handleExport = () => setActiveView('export');
  const handleBackToList = () => {
    setActiveView('list');
    setSelectedRental(null);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "reserved": return "bg-blue-100 text-blue-800";
      case "active": return "bg-teal-100 text-teal-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 bg-fixed">
      <div className="max-w-7xl mx-auto px-4 py-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-normal text-gray-700">Vehicle Renting History</h1>
            <p className="text-sm text-gray-500 mt-1">All vehicle rentals and associated therapy sessions</p>
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
        {/* Dashboard Header */}
        <div className="rounded-t-2xl p-5 mb-6 bg-gradient-to-r from-blue-500 to-teal-400 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M5 16l3 3 7-7-3-3-7 7zm14-2V7a2 2 0 00-2-2h-7.17a2 2 0 00-1.41.59l-7.17 7.17a2 2 0 000 2.83l7.17 7.17a2 2 0 002.83 0l7.17-7.17A2 2 0 0021 14z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">Vehicle Rentals Dashboard</h2>
          <p className="text-white text-opacity-95 text-sm mt-1 max-w-xl">
            View and manage all vehicle rentals and therapy sessions
          </p>
        </div>
        {activeView === 'list' && (
          <>
            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-lg shadow">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search by rental ID, customer, or vehicle..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="reserved">Reserved</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={handleExport}
              >
                Export
              </button>
            </div>
            {/* Rental List */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="text-blue-400 text-lg font-medium">Loading...</span>
              </div>
            ) : filteredRentals.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <span className="text-blue-400 text-lg font-medium">No rentals found.</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRentals.map(rental => (
                  <div key={rental.rental_id} className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex gap-4 items-center mb-2">
                        <span className={`inline-block px-2 py-1 rounded-full font-medium text-xs ${getStatusBadgeClass(rental.status)}`}>{rental.status}</span>
                        <span className="font-semibold text-blue-700">{rental.vehicle_number}</span>
                        <span className="text-gray-500">({rental.vehicle_type})</span>
                      </div>
                      <div className="text-gray-700 text-sm mb-1">Customer: <span className="font-medium">{rental.customer_name}</span></div>
                      <div className="text-gray-500 text-xs">From: {new Date(rental.start_date).toLocaleString()} &rarr; To: {new Date(rental.end_date).toLocaleString()}</div>
                      {rental.therapy_details.length > 0 && (
                        <div className="mt-2 text-xs text-teal-700">
                          Therapy Sessions: {rental.therapy_details.map(t => t.therapy_name).join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-6">
                      <button
                        className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm"
                        onClick={() => handleViewDetails(rental)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {/* Details View */}
        {activeView === 'details' && selectedRental && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-800">Rental Details</h3>
              <button
                onClick={handleBackToList}
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                &larr; Back to Rentals
              </button>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Rental ID</p>
                  <p className="font-medium">{selectedRental.rental_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedRental.customer_name} (ID: {selectedRental.customer_id})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">{selectedRental.vehicle_number} ({selectedRental.vehicle_type})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full font-medium text-xs ${getStatusBadgeClass(selectedRental.status)}`}>{selectedRental.status}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{new Date(selectedRental.start_date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{new Date(selectedRental.end_date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="font-medium text-teal-700">${selectedRental.total_price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Therapy Sessions</h4>
            {selectedRental.therapy_details.length === 0 ? (
              <div className="text-gray-500 text-sm mb-6">No therapy sessions for this rental.</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Therapy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Therapist</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Session Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedRental.therapy_details.map(t => (
                      <tr key={t.therapy_id}>
                        <td className="px-6 py-4 whitespace-nowrap">{t.therapy_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{t.therapist}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(t.session_time).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{t.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 border border-blue-500 text-blue-500 bg-white rounded-md hover:bg-blue-50 transition-colors duration-200"
                onClick={handleBackToList}
              >
                Back to Rentals
              </button>
            </div>
          </div>
        )}
        {/* Export View */}
        {activeView === 'export' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-800">Export Rentals</h3>
              <button
                onClick={handleBackToList}
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                &larr; Back to Rentals
              </button>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700">You are about to export <span className="font-semibold">{filteredRentals.length} rentals</span>. (Export functionality is simulated.)</p>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={() => alert(`Exporting ${filteredRentals.length} rentals...`)}
              >
                Export as CSV
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-500/10 to-teal-300/10 px-8 py-6 flex justify-end items-center mt-8 rounded-b-lg -mb-11">
        <div className="flex items-center flex-1">
          <span className="text-gray-600 text-sm mr-2">© 2025 HMS - NovaSynergy</span>
          <span className="text-xs px-2 py-0.5 bg-blue-200/40 text-blue-700 rounded-full">v2.1.0</span>
        </div>
        <span className="text-blue-700 text-lg font-medium mr-2">
          Total Revenue:
        </span>
        <span className="font-semibold text-teal-700 text-lg">
          ${rentals.reduce((sum, r) => sum + r.total_price, 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default VehicleRentingHistory;
