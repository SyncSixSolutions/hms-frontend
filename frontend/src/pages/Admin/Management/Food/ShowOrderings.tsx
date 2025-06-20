import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

// Types based on the database schema
interface OrderItem {
  order_item_id: number;
  order_id: number;
  food_id: number;
  food_name: string;
  quantity: number;
  price: number;
  delivery_time: string;
}

interface Order {
  order_id: number;
  user_id: number;
  user_name: string;
  total_price: number;
  order_time: string;
  room_id: number | null;
  room_number: string | null;
  notes: string | null;
  status: 'pending' | 'preparing' | 'delivered' | 'completed' | 'cancelled';
  items: OrderItem[];
}

// Dummy data based on the database schema
const dummyOrders: Order[] = [
  {
    order_id: 1001,
    user_id: 101,
    user_name: "Jane Smith",
    total_price: 29.98,
    order_time: "2025-06-19T18:25:43",
    room_id: 42,
    room_number: "101",
    notes: "No onions please",
    status: "pending",
    items: [
      {
        order_item_id: 5001,
        order_id: 1001,
        food_id: 12,
        food_name: "Margherita Pizza",
        quantity: 1,
        price: 12.99,
        delivery_time: "2025-06-19T19:00:00"
      },
      {
        order_item_id: 5002,
        order_id: 1001,
        food_id: 8,
        food_name: "Tiramisu",
        quantity: 1,
        price: 6.99,
        delivery_time: "2025-06-19T19:00:00"
      },
      {
        order_item_id: 5003,
        order_id: 1001,
        food_id: 15,
        food_name: "Sparkling Water",
        quantity: 2,
        price: 4.99,
        delivery_time: "2025-06-19T19:00:00"
      }
    ]
  },
  {
    order_id: 1002,
    user_id: 102,
    user_name: "Michael Brown",
    total_price: 15.97,
    order_time: "2025-06-19T12:30:22",
    room_id: 65,
    room_number: "205",
    notes: null,
    status: "delivered",
    items: [
      {
        order_item_id: 5004,
        order_id: 1002,
        food_id: 5,
        food_name: "Chicken Salad",
        quantity: 1,
        price: 9.99,
        delivery_time: "2025-06-19T13:15:00"
      },
      {
        order_item_id: 5005,
        order_id: 1002,
        food_id: 7,
        food_name: "Sparkling Water",
        quantity: 2,
        price: 2.99,
        delivery_time: "2025-06-19T13:15:00"
      }
    ]
  },
  {
    order_id: 1003,
    user_id: 103,
    user_name: "Robert Johnson",
    total_price: 42.95,
    order_time: "2025-06-20T08:45:11",
    room_id: 78,
    room_number: "310",
    notes: "Extra cheese on pizza",
    status: "preparing",
    items: [
      {
        order_item_id: 5006,
        order_id: 1003,
        food_id: 2,
        food_name: "Pepperoni Pizza",
        quantity: 2,
        price: 14.99,
        delivery_time: "2025-06-20T09:30:00"
      },
      {
        order_item_id: 5007,
        order_id: 1003,
        food_id: 8,
        food_name: "Cheesecake",
        quantity: 1,
        price: 7.99,
        delivery_time: "2025-06-20T09:30:00"
      },
      {
        order_item_id: 5008,
        order_id: 1003,
        food_id: 10,
        food_name: "Cola",
        quantity: 2,
        price: 2.49,
        delivery_time: "2025-06-20T09:30:00"
      }
    ]
  },
  {
    order_id: 1004,
    user_id: 104,
    user_name: "Emily Davis",
    total_price: 33.98,
    order_time: "2025-06-18T07:15:30",
    room_id: 91,
    room_number: "402",
    notes: "Gluten free if possible",
    status: "completed",
    items: [
      {
        order_item_id: 5009,
        order_id: 1004,
        food_id: 12,
        food_name: "Continental Breakfast",
        quantity: 2,
        price: 16.99,
        delivery_time: "2025-06-18T07:45:00"
      }
    ]
  },
  {
    order_id: 1005,
    user_id: 105,
    user_name: "David Wilson",
    total_price: 51.97,
    order_time: "2025-06-20T19:10:05",
    room_id: 34,
    room_number: "118",
    notes: null,
    status: "pending",
    items: [
      {
        order_item_id: 5010,
        order_id: 1005,
        food_id: 15,
        food_name: "Seafood Pasta",
        quantity: 1,
        price: 18.99,
        delivery_time: "2025-06-20T20:00:00"
      },
      {
        order_item_id: 5011,
        order_id: 1005,
        food_id: 17,
        food_name: "Garden Salad",
        quantity: 1,
        price: 7.99,
        delivery_time: "2025-06-20T20:00:00"
      },
      {
        order_item_id: 5012,
        order_id: 1005,
        food_id: 9,
        food_name: "White Wine",
        quantity: 1,
        price: 24.99,
        delivery_time: "2025-06-20T20:00:00"
      }
    ]
  },
  {
    order_id: 1006,
    user_id: 101,
    user_name: "Jane Smith",
    total_price: 13.98,
    order_time: "2025-06-17T14:22:38",
    room_id: 42,
    room_number: "101",
    notes: null,
    status: "cancelled",
    items: [
      {
        order_item_id: 5013,
        order_id: 1006,
        food_id: 21,
        food_name: "Club Sandwich",
        quantity: 1,
        price: 10.99,
        delivery_time: "2025-06-17T15:00:00"
      },
      {
        order_item_id: 5014,
        order_id: 1006,
        food_id: 7,
        food_name: "Sparkling Water",
        quantity: 1,
        price: 2.99,
        delivery_time: "2025-06-17T15:00:00"
      }
    ]
  },
  {
    order_id: 1007,
    user_id: 106,
    user_name: "Sarah Thompson",
    total_price: 39.97,
    order_time: "2025-06-19T20:05:17",
    room_id: 58,
    room_number: "220",
    notes: "Medium rare steak",
    status: "completed",
    items: [
      {
        order_item_id: 5015,
        order_id: 1007,
        food_id: 4,
        food_name: "Caesar Salad",
        quantity: 1,
        price: 8.99,
        delivery_time: "2025-06-19T20:45:00"
      },
      {
        order_item_id: 5016,
        order_id: 1007,
        food_id: 6,
        food_name: "Grilled Salmon",
        quantity: 1,
        price: 22.99,
        delivery_time: "2025-06-19T20:45:00"
      },
      {
        order_item_id: 5017,
        order_id: 1007,
        food_id: 11,
        food_name: "Cheesecake",
        quantity: 1,
        price: 7.99,
        delivery_time: "2025-06-19T20:45:00"
      }
    ]
  }
];

// Component for Order Details View
const OrderDetailsView: React.FC<{ order: Order | null; onBack: () => void }> = ({ order, onBack }) => {
  if (!order) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>
        <button
          onClick={onBack}
          className="text-orange-500 hover:text-orange-600 flex items-center"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Orders
        </button>
      </div>
      
      <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{order.order_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date & Time</p>
            <p className="font-medium">{new Date(order.order_time).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{order.user_name} (ID: {order.user_id})</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room</p>
            <p className="font-medium">{order.room_number || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="inline-block px-2 py-1 text-sm rounded-full font-medium mt-1 capitalize">
              <span className={`inline-block px-2 py-1 rounded-full font-medium text-xs ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Notes</p>
            <p className="font-medium">{order.notes || 'No notes'}</p>
          </div>
        </div>
      </div>
      
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h4>
      
      <div className="bg-white border rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map((item) => (
              <tr key={item.order_item_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.food_name}</div>
                  <div className="text-sm text-gray-500">Item ID: {item.food_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={3} className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Total:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">${order.total_price.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {/* Add implementation to update order status */}}
          title="Update order status"
        >
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Update Status
        </button>
        <button
          className="px-4 py-2 border border-orange-500 text-orange-500 bg-white rounded-md hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {/* Add implementation to print receipt */}}
          title="Print receipt for this order"
        >
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Receipt
        </button>
      </div>
    </div>
  );
};

// Component for Print Receipt View
const PrintReceiptView: React.FC<{ order: Order | null; onBack: () => void }> = ({ order, onBack }) => {
  if (!order) return null;
  
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
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
            title="Print this receipt"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Now
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center"
          >
            Back
          </button>
        </div>
      </div>
      
      {/* Receipt Content - This part will be printed */}
      <div className="max-w-2xl mx-auto border border-gray-200 p-6 receipt-content">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">HMS - NovaSynergy Hotel</h2>
          <p className="text-gray-500">123 Beach Avenue, Ocean City</p>
          <p className="text-gray-500">Tel: (123) 456-7890</p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Receipt #</span>
            <span className="text-gray-900">{order.order_id}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Date</span>
            <span className="text-gray-900">{new Date(order.order_time).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Time</span>
            <span className="text-gray-900">{new Date(order.order_time).toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Guest</span>
            <span className="text-gray-900">{order.user_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Room</span>
            <span className="text-gray-900">{order.room_number || 'N/A'}</span>
          </div>
        </div>
        
        <table className="w-full text-left mb-6">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-gray-600">Item</th>
              <th className="py-2 text-gray-600 text-center">Qty</th>
              <th className="py-2 text-gray-600 text-right">Price</th>
              <th className="py-2 text-gray-600 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.order_item_id} className="border-b border-gray-200">
                <td className="py-3 text-gray-900">{item.food_name}</td>
                <td className="py-3 text-gray-900 text-center">{item.quantity}</td>
                <td className="py-3 text-gray-900 text-right">${item.price.toFixed(2)}</td>
                <td className="py-3 text-gray-900 text-right">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center font-bold">
            <span className="text-gray-800">TOTAL</span>
            <span className="text-gray-800">${order.total_price.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Thank you for choosing NovaSynergy Hotel</p>
          <p>We hope you enjoy your stay!</p>
        </div>
      </div>
    </div>
  );
};

// Component for Export View
const ExportView: React.FC<{ orders: Order[]; onBack: () => void }> = ({ orders, onBack }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  
  const handleExport = () => {
    // In a real application, this would implement actual export functionality
    // For now, we'll just show a simulated export process
    alert(`Exporting ${orders.length} orders as ${exportFormat.toUpperCase()}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Export Orders</h3>
        <button
          onClick={onBack}
          className="text-orange-500 hover:text-orange-600 flex items-center"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Orders
        </button>
      </div>
      
      <div className="bg-orange-50 rounded-lg p-4 mb-6">
        <p className="text-gray-700">You are about to export <span className="font-semibold">{orders.length} orders</span>. Please select your preferred export format.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'csv' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
          onClick={() => setExportFormat('csv')}
        >
          <div className="flex justify-center mb-3">
            <svg className={`h-12 w-12 ${exportFormat === 'csv' ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-800">CSV File</h4>
          <p className="text-sm text-gray-500 mt-1">Export as comma-separated values</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'json' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
          onClick={() => setExportFormat('json')}
        >
          <div className="flex justify-center mb-3">
            <svg className={`h-12 w-12 ${exportFormat === 'json' ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-800">JSON File</h4>
          <p className="text-sm text-gray-500 mt-1">Export as structured JSON data</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${exportFormat === 'pdf' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
          onClick={() => setExportFormat('pdf')}
        >
          <div className="flex justify-center mb-3">
            <svg className={`h-12 w-12 ${exportFormat === 'pdf' ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-800">PDF Document</h4>
          <p className="text-sm text-gray-500 mt-1">Export as printable PDF document</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">Export Preview</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room</th>
                <th className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.order_id} className="border-b border-gray-200">
                  <td className="py-2 px-3">{order.order_id}</td>
                  <td className="py-2 px-3">{order.user_name}</td>
                  <td className="py-2 px-3">{new Date(order.order_time).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{order.room_number || 'N/A'}</td>
                  <td className="py-2 px-3 capitalize">{order.status}</td>
                  <td className="py-2 px-3">${order.total_price.toFixed(2)}</td>
                </tr>
              ))}
              {orders.length > 5 && (
                <tr>
                  <td colSpan={6} className="py-2 px-3 text-center text-gray-500">
                    ... and {orders.length - 5} more orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
          onClick={handleExport}
        >
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export as {exportFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

const ShowOrderings: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'details' | 'print' | 'export'>('list');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showTodayOnly, setShowTodayOnly] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(dummyOrders);
      setFilteredOrders(dummyOrders);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle view switching
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setActiveView('details');
  };
  
  const handlePrintReceipt = (order: Order) => {
    setSelectedOrder(order);
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
    setSelectedOrder(null);
  };
  
  useEffect(() => {
    let result = orders;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.order_id.toString().includes(term) ||
          order.user_name.toLowerCase().includes(term) ||
          (order.room_number && order.room_number.toLowerCase().includes(term))
      );
    }
    
    // Filter for today's orders only
    if (showTodayOnly) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      result = result.filter((order) => {
        const orderDate = new Date(order.order_time);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });
    }

    setFilteredOrders(result);
  }, [orders, statusFilter, searchTerm, showTodayOnly]);

  const handleStatusChange = (orderId: number, newStatus: 'pending' | 'preparing' | 'delivered' | 'completed' | 'cancelled') => {
    // In a real app, this would make an API call
    setOrders(orders.map(order => 
      order.order_id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-fixed bg-center" 
      style={{
        backgroundImage: 'url("/src/assets/images/client-food.png")',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}>
      <div className="max-w-7xl mx-auto px-4 py-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-normal text-gray-700">Welcome, Admin</h1>
            <p className="text-sm text-gray-500 mt-1">{formatDate(new Date().toISOString())}</p>
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
                alt="Receptionist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>          
        {/* Dashboard Header - Enhanced styling */}
        <div className="rounded-t-2xl p-5 mb-6 bg-gradient-to-r from-[#FF9800] to-[#FF5722] shadow-md relative overflow-hidden">
          {/* Food icon pattern overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">Orders Dashboard</h2>
          <p className="text-white text-opacity-95 text-sm mt-1 max-w-xl">
            View and manage all food orders in the hotel - track status, process orders, and generate reports
          </p>
        </div>

        {activeView === 'list' && (
          <>
            {/* Order Statistics*/}
            <div className="mb-6 bg-white rounded-lg shadow">
              <div className="bg-orange-500 rounded-t-lg px-6 py-3">
                <h2 className="text-lg font-medium text-white flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Order Statistics
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
                    <div className="text-2xl font-bold text-orange-700">
                      {orders.length}
                    </div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-100">
                    <div className="text-2xl font-bold text-yellow-700">
                      {orders.filter(o => o.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">
                      {orders.filter(o => o.status === 'preparing').length}
                    </div>
                    <div className="text-sm text-gray-500">Preparing</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700">
                      {orders.filter(o => o.status === 'delivered' || o.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-500">Delivered/Completed</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center border border-red-100">
                    <div className="text-2xl font-bold text-red-700">
                      {orders.filter(o => o.status === 'cancelled').length}
                    </div>
                    <div className="text-sm text-gray-500">Cancelled</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-lg shadow">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name, or room..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/4">
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 rounded-md border border-orange-200 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter orders by status"
                    title="Filter orders by status"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex space-x-2">
                <button 
                  className={`px-4 py-2 ${showTodayOnly ? 'bg-orange-600' : 'bg-orange-500'} text-white rounded-md hover:bg-orange-600 transition-colors duration-200`}
                  onClick={handleToggleTodayOnly}
                  title={showTodayOnly ? "Show all orders" : "Show today's orders only"}
                >
                  {showTodayOnly ? "All Orders" : "Today's Orders"}
                </button>
                <button 
                  className="px-4 py-2 border border-orange-500 text-orange-500 bg-white rounded-md hover:bg-orange-50 transition-colors duration-200"
                  onClick={handleExport}
                  title="Export orders data"
                >
                  Export
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-500">No orders found matching your criteria.</p>
                <button onClick={() => setStatusFilter("all")} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.order_id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div 
                      className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer hover:bg-orange-50"
                      onClick={() => toggleOrderExpand(order.order_id)}
                    >
                      <div className="md:flex md:items-center space-y-2 md:space-y-0">
                        <div className="md:w-24 md:mr-6 text-center">
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-semibold text-gray-900">Order #{order.order_id}</span>
                            <span className="ml-2 text-xs text-gray-500">({formatDate(order.order_time)})</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Customer: {order.user_name}
                            {order.room_number && <span> • Room: {order.room_number}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex space-x-2 md:w-auto">
                        <div className="font-medium text-orange-600 ">
                          ${order.total_price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    {expandedOrder === order.order_id && (
                      <div className="border-t border-gray-100 bg-orange-50 px-6 py-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.order_item_id} className="flex justify-between text-sm">
                              <div className="flex-1">
                                <span className="font-medium">{item.quantity}x</span> {item.food_name}
                              </div>
                              <div className="text-gray-600 ml-4">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                          <div>
                            <span className="text-sm text-gray-500">Notes: </span>
                            <span className="text-sm">{order.notes || 'No special instructions'}</span>
                          </div>
                          <div className="font-semibold text-orange-600">
                            Total: ${order.total_price.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col md:flex-row gap-2 justify-end">
                          <button 
                            className="w-full px-3 py-2 border border-orange-500 text-orange-500 bg-white text-sm font-medium rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrintReceipt(order);
                            }}
                            title="Print receipt for this order"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Receipt
                          </button>
                          
                          <button 
                            className="w-full px-3 py-2 border border-orange-500 text-orange-500 bg-white text-sm font-medium rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(order);
                            }}
                            title="View detailed information for this order"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>            )}
          </>
        )}

        {/* Order Details View */}
        {activeView === 'details' && selectedOrder && (
          <OrderDetailsView order={selectedOrder} onBack={handleBackToList} />
        )}

        {/* Print Receipt View */}
        {activeView === 'print' && selectedOrder && (
          <PrintReceiptView order={selectedOrder} onBack={handleBackToList} />
        )}

        {/* Export View */}
        {activeView === 'export' && (
          <ExportView orders={filteredOrders} onBack={handleBackToList} />
        )}
          
        
      </div>
      {/* Footer with gradient background like in AdminDashboard */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-300/10 px-8 py-6 flex justify-end items-center mt-8 rounded-b-lg -mb-11">
          <div className="flex items-center flex-1">
            <div className="flex items-center">
              <span className="text-gray-600 text-sm mr-2">© 2025 HMS - NovaSynergy</span>
              <span className="text-xs px-2 py-0.5 bg-[#6B72D6]/20 text-[#6B72D6] rounded-full">v2.1.0</span>
            </div>
          </div>

          <span className="text-gray-700 text-lg font-medium mr-2">
            Total Revenue:
          </span>
          <span className="font-semibold text-orange-600 text-lg">
            ${orders.reduce((sum, order) => sum + order.total_price, 0).toFixed(2)}
          </span>
        </div>
    </div>
  );
};

export default ShowOrderings;
