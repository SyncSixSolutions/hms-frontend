import React, { useState } from 'react';
import { Search, Home, Calendar, User, Settings, Edit, Trash2, Plus } from 'lucide-react';





import LuxurySuit from '../../../../assets/images/bookingroom/LuxurySuit.png';
import DeluxeRoom from '../../../../assets/images/bookingroom/DeluxeRoom.png'; 
import EconomySuit from '../../../../assets/images/bookingroom/EconomySuit.png';
import PremiumBundle from '../../../../assets/images/bookingroom/PremiumBundle.png'; 
import LuxurySuite from '../../../../assets/images/bookingroom/LuxurySuite.png';
import BookingDashboard from './ViewBooking'; // Import the ViewBooking component

// Room images mapping with proper typing
interface RoomImages {
  [key: string]: string;
}

const roomImages: RoomImages = {
  'Luxury Suit': LuxurySuit,
  'Deluxe room': DeluxeRoom,
  'Economy suit': EconomySuit,
  'Premium bundle': PremiumBundle,
  'Luxury suite': LuxurySuite
};

interface BookingData {
  referenceNumber: string;
  roomType: string;
  customer: string;
  checkInDate: string;
  checkOutDate: string;
  amount: string;
  paymentMode: string;
  status: 'Done' | 'Pending' | 'Canceled';
}

const BookingLogDashboard: React.FC = () => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  const bookingData: BookingData[] = [
    {
      referenceNumber: '#20462',
      roomType: 'Luxury Suit',
      customer: 'Matt Dickerson',
      checkInDate: '13/05/2022',
      checkOutDate: '13/05/2022',
      amount: '$4.95',
      paymentMode: 'Transfer Bank',
      status: 'Done'
    },
    {
      referenceNumber: '#19553',
      roomType: 'Deluxe room',
      customer: 'Wiktoria',
      checkInDate: '22/05/2022',
      checkOutDate: '22/05/2022',
      amount: '$8.95',
      paymentMode: 'Cash on Delivery',
      status: 'Done'
    },
    {
      referenceNumber: '#45169',
      roomType: 'Economy suit',
      customer: 'Trixie Byrd',
      checkInDate: '15/06/2022',
      checkOutDate: '-',
      amount: '$1,169.95',
      paymentMode: 'Cash on Delivery',
      status: 'Pending'
    },
    {
      referenceNumber: '#34204',
      roomType: 'Deluxe room',
      customer: 'Brad Mason',
      checkInDate: '06/09/2022',
      checkOutDate: '-',
      amount: '$899.95',
      paymentMode: 'Transfer Bank',
      status: 'Pending'
    },
    {
      referenceNumber: '#17188',
      roomType: 'Deluxe room',
      customer: 'Sanderson',
      checkInDate: '25/09/2022',
      checkOutDate: '25/09/2022',
      amount: '$22.95',
      paymentMode: 'Cash on Delivery',
      status: 'Canceled'
    },
    {
      referenceNumber: '#73003',
      roomType: 'Luxury Suit',
      customer: 'Jun Redfern',
      checkInDate: '04/10/2022',
      checkOutDate: '04/10/2022',
      amount: '$54.95',
      paymentMode: 'Transfer Bank',
      status: 'Done'
    },
    {
      referenceNumber: '#58635',
      roomType: 'Premium bundle',
      customer: 'Miriam Kidd',
      checkInDate: '17/10/2022',
      checkOutDate: '17/10/2022',
      amount: '$174.95',
      paymentMode: 'Transfer Bank',
      status: 'Done'
    },
    {
      referenceNumber: '#64122',
      roomType: 'Luxury suite',
      customer: 'Dominic',
      checkInDate: '24/10/2022',
      checkOutDate: '24/10/2022',
      amount: '$249.95',
      paymentMode: 'Cash on Delivery',
      status: 'Done'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Canceled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoomImage = (roomType: string): string => {
    return roomImages[roomType] || roomImages['Deluxe room'];
  };

  const handleReferenceClick = (booking: BookingData) => {
    // Convert booking data to the format expected by ViewBooking component
    const bookingDataForView = {
      refNo: booking.referenceNumber,
      payment: booking.amount,
      checkIn: booking.checkInDate,
      checkOut: booking.checkOutDate,
      customerId: booking.customer,
      description: {
        name: `${booking.roomType} Suite`,
        location: 'Bambalapitiya',
        city: 'Colombo'
      },
      suiteType: booking.roomType,
      roomsCount: '1',
      ratings: '4/5',
      status: booking.status,
      paymentType: booking.paymentMode,
      image: getRoomImage(booking.roomType)
    };
    
    setSelectedBooking(booking);
    
    // Update the ViewBooking component with the selected booking data
    if (window.updateBookingData) {
      window.updateBookingData(bookingDataForView);
    }
  };

  const handleBackToList = () => {
    setSelectedBooking(null);
  };

  const filteredData = bookingData.filter(booking =>
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // If a booking is selected, show the ViewBooking component
  if (selectedBooking) {
    return <BookingDashboard onBack={handleBackToList} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-sm flex flex-col items-center py-6 gap-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Home className="w-5 h-5 text-indigo-600" />
        </div>
        <Calendar className="w-5 h-5 text-gray-400" />
        <User className="w-5 h-5 text-gray-400" />
        <Settings className="w-5 h-5 text-gray-400" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Welcome, Receptionist</h1>
            <p className="text-sm text-gray-500 mt-1">Tue, 07 June 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
              Notifi
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Booking Log Header */}
          <div className="bg-indigo-600 rounded-t-xl px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Booking Log</h2>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
            {/* Controls */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Booking
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rooms & suites
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-out Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((booking, index) => (
                    <tr key={booking.referenceNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleReferenceClick(booking)}
                          className="text-indigo-600 hover:text-indigo-900 hover:underline transition-colors cursor-pointer"
                        >
                          {booking.referenceNumber}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-200">
                            <img
                              src={getRoomImage(booking.roomType)}
                              alt={booking.roomType}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNSAyMi43NjE0IDE3LjIzODYgMjUgMjAgMjVaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=';
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{booking.roomType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.checkInDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.checkOutDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.paymentMode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-indigo-600 hover:text-indigo-900 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-600">Previous</span>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600">Next</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLogDashboard;