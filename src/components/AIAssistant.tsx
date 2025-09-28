import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI shopping assistant. How can I help you find the perfect products today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses: Record<string, string> = {
    'hello': "Hello! I'm here to help you with your shopping needs. What are you looking for?",
    'hi': "Hi there! How can I assist you in finding the right products?",
    'help': "I can help you with:\n• Finding products\n• Comparing prices\n• Checking stock availability\n• Bulk order recommendations\n• Product specifications",
    'products': "I can help you find various products like electronics, textiles, food items, and more. What specific category are you interested in?",
    'electronics': "We have a wide range of electronics including headphones, LED bulbs, mobile accessories, and more. What specific electronics product are you looking for?",
    'price': "I can help you find products within your budget. What's your price range, and what type of product are you looking for?",
    'bulk': "For bulk orders, we offer special discounts and MOQ options. What products do you need in bulk quantities?",
    'shipping': "We offer free shipping on orders above ₹500 and expedited shipping options. Where would you like to ship your order?",
    'payment': "We accept various payment methods including UPI, credit/debit cards, net banking, and cash on delivery.",
    'return': "We have a 7-day return policy for most products. Items should be in original condition with packaging."
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default responses for common patterns
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return "Based on your profile and purchase history, I recommend checking out our electronics section, especially wireless headphones and LED bulbs which are popular with customers similar to you.";
    }
    
    if (lowerMessage.includes('stock') || lowerMessage.includes('available')) {
      return "I can check stock availability for specific products. Please tell me which product you're interested in, and I'll provide current stock information.";
    }
    
    if (lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
      return "We have ongoing discounts on bulk orders! Electronics have 15% off on orders above ₹10,000, and textiles have 20% off on bulk purchases.";
    }

    // Default response
    return "I understand you're asking about: '" + userMessage + "'. Let me help you with that. Could you provide more specific details about what you're looking for?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h3 className="font-semibold">AI Shopping Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500' : 'text-blue-200'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;