import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Star } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  const feedbacks = [
    {
      id: 1,
      type: 'buyer',
      name: 'Rajesh Kumar',
      business: 'Kumar General Store',
      rating: 5,
      comment: 'Qwipo has revolutionized my inventory management. I can easily find bulk suppliers and get the best deals!'
    },
    {
      id: 2,
      type: 'seller',
      name: 'Priya Sharma',
      business: 'Sharma Textiles',
      rating: 5,
      comment: 'As a supplier, Qwipo helps me reach more retailers efficiently. The platform is user-friendly and reliable.'
    },
    {
      id: 3,
      type: 'buyer',
      name: 'Mohammed Ali',
      business: 'Ali Enterprises',
      rating: 4,
      comment: 'Great platform for B2B transactions. The bulk ordering system saves me time and money.'
    },
    {
      id: 4,
      type: 'seller',
      name: 'Sunita Patel',
      business: 'Patel Industries',
      rating: 5,
      comment: 'Excellent reach to customers. My sales have increased by 40% since joining Qwipo.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextFeedback = () => {
    setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setCurrentFeedback((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Qwipo</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart B2B
              <span className="text-blue-600 block">Marketplace</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect suppliers and buyers in a seamless digital marketplace. 
              Discover bulk products, manage inventory, and grow your business with intelligent recommendations.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
                <div className="text-gray-600">Active Buyers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">8,500+</div>
                <div className="text-gray-600">Verified Sellers</div>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Our Users Say
            </h2>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      feedbacks[currentFeedback].type === 'buyer' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      <Users className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feedbacks[currentFeedback].name}
                    </h3>
                    <p className="text-gray-600">{feedbacks[currentFeedback].business}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {feedbacks[currentFeedback].type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < feedbacks[currentFeedback].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 text-lg italic">
                  "{feedbacks[currentFeedback].comment}"
                </p>
              </div>
              
              {/* Navigation buttons */}
              <button
                onClick={prevFeedback}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextFeedback}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {feedbacks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeedback(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentFeedback ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Qwipo?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Verified Network
                </h3>
                <p className="text-gray-600">
                  Connect with trusted suppliers and buyers in our verified network
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Recommendations
                </h3>
                <p className="text-gray-600">
                  AI-powered suggestions to optimize your business decisions
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Bulk Solutions
                </h3>
                <p className="text-gray-600">
                  Specialized tools for bulk ordering and inventory management
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;