import React from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Package, ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../App';

interface ViewAnalyticsProps {
  products: Product[];
  onBack: () => void;
}

const ViewAnalytics: React.FC<ViewAnalyticsProps> = ({ products, onBack }) => {
  // Mock data for analytics
  const analyticsData = {
    totalRevenue: 125000,
    totalOrders: 245,
    avgOrderValue: 510,
    topProducts: [
      { name: 'Premium Wireless Headphones', sales: 85, revenue: 212415 },
      { name: 'Cotton T-Shirts Bulk Pack', sales: 156, revenue: 46644 },
      { name: 'LED Bulbs Energy Efficient', sales: 320, revenue: 47680 },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 85000 },
      { month: 'Feb', revenue: 92000 },
      { month: 'Mar', revenue: 78000 },
      { month: 'Apr', revenue: 105000 },
      { month: 'May', revenue: 125000 },
      { month: 'Jun', revenue: 135000 },
    ],
    categoryBreakdown: [
      { category: 'Electronics', percentage: 45, revenue: 56250 },
      { category: 'Textiles', percentage: 30, revenue: 37500 },
      { category: 'Food & Beverages', percentage: 25, revenue: 31250 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold">₹{analyticsData.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-200" />
                </div>
                <p className="text-blue-100 text-sm mt-2">+12% from last month</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Orders</p>
                    <p className="text-2xl font-bold">{analyticsData.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-200" />
                </div>
                <p className="text-green-100 text-sm mt-2">+8% from last month</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Avg Order Value</p>
                    <p className="text-2xl font-bold">₹{analyticsData.avgOrderValue}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
                <p className="text-purple-100 text-sm mt-2">+5% from last month</p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Total Products</p>
                    <p className="text-2xl font-bold">{products.length + 3}</p>
                  </div>
                  <Package className="h-8 w-8 text-orange-200" />
                </div>
                <p className="text-orange-100 text-sm mt-2">2 new this month</p>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analyticsData.monthlyRevenue.map((data, index) => {
                  const maxRevenue = Math.max(...analyticsData.monthlyRevenue.map(d => d.revenue));
                  const height = (data.revenue / maxRevenue) * 200;
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-blue-500 rounded-t transition-all duration-1000 w-full flex items-end justify-center text-white text-xs font-medium"
                        style={{ height: `${height}px`, minHeight: '20px' }}
                      >
                        <span className="mb-2">₹{(data.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 font-medium">{data.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
                <div className="space-y-4">
                  {analyticsData.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹{product.revenue.toLocaleString()}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">4.{5 + index}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
                <div className="space-y-4">
                  {analyticsData.categoryBreakdown.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{category.category}</span>
                        <span className="text-sm text-gray-600">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">Revenue: ₹{category.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-900">Growth Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mt-2">+15.2%</p>
                  <p className="text-sm text-gray-600">vs last quarter</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-gray-900">Conversion Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mt-2">3.8%</p>
                  <p className="text-sm text-gray-600">views to orders</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium text-gray-900">Customer Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600 mt-2">4.6/5</p>
                  <p className="text-sm text-gray-600">based on 156 reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;