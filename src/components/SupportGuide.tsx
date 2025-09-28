import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronRight, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

interface SupportGuideProps {
  userType: 'supplier' | 'customer';
  onBack: () => void;
}

const SupportGuide: React.FC<SupportGuideProps> = ({ userType, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const supplierFAQs = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          q: 'How do I add my first product?',
          a: 'Navigate to your dashboard and click on "Add Product" in the Quick Actions section. Fill in all required details including product name, price, category, and description.'
        },
        {
          q: 'How do I manage my inventory?',
          a: 'Use the "Update Inventory" feature to modify stock quantities and prices. You can search for specific products and update multiple items at once.'
        },
        {
          q: 'How do I view my sales analytics?',
          a: 'Click on "View Analytics" to see detailed reports including revenue trends, top-performing products, and customer insights.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Order Management',
      questions: [
        {
          q: 'How do I process customer orders?',
          a: 'Go to "Customer Orders" to view all pending orders. You can confirm orders, update shipping status, and communicate with customers.'
        },
        {
          q: 'How do I handle bulk orders?',
          a: 'Bulk orders are automatically flagged in your order management system. You can offer special pricing and negotiate terms directly with customers.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      questions: [
        {
          q: 'When do I receive payments?',
          a: 'Payments are processed within 2-3 business days after order delivery confirmation. You can track payment status in your dashboard.'
        },
        {
          q: 'What are the platform fees?',
          a: 'We charge a small commission on each successful transaction. Detailed fee structure is available in your account settings.'
        }
      ]
    }
  ];

  const customerFAQs = [
    {
      id: 'shopping',
      title: 'Shopping & Ordering',
      questions: [
        {
          q: 'How do I search for products?',
          a: 'Use the search bar at the top of the page or browse by categories. You can also use image search by clicking the camera icon.'
        },
        {
          q: 'How do I place a bulk order?',
          a: 'Add products to your cart and proceed to checkout. For bulk quantities, you may be eligible for special discounts automatically applied at checkout.'
        },
        {
          q: 'Can I negotiate prices?',
          a: 'For large orders, you can contact suppliers directly through the platform to discuss pricing and terms.'
        }
      ]
    },
    {
      id: 'orders-tracking',
      title: 'Order Tracking',
      questions: [
        {
          q: 'How do I track my order?',
          a: 'Go to "Track Order" in the menu to see real-time updates on your order status, including shipping details and delivery estimates.'
        },
        {
          q: 'Can I change my delivery address?',
          a: 'You can change your delivery address before the order is shipped. Use the "Change Address" option in your order details.'
        }
      ]
    },
    {
      id: 'payments-returns',
      title: 'Payments & Returns',
      questions: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept UPI, credit/debit cards, net banking, and cash on delivery. All payments are secure and encrypted.'
        },
        {
          q: 'What is your return policy?',
          a: 'We offer a 7-day return policy for most products. Items should be in original condition with packaging.'
        }
      ]
    }
  ];

  const faqs = userType === 'supplier' ? supplierFAQs : customerFAQs;

  const filteredFAQs = faqs.map(section => ({
    ...section,
    questions: section.questions.filter(
      qa => qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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
              <h1 className="text-2xl font-bold text-gray-900">Support Guide</h1>
              <p className="text-gray-600">
                {userType === 'supplier' ? 'Supplier' : 'Customer'} Help Center
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for help topics..."
              />
            </div>
          </div>

          {/* Contact Options */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Live Chat</p>
                  <p className="text-sm text-blue-700">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Phone className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Call Support</p>
                  <p className="text-sm text-green-700">+91 1800-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-900">Email Support</p>
      <p className="text-sm text-purple-700">support@qwipo.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No help topics found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                      {expandedSection === section.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSection === section.id && (
                      <div className="border-t border-gray-200">
                        {section.questions.map((qa, index) => (
                          <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                            <h4 className="font-medium text-gray-900 mb-2">{qa.q}</h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{qa.a}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">
              {userType === 'supplier' ? 'Supplier Tips' : 'Shopping Tips'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {userType === 'supplier' ? (
                <>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Keep your product images high-quality and well-lit</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Update inventory regularly to avoid overselling</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Respond to customer inquiries within 24 hours</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Offer competitive bulk pricing to attract more orders</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Compare prices from multiple suppliers before ordering</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Check supplier ratings and reviews</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Order in bulk to get better prices and discounts</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Track your orders regularly for timely delivery</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportGuide;