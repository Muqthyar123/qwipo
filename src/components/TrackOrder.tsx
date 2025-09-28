import React from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Phone, Clock } from 'lucide-react';

interface TrackOrderProps {
  onBack: () => void;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ onBack }) => {
  const orderDetails = {
    id: 'ORD-001',
    status: 'shipped',
    estimatedDelivery: '2024-01-20',
    currentLocation: 'Mumbai Distribution Center',
    trackingSteps: [
      { status: 'Order Placed', date: '2024-01-15', time: '10:30 AM', completed: true },
      { status: 'Order Confirmed', date: '2024-01-15', time: '11:15 AM', completed: true },
      { status: 'Shipped', date: '2024-01-16', time: '2:45 PM', completed: true },
      { status: 'In Transit', date: '2024-01-17', time: '9:20 AM', completed: true },
      { status: 'Out for Delivery', date: '', time: '', completed: false },
      { status: 'Delivered', date: '', time: '', completed: false }
    ],
    deliveryAgent: {
      name: 'Suresh Patel',
      phone: '+91 9876543210',
      vehicle: 'TN 01 AB 1234'
    },
    products: [
      { name: 'Premium Wireless Headphones', quantity: 2, price: 2499 },
      { name: 'LED Bulbs Energy Efficient', quantity: 10, price: 149 }
    ],
    shippingAddress: {
      name: 'Rajesh Kumar',
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
              <p className="text-gray-600">Order #{orderDetails.id}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Order Status Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-blue-900 mb-2">
                    Your order is {orderDetails.status}
                  </h2>
                  <p className="text-blue-700">
                    Current location: {orderDetails.currentLocation}
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    Estimated delivery: {orderDetails.estimatedDelivery}
                  </p>
                </div>
                <Truck className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
              <div className="space-y-4">
                {orderDetails.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : index === orderDetails.trackingSteps.findIndex(s => !s.completed)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : index === orderDetails.trackingSteps.findIndex(s => !s.completed) ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-500">
                            {step.date} at {step.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Delivery Agent */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Agent</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{orderDetails.deliveryAgent.name}</p>
                      <p className="text-sm text-gray-600">Delivery Executive</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{orderDetails.deliveryAgent.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Vehicle: {orderDetails.deliveryAgent.vehicle}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                    <p>{orderDetails.shippingAddress.street}</p>
                    <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                    <p>{orderDetails.shippingAddress.zipCode}</p>
                  </div>
                </div>
                
                <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Change Address
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="border border-gray-200 rounded-lg">
                {orderDetails.products.map((product, index) => (
                  <div key={index} className={`p-4 ${index !== orderDetails.products.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ₹{(product.price * product.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;