import React, { useState } from 'react';
import { Package, Plus, CreditCard as Edit, BarChart3, ShoppingCart, User, LogOut, TrendingUp, DollarSign, Star, Eye, Menu, X, Settings, Facebook, Twitter, Instagram, Linkedin, HelpCircle, AlertCircle } from 'lucide-react';
import { User as UserType, Product, Page } from '../App';
import ProblemOverview from './ProblemOverview';

interface SupplierDashboardProps {
  user: UserType;
  products: Product[];
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onEditProduct: (product: Product) => void;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({
  user,
  products,
  onNavigate,
  onLogout,
  onEditProduct
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProblemOverview, setShowProblemOverview] = useState(false);

  // Sample products for demo
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 2499,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      stock: 50,
      brand: 'TechPro',
      sku: 'TP-WH-001'
    },
    {
      id: '2',
      name: 'Cotton T-Shirts Bulk Pack',
      price: 299,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Textiles',
      description: 'Comfortable cotton t-shirts, perfect for retail',
      stock: 0,
      brand: 'ComfortWear',
      sku: 'CW-TS-002'
    },
    {
      id: '3',
      name: 'LED Bulbs Energy Efficient',
      price: 149,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: '9W LED bulbs with 3-year warranty',
      stock: 500,
      brand: 'BrightLight',
      sku: 'BL-LED-004'
    },
    {
      id: '4',
      name: 'Stainless Steel Water Bottles',
      price: 199,
      image: 'https://images.pexels.com/photos/1127800/pexels-photo-1127800.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Household',
      description: 'Durable, BPA-free bottles for bulk orders',
      stock: 1200,
      brand: 'SteelMate',
      sku: 'SM-BTL-010'
    },
    {
      id: '5',
      name: 'Organic Cotton Towels Set',
      price: 499,
      image: 'https://images.pexels.com/photos/6782474/pexels-photo-6782474.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Textiles',
      description: 'Soft, eco-friendly towels for hotels and retail',
      stock: 300,
      brand: 'EcoSoft',
      sku: 'ES-TWL-006'
    },
    {
      id: '6',
      name: 'LED Smart Desk Lamp',
      price: 899,
      image: 'https://images.pexels.com/photos/820854/pexels-photo-820854.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: 'Adjustable brightness with USB charging',
      stock: 150,
      brand: 'BrightWorks',
      sku: 'BW-LMP-021'
    },
    {
      id: '7',
      name: 'Reusable Shopping Bags (Pack of 50)',
      price: 249,
      image: 'https://images.pexels.com/photos/1151237/pexels-photo-1151237.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Misc',
      description: 'Strong, eco-friendly bags for retail chains',
      stock: 2000,
      brand: 'GreenCarry',
      sku: 'GC-BAG-050'
    },
    {
      id: '8',
      name: 'Ergonomic Office Chair',
      price: 3499,
      image: 'https://images.pexels.com/photos/279639/pexels-photo-279639.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Furniture',
      description: 'Mesh back with adjustable lumbar support for long hours',
      stock: 250,
      brand: 'ErgoFlex',
      sku: 'EF-CHR-018'
    },
    {
      id: '9',
      name: 'Industrial Safety Gloves (Pack of 100)',
      price: 1299,
      image: 'https://images.pexels.com/photos/3831849/pexels-photo-3831849.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Safety',
      description: 'Nitrile-coated, cut-resistant gloves for industrial use',
      stock: 800,
      brand: 'SafeGrip',
      sku: 'SG-GLV-100'
    },
    {
      id: '10',
      name: 'Bluetooth Barcode Scanner',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1580974928067-3e1f7c2f15c9?q=80&w=300&auto=format&fit=crop',
      category: 'Electronics',
      description: '2D barcode scanner with USB dongle and BT connectivity',
      stock: 120,
      brand: 'ScanPro',
      sku: 'SP-BAR-022'
    },
    {
      id: '11',
      name: 'Heavy-Duty Storage Racks',
      price: 5499,
      image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Industrial',
      description: 'Powder-coated steel racks for warehouses and shops',
      stock: 75,
      brand: 'StorMax',
      sku: 'SM-RCK-030'
    },
    {
      id: '12',
      name: 'Solar Power Bank 20,000mAh',
      price: 1399,
      image: 'https://images.pexels.com/photos/4242970/pexels-photo-4242970.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: 'High-capacity solar power bank with dual USB output',
      stock: 400,
      brand: 'SunCharge',
      sku: 'SC-PBK-020'
    },
    {
      id: '13',
      name: 'Reusable Steel Straws (Pack of 100)',
      price: 599,
      image: 'https://images.pexels.com/photos/4252871/pexels-photo-4252871.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Household',
      description: 'Food-grade stainless steel straws with cleaning brushes',
      stock: 1000,
      brand: 'EcoSip',
      sku: 'ES-STR-100'
    },
    {
      id: '14',
      name: 'Wooden Pallets (Set of 10)',
      price: 2999,
      image: 'https://images.pexels.com/photos/4483614/pexels-photo-4483614.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Industrial',
      description: 'Heat-treated export-ready wooden pallets',
      stock: 90,
      brand: 'PalletWorks',
      sku: 'PW-PAL-010'
    },
    {
      id: '15',
      name: 'A4 Copier Paper (10 Reams)',
      price: 1799,
      image: 'https://images.pexels.com/photos/318302/pexels-photo-318302.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Office',
      description: 'Bright white 75 GSM copier paper for office use',
      stock: 600,
      brand: 'OfficePlus',
      sku: 'OP-PPR-010'
    }
  ];

  const allProducts = [...sampleProducts, ...products];
  const totalRevenue = 125000;
  const totalOrders = 245;
  const totalProducts = allProducts.length;
  const avgRating = 4.6;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Problem Overview Button */}
              <button
                onClick={() => setShowProblemOverview(true)}
                className="ml-2 p-2 rounded-md text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                title="View Problem Overview"
              >
                <AlertCircle className="h-6 w-6" />
              </button>
              
              <div className="flex-shrink-0 ml-2">
        <h1 className="text-xl font-bold text-gray-900">Qwipo - Supplier</h1>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Social Media Icons */}
              <div className="hidden md:flex items-center space-x-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-blue-600 hover:text-blue-700" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-blue-400 hover:text-blue-500" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-pink-600 hover:text-pink-700" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-blue-800 hover:text-blue-900" />
                </a>
              </div>

              <button
                onClick={() => onNavigate('support-guide')}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                title="Support Guide"
              >
                <HelpCircle className="h-6 w-6" />
              </button>

              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <button
                      onClick={() => onNavigate('profile')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => onNavigate('settings')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('add-product');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('update-inventory');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Package className="h-5 w-5" />
                <span>Update Inventory</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('view-analytics');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <BarChart3 className="h-5 w-5" />
                <span>View Analytics</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('customer-orders');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Customer Orders</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.businessName || user.name}!
          </h2>
          <p className="text-gray-600">
            Manage your inventory and track your business performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">+8% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">{allProducts.filter(p => p.stock === 0).length} out of stock</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-yellow-600 mt-2">Based on 156 reviews</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('add-product')}
              className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Plus className="h-6 w-6 text-green-600" />
              <span className="font-medium text-green-800">Add Product</span>
            </button>

            <button
              onClick={() => onNavigate('update-inventory')}
              className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Package className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-blue-800">Update Inventory</span>
            </button>

            <button
              onClick={() => onNavigate('view-analytics')}
              className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <span className="font-medium text-purple-800">View Analytics</span>
            </button>

            <button
              onClick={() => onNavigate('customer-orders')}
              className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-orange-600" />
              <span className="font-medium text-orange-800">Customer Orders</span>
            </button>
          </div>
        </div>

        {/* Products Inventory */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Products</h3>
            <button
              onClick={() => onNavigate('add-product')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No products yet</p>
              <button
                onClick={() => onNavigate('add-product')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map(product => (
                <div key={product.id} className="group bg-white border rounded-lg p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable'; }}
                      className="w-full h-32 object-cover rounded-lg transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{product.category}</span>
                    {product.brand && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{product.brand}</span>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-green-600 mb-2">₹{product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mb-3">Stock: {product.stock} units</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-sm transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Problem Overview Modal */}
      {showProblemOverview && (
        <ProblemOverview onClose={() => setShowProblemOverview(false)} />
      )}
    </div>
  );
};

export default SupplierDashboard;