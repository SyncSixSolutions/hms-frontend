import React, { useState, useEffect } from "react";

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

const ShowOrderings: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(dummyOrders);
      setFilteredOrders(dummyOrders);
      setIsLoading(false);
    }, 800);
  }, []);

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

    setFilteredOrders(result);
  }, [orders, statusFilter, searchTerm]);

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Food Orders Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all food orders in the hotel
          </p>
        </header>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by order ID, customer name, or room..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/4">
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.order_id} className="bg-white rounded-lg shadow overflow-hidden">
                <div 
                  className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleOrderExpand(order.order_id)}
                >
                  <div className="md:flex md:items-center space-y-2 md:space-y-0">
                    <div className="md:w-24 text-sm font-medium text-gray-900">
                      #{order.order_id}
                    </div>
                    <div className="md:ml-4 md:w-44">
                      <div className="text-sm font-medium text-gray-900">{order.user_name}</div>
                      <div className="text-xs text-gray-500">Room: {order.room_number || "N/A"}</div>
                    </div>
                    <div className="md:ml-4">
                      <div className="text-sm text-gray-500">{formatDate(order.order_time)}</div>
                      <div className="text-xs text-gray-400">
                        Delivery: {formatDate(order.items[0].delivery_time)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      ${order.total_price.toFixed(2)}
                    </span>
                    <svg 
                      className={`ml-4 h-5 w-5 text-gray-500 transition-transform ${expandedOrder === order.order_id ? "transform rotate-180" : ""}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {expandedOrder === order.order_id && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Order Details</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                              </th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Qty
                              </th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {order.items.map((item) => (
                              <tr key={item.order_item_id}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                  {item.food_name}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {item.quantity}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                  ${item.price.toFixed(2)}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50">
                              <td colSpan={3} className="px-3 py-2 text-sm font-medium text-gray-900 text-right">
                                Total:
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-gray-900">
                                ${order.total_price.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        {order.notes && (
                          <div className="mt-4 bg-yellow-50 p-3 rounded-md">
                            <h4 className="text-xs font-medium text-yellow-800">Customer Notes:</h4>
                            <p className="text-sm text-yellow-700">{order.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Actions</h3>
                        <div className="space-y-3">
                          <select
                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            value={order.status}
                            onChange={(e) => handleStatusChange(
                              order.order_id, 
                              e.target.value as 'pending' | 'preparing' | 'delivered' | 'completed' | 'cancelled'
                            )}
                            aria-label={`Change status for order ${order.order_id}`}
                            title={`Change status for order ${order.order_id}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="delivered">Delivered</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          
                          <button 
                            className="w-full px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Print Receipt
                          </button>
                          
                          <button 
                            className="w-full px-3 py-2 bg-white text-indigo-600 text-sm font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {orders.length}
              </div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {orders.filter(o => o.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-indigo-700">
                {orders.filter(o => o.status === 'preparing').length}
              </div>
              <div className="text-sm text-gray-500">Preparing</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                {orders.filter(o => o.status === 'delivered' || o.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-500">Delivered/Completed</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-700">
                {orders.filter(o => o.status === 'cancelled').length}
              </div>
              <div className="text-sm text-gray-500">Cancelled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderings;
