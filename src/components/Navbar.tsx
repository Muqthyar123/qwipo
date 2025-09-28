import React, { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Users, ShoppingCart, HelpCircle, Settings, LogOut } from 'lucide-react';
import { Page, User } from '../App';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(shouldDark);
    document.documentElement.classList.toggle('dark', shouldDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const NavLink: React.FC<{ label: string; page: Page } > = ({ label, page }) => (
    <button
      onClick={() => { onNavigate(page); setOpen(false); }}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
    >
      {label}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <button
              onClick={() => onNavigate('landing')}
              className="ml-3 text-lg font-bold text-gray-900 dark:text-white"
            >
        Qwipo
            </button>
          </div>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink label="Home" page="landing" />
            <NavLink label="Get Started" page="account-selection" />
            <NavLink label="Support" page="support-guide" />
            {user?.type === 'supplier' && (
              <>
                <NavLink label="Dashboard" page="supplier-dashboard" />
                <NavLink label="Add Product" page="add-product" />
                <NavLink label="Analytics" page="view-analytics" />
              </>
            )}
            {user?.type === 'customer' && (
              <>
                <NavLink label="Shop" page="customer-dashboard" />
                <NavLink label="Your Orders" page="your-orders" />
                <button
                  onClick={() => { onNavigate('cart'); setOpen(false); }}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Cart
                </button>
              </>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="hidden md:inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </button>

            {user ? (
              <button
                onClick={onLogout}
                className="hidden md:inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('supplier-login')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Supplier Login
                </button>
                <button
                  onClick={() => onNavigate('customer-login')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50"
                >
                  Customer Login
                </button>
              </div>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 space-y-2">
            <NavLink label="Home" page="landing" />
            <NavLink label="Get Started" page="account-selection" />
            <NavLink label="Support" page="support-guide" />
            <button
              onClick={() => { onNavigate('settings'); setOpen(false); }}
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </button>
            {user?.type === 'supplier' && (
              <>
                <NavLink label="Dashboard" page="supplier-dashboard" />
                <NavLink label="Add Product" page="add-product" />
                <NavLink label="Analytics" page="view-analytics" />
              </>
            )}
            {user?.type === 'customer' && (
              <>
                <NavLink label="Shop" page="customer-dashboard" />
                <NavLink label="Your Orders" page="your-orders" />
                <button
                  onClick={() => { onNavigate('cart'); setOpen(false); }}
                  className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Cart
                </button>
              </>
            )}
            {!user && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { onNavigate('supplier-login'); setOpen(false); }}
                  className="flex-1 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Supplier Login
                </button>
                <button
                  onClick={() => { onNavigate('customer-login'); setOpen(false); }}
                  className="flex-1 px-3 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50"
                >
                  Customer Login
                </button>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <button
                onClick={() => { onNavigate('support-guide'); setOpen(false); }}
                className="flex items-center text-sm text-gray-700 dark:text-gray-200"
              >
                <HelpCircle className="h-4 w-4 mr-1" /> Help
              </button>
              {user && (
                <button
                  onClick={() => { onLogout(); setOpen(false); }}
                  className="flex items-center text-sm text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;