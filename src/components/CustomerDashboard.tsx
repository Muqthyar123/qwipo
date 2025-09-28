import React, { useState } from 'react';
import { 
  Search, ShoppingCart, User, LogOut, Menu, X, 
  Camera, Filter, Star, Heart, MessageCircle, 
  Settings, Package, MapPin, Facebook, Twitter, 
  Instagram, Linkedin, HelpCircle
} from 'lucide-react';
import { User as UserType, Product, Page, CartItem } from '../App';
import AIAssistant from './AIAssistant';

interface CustomerDashboardProps {
  user: UserType;
  products: Product[];
  cart: CartItem[];
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  user,
  products,
  cart,
  onNavigate,
  onLogout,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    brand: '',
    material: '',
    color: '',
    size: '',
    weight: '',
    moq: '',
    leadTime: '',
    inStock: false,
    freeShipping: false,
    verifiedSupplier: false,
    topRated: false,
    onSale: false,
    newArrivals: false,
    bestSellers: false,
    certifications: '',
    ecoFriendly: false,
    countryOfOrigin: '',
    businessType: '',
    warranty: false
  });

  // Sample products data
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
      sku: 'TP-WH-001',
      rating: 4.5,
      moq: 10,
      supplier: 'Tech Supplies India'
    },
    {
      id: '2',
      name: 'Cotton T-Shirts Bulk Pack',
      price: 299,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Textiles',
      description: 'Comfortable cotton t-shirts, perfect for retail',
      stock: 200,
      brand: 'ComfortWear',
      sku: 'CW-TS-002',
      rating: 4.2,
      moq: 50,
      supplier: 'Textile Masters'
    },
    {
      id: '3',
      name: 'Organic Basmati Rice 25kg',
      price: 1899,
      image: 'https://images.pexels.com/photos/33239/wheat-cereal-grain-ripe.jpg?auto=compress&cs=tinysrgb&w=300',
      category: 'Food & Beverages',
      description: 'Premium organic basmati rice in bulk packaging',
      stock: 100,
      brand: 'NatureHarvest',
      sku: 'NH-BR-003',
      rating: 4.8,
      moq: 5,
      supplier: 'Organic Foods Ltd'
    },
    {
      id: '4',
      name: 'LED Bulbs Energy Efficient',
      price: 149,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: '9W LED bulbs with 3-year warranty',
      stock: 500,
      brand: 'BrightLight',
      sku: 'BL-LED-004',
      rating: 4.3,
      moq: 100,
      supplier: 'Lighting Solutions'
    },
    {
      id: '5',
      name: 'Stainless Steel Water Bottles',
      price: 199,
      image: 'https://images.pexels.com/photos/1127800/pexels-photo-1127800.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Household',
      description: 'Durable, BPA-free bottles for bulk orders',
      stock: 1200,
      brand: 'SteelMate',
      sku: 'SM-BTL-010',
      rating: 4.4,
      moq: 100,
      supplier: 'BottleWorks Co.'
    },
    {
      id: '6',
      name: 'Organic Cotton Towels Set',
      price: 499,
      image: 'https://images.pexels.com/photos/6782474/pexels-photo-6782474.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Textiles',
      description: 'Soft, eco-friendly towels for hotels and retail',
      stock: 300,
      brand: 'EcoSoft',
      sku: 'ES-TWL-006',
      rating: 4.6,
      moq: 20,
      supplier: 'Eco Fabrics India'
    },
    {
      id: '7',
      name: 'LED Smart Desk Lamp',
      price: 899,
      image: 'https://images.pexels.com/photos/820854/pexels-photo-820854.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: 'Adjustable brightness with USB charging',
      stock: 150,
      brand: 'BrightWorks',
      sku: 'BW-LMP-021',
      rating: 4.1,
      moq: 10,
      supplier: 'Smart Lighting Pvt Ltd'
    },
    {
      id: '8',
      name: 'Reusable Shopping Bags (Pack of 50)',
      price: 249,
      image: 'https://images.pexels.com/photos/1151237/pexels-photo-1151237.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Misc',
      description: 'Strong, eco-friendly bags for retail chains',
      stock: 2000,
      brand: 'GreenCarry',
      sku: 'GC-BAG-050',
      rating: 4.0,
      moq: 200,
      supplier: 'Green Carry Corp'
    },
    {
      id: '9',
      name: 'Ergonomic Office Chair',
      price: 3499,
      image: 'https://images.pexels.com/photos/279639/pexels-photo-279639.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Furniture',
      description: 'Mesh back with adjustable lumbar support for long hours',
      stock: 250,
      brand: 'ErgoFlex',
      sku: 'EF-CHR-018',
      rating: 4.5,
      moq: 5,
      supplier: 'Office Furniture Hub'
    },
    {
      id: '10',
      name: 'Industrial Safety Gloves (Pack of 100)',
      price: 1299,
      image: 'https://images.pexels.com/photos/3831849/pexels-photo-3831849.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Safety',
      description: 'Nitrile-coated, cut-resistant gloves for industrial use',
      stock: 800,
      brand: 'SafeGrip',
      sku: 'SG-GLV-100',
      rating: 4.2,
      moq: 100,
      supplier: 'SafetyMart'
    },
    {
      id: '11',
      name: 'Bluetooth Barcode Scanner',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1580974928067-3e1f7c2f15c9?q=80&w=300&auto=format&fit=crop',
      category: 'Electronics',
      description: '2D barcode scanner with USB dongle and BT connectivity',
      stock: 120,
      brand: 'ScanPro',
      sku: 'SP-BAR-022',
      rating: 4.3,
      moq: 10,
      supplier: 'ProScan India'
    },
    {
      id: '12',
      name: 'Heavy-Duty Storage Racks',
      price: 5499,
      image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Industrial',
      description: 'Powder-coated steel racks for warehouses and shops',
      stock: 75,
      brand: 'StorMax',
      sku: 'SM-RCK-030',
      rating: 4.6,
      moq: 5,
      supplier: 'Warehousing Solutions'
    },
    {
      id: '13',
      name: 'Solar Power Bank 20,000mAh',
      price: 1399,
      image: 'https://images.pexels.com/photos/4242970/pexels-photo-4242970.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Electronics',
      description: 'High-capacity solar power bank with dual USB output',
      stock: 400,
      brand: 'SunCharge',
      sku: 'SC-PBK-020',
      rating: 4.1,
      moq: 50,
      supplier: 'SunTech Traders'
    },
    {
      id: '14',
      name: 'Reusable Steel Straws (Pack of 100)',
      price: 599,
      image: 'https://images.pexels.com/photos/4252871/pexels-photo-4252871.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Household',
      description: 'Food-grade stainless steel straws with cleaning brushes',
      stock: 1000,
      brand: 'EcoSip',
      sku: 'ES-STR-100',
      rating: 4.0,
      moq: 200,
      supplier: 'Eco Supply Co.'
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
      sku: 'OP-PPR-010',
      rating: 4.3,
      moq: 20,
      supplier: 'Office Essentials Ltd'
    }
  ];

  const allProducts = [...sampleProducts, ...products];
  const categories = ['all', 'Electronics', 'Textiles', 'Food & Beverages', 'Pharmaceuticals', 'Automotive'];

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.brand && !product.brand?.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.priceRange[0] > 0 && product.price < filters.priceRange[0]) return false;
    if (filters.priceRange[1] < 10000 && product.price > filters.priceRange[1]) return false;
    if (filters.inStock && product.stock === 0) return false;
    if (filters.verifiedSupplier && !product.supplier) return false;
    if (filters.topRated && (product.rating || 0) < 4.0) return false;
    return true;
  });

  const handleBuyNow = (product: Product) => {
    onAddToCart(product, 1);
    onNavigate('checkout');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
              <div className="flex-shrink-0 ml-2">
        <h1 className="text-xl font-bold text-gray-900">Qwipo</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="Search products..."
                />
                <button
                  onClick={() => setShowImageSearch(!showImageSearch)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Camera className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
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

              <button
                onClick={() => onNavigate('cart')}
                className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
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
                  onNavigate('track-order');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <MapPin className="h-5 w-5" />
                <span>Track Order</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('your-orders');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Package className="h-5 w-5" />
                <span>Your Orders</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('profile');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('settings');
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">
            Discover new products and manage your orders efficiently
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>

          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0] || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [Number(e.target.value) || 0, prev.priceRange[1]]
                    }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1] || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value) || 10000]
                    }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <select
                  value={filters.material}
                  onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Material</option>
                  <option value="cotton">Cotton</option>
                  <option value="plastic">Plastic</option>
                  <option value="metal">Metal</option>
                  <option value="wood">Wood</option>
                  <option value="glass">Glass</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select
                  value={filters.color}
                  onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                </select>
              </div>

              {/* MOQ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Order Qty</label>
                <input
                  type="number"
                  placeholder="Enter MOQ"
                  value={filters.moq}
                  onChange={(e) => setFilters(prev => ({ ...prev, moq: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* Lead Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time</label>
                <select
                  value={filters.leadTime}
                  onChange={(e) => setFilters(prev => ({ ...prev, leadTime: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Lead Time</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="3-7 days">3-7 days</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                </select>
              </div>

              {/* Country of Origin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin</label>
                <select
                  value={filters.countryOfOrigin}
                  onChange={(e) => setFilters(prev => ({ ...prev, countryOfOrigin: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Country</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="USA">USA</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select
                  value={filters.businessType}
                  onChange={(e) => setFilters(prev => ({ ...prev, businessType: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Type</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="distributor">Distributor</option>
                </select>
              </div>
            </div>

            {/* Checkbox Filters */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { key: 'inStock', label: 'In Stock' },
                { key: 'freeShipping', label: 'Free Shipping' },
                { key: 'verifiedSupplier', label: 'Verified Supplier' },
                { key: 'topRated', label: 'Top Rated' },
                { key: 'onSale', label: 'On Sale' },
                { key: 'newArrivals', label: 'New Arrivals' },
                { key: 'bestSellers', label: 'Best Sellers' },
                { key: 'ecoFriendly', label: 'Eco-Friendly' },
                { key: 'warranty', label: 'With Warranty' }
              ].map(filter => (
                <label key={filter.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters[filter.key as keyof typeof filters] as boolean}
                    onChange={(e) => setFilters(prev => ({ ...prev, [filter.key]: e.target.checked }))}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{filter.label}</span>
                </label>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({
                  priceRange: [0, 10000],
                  brand: '', material: '', color: '', size: '', weight: '',
                  moq: '', leadTime: '', inStock: false, freeShipping: false,
                  verifiedSupplier: false, topRated: false, onSale: false,
                  newArrivals: false, bestSellers: false, certifications: '',
                  ecoFriendly: false, countryOfOrigin: '', businessType: '',
                  warranty: false
                })}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable'; }}
                  className="w-full h-48 object-cover rounded-t-lg transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                  (product.stock ?? 0) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {(product.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{product.category}</span>
                    {product.brand && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{product.brand}</span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                    {product.moq && (
                      <p className="text-xs text-gray-500">MOQ: {product.moq}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilters({
                  priceRange: [0, 10000],
                  brand: '', material: '', color: '', size: '', weight: '',
                  moq: '', leadTime: '', inStock: false, freeShipping: false,
                  verifiedSupplier: false, topRated: false, onSale: false,
                  newArrivals: false, bestSellers: false, certifications: '',
                  ecoFriendly: false, countryOfOrigin: '', businessType: '',
                  warranty: false
                });
              }}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default CustomerDashboard;