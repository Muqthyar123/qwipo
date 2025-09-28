import React from 'react';
import { Users, Mail, HelpCircle, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
  <span className="ml-2 font-bold text-gray-900 dark:text-white">Qwipo</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Smart B2B marketplace connecting verified suppliers and buyers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white" aria-label="Support">
                  <span className="inline-flex items-center"><HelpCircle className="h-4 w-4 mr-2" /> Support Guide</span>
                </a>
              </li>
              <li><span className="text-gray-500 dark:text-gray-400">Privacy & Terms</span></li>
              <li><span className="text-gray-500 dark:text-gray-400">Status</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
  <li className="inline-flex items-center text-gray-600 dark:text-gray-300"><Mail className="h-4 w-4 mr-2" /> support@qwipo.example</li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Github className="h-4 w-4" />
                <Twitter className="h-4 w-4" />
              </li>
            </ul>
          </div>
        </div>
  <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Qwipo. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;