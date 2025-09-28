import React from 'react';
import { X, AlertTriangle, TrendingDown, Users, ShoppingCart, Target } from 'lucide-react';

interface ProblemOverviewProps {
  onClose: () => void;
}

const ProblemOverview: React.FC<ProblemOverviewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Problem Overview</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Problem Statement */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Current Market Challenges</h3>
            <p className="text-red-800 leading-relaxed">
              Retailers on Qwipo's B2B marketplace face significant challenges in product discovery and purchasing optimization. 
              Current shopping patterns show repetitive buying behavior and missed opportunities for discovering relevant products, 
              leading to suboptimal business outcomes for both retailers and distributors.
            </p>
          </div>

          {/* Key Problems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingDown className="h-6 w-6 text-red-600" />
                <h4 className="font-semibold text-gray-900">Poor Product Discovery</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Retailers miss 60%+ of relevant products in the marketplace, limiting their ability to diversify inventory 
                and meet customer demands effectively.
              </p>
              <div className="bg-red-100 rounded p-3">
                <p className="text-red-800 text-xs font-medium">Impact: Limited inventory diversity</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Repetitive Purchase Patterns</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Limited variation in orders leads to missed cross-selling and upselling opportunities, 
                constraining business growth for retailers.
              </p>
              <div className="bg-orange-100 rounded p-3">
                <p className="text-orange-800 text-xs font-medium">Impact: Reduced revenue potential</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-6 w-6 text-yellow-600" />
                <h4 className="font-semibold text-gray-900">Stagnant Order Values</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Average Order Value (AOV) growth has plateaued due to lack of intelligent product suggestions 
                and personalized recommendations.
              </p>
              <div className="bg-yellow-100 rounded p-3">
                <p className="text-yellow-800 text-xs font-medium">Impact: Flat revenue growth</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Low Customer Retention</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                35% of retailers become inactive within 6 months due to poor shopping experience 
                and inability to find relevant products efficiently.
              </p>
              <div className="bg-purple-100 rounded p-3">
                <p className="text-purple-800 text-xs font-medium">Impact: High churn rate</p>
              </div>
            </div>
          </div>

          {/* Solution Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Required Solution</h3>
            <p className="text-blue-800 mb-4">
              Design and develop an intelligent product recommendation system for Qwipo's B2B marketplace that helps retailers 
              (kirana stores, restaurants, small businesses) discover relevant products, increases their average order value by 15-20%, 
              and improve repeat purchase behavior by 25% through personalized suggestions based on shopping patterns and purchase history.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Key Objectives:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• User Behavior Analytics</li>
                  <li>• Purchase Pattern Recognition</li>
                  <li>• Personalization Engine</li>
                  <li>• Mobile Integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Performance Standards:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• API response time &lt; 200ms</li>
                  <li>• Handle 10,000+ retailer profiles</li>
                  <li>• Support 1,000+ concurrent users</li>
                  <li>• 99.9% uptime availability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About Qwipo</h3>
            <p className="text-gray-700 mb-4">
              <strong>Industry:</strong> B2B Retail
            </p>
            <p className="text-gray-700">
              Qwipo bridges the gap for traditional vendors, manufacturers, and suppliers, providing digital tools, 
              seamless logistics, and financing support to compete effectively in today's digitized market.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Suggested Tech Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-green-900 mb-2">Web Development</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Node.js with Express/Fastify</li>
                  <li>• Python with Flask/FastAPI</li>
                  <li>• PostgreSQL/MongoDB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-900 mb-2">AI/ML Framework</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Python scikit-learn</li>
                  <li>• TensorFlow/PyTorch</li>
                  <li>• OpenAI/Gemini</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-900 mb-2">API & Integration</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• REST/GraphQL APIs</li>
                  <li>• WebSocket for real-time</li>
                  <li>• API Gateway patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemOverview;