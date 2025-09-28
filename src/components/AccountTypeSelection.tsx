import React from 'react';
import { ArrowLeft, Users, ShoppingCart } from 'lucide-react';

interface AccountTypeSelectionProps {
  onSelectType: (type: 'supplier' | 'customer') => void;
}

const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({ onSelectType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Account Type
          </h1>
          <p className="text-xl text-gray-600">
  Select how you want to participate in Qwipo marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Supplier Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-full inline-block mb-6">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Supplier</h2>
              <p className="text-gray-600 mb-8">
                Join as a supplier to sell your products in bulk to retailers and businesses
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>List your products and manage inventory</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Reach thousands of potential buyers</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Manage orders and analytics</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Bulk product management tools</span>
                </div>
              </div>

              <button
                onClick={() => onSelectType('supplier')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue as Supplier
              </button>
            </div>
          </div>

          {/* Customer Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-full inline-block mb-6">
                <ShoppingCart className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer</h2>
              <p className="text-gray-600 mb-8">
                Join as a customer to discover and purchase products from verified suppliers
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>Browse products from verified suppliers</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>AI-powered product recommendations</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>Bulk ordering with best prices</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>Track orders and manage purchases</span>
                </div>
              </div>

              <button
                onClick={() => onSelectType('customer')}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue as Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;