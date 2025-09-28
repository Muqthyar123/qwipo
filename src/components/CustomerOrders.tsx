import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Eye, Truck, CheckCircle, Clock, Package } from 'lucide-react';

interface CustomerOrdersProps {
  onBack: () => void;
}

const CustomerOrders: React.FC<CustomerOrdersProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'Rajesh Kumar',
      customerEmail: 'rajesh@kumarstore.com',
      products: [
        { name: 'Premium Wireless Headphones', quantity: 2, price: 2499 },
        { name: 'LED Bulbs Energy Efficient', quantity: 10, price: 149 }
      ],
      total: 6488,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-18'
    },
    {
      id: 'ORD-002',
      customerName: 'Priya Sharma',
      customerEmail: 'priya@sharmatextiles.com',
      products: [
        { name: 'Cotton T-Shirts Bulk Pack', quantity: 5, price: 299 }
      ],
      total: 1495,
      status: 'shipped',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-20'
    },
    {
      id: 'ORD-003',
      customerName: 'Mohammed Ali',
      customerEmail: 'ali@enterprises.com',
      products: [
        { name: 'Organic Basmati Rice 25kg', quantity: 3, price: 1899 },
        { name: 'Premium Wireless Headphones', quantity: 1, price: 2499 }
      ],
      total: 8196,
      status: 'processing',
      orderDate: '2024-01-17',
      deliveryDate: '2024-01-22'
    },
    {
      id: 'ORD-004',
      customerName: 'Sunita Patel',
      customerEmail: 'sunita@patelindustries.com',
      products: [
        { name: 'LED Bulbs Energy Efficient', quantity: 50, price: 149 }
      ],
      total: 7450,
      status: 'pending',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-25'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'shipped':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Customer Orders</h1>
            </div>
            
            <div className="text-sm text-gray-600">
              Total Orders: {orders.length}
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search orders, customers..."
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{order.orderDate}</p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Customer</p>
                        <p className="text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Delivery Date</p>
                        <p className="text-gray-900">{order.deliveryDate}</p>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Products</p>
                      <div className="space-y-2">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-600">Quantity: {product.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ₹{(product.price * product.quantity).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      {order.status === 'pending' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Confirm Order
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Mark as Shipped
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;