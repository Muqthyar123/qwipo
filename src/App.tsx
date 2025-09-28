import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AccountTypeSelection from './components/AccountTypeSelection';
import SupplierLogin from './components/SupplierLogin';
import SupplierRegister from './components/SupplierRegister';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import SupplierDashboard from './components/SupplierDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import AddProduct from './components/AddProduct';
import UpdateInventory from './components/UpdateInventory';
import ViewAnalytics from './components/ViewAnalytics';
import CustomerOrders from './components/CustomerOrders';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import TrackOrder from './components/TrackOrder';
import Settings from './components/Settings';
import YourOrders from './components/YourOrders';
import Profile from './components/Profile';
import SupportGuide from './components/SupportGuide';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export type Page = 
  | 'landing'
  | 'account-selection'
  | 'supplier-login'
  | 'supplier-register'
  | 'customer-login' 
  | 'customer-register'
  | 'supplier-dashboard'
  | 'customer-dashboard'
  | 'add-product'
  | 'update-inventory'
  | 'view-analytics'
  | 'customer-orders'
  | 'edit-product'
  | 'cart'
  | 'checkout'
  | 'track-order'
  | 'settings'
  | 'your-orders'
  | 'profile'
  | 'support-guide';

export interface User {
  type: 'supplier' | 'customer';
  name: string;
  email: string;
  businessName?: string;
  language?: string;
  goodsTypes?: string[];
  homeAddress?: string;
  workplaceAddress?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  brand?: string;
  sku?: string;
  material?: string;
  color?: string;
  size?: string;
  weight?: string;
  moq?: number;
  leadTime?: string;
  supplier?: string;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pageHistory, setPageHistory] = useState<Page[]>([]);

  const navigateTo = (page: Page) => {
    setPageHistory(prev => [...prev, currentPage]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory(prev => prev.slice(0, -1));
      setCurrentPage(previousPage);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('landing');
    setPageHistory([]);
    setCart([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => navigateTo('account-selection')} />;
      case 'account-selection':
        return <AccountTypeSelection onSelectType={(type) => navigateTo(`${type}-login` as Page)} />;
      case 'supplier-login':
        return (
          <SupplierLogin
            onLogin={(userData) => {
              setUser({ ...userData, type: 'supplier' });
              navigateTo('supplier-dashboard');
            }}
            onRegister={() => navigateTo('supplier-register')}
            onBack={goBack}
          />
        );
      case 'supplier-register':
        return (
          <SupplierRegister
            onRegister={() => navigateTo('supplier-login')}
            onBack={goBack}
          />
        );
      case 'customer-login':
        return (
          <CustomerLogin
            onLogin={(userData) => {
              setUser({ ...userData, type: 'customer' });
              navigateTo('customer-dashboard');
            }}
            onRegister={() => navigateTo('customer-register')}
            onBack={goBack}
          />
        );
      case 'customer-register':
        return (
          <CustomerRegister
            onRegister={() => navigateTo('customer-login')}
            onBack={goBack}
          />
        );
      case 'supplier-dashboard':
        return (
          <SupplierDashboard
            user={user!}
            products={products}
            onNavigate={navigateTo}
            onLogout={logout}
            onEditProduct={(product) => {
              setSelectedProduct(product);
              navigateTo('edit-product');
            }}
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            user={user!}
            products={products}
            cart={cart}
            onNavigate={navigateTo}
            onLogout={logout}
            onAddToCart={addToCart}
          />
        );
      case 'add-product':
        return (
          <AddProduct
            onAddProduct={addProduct}
            onBack={goBack}
          />
        );
      case 'update-inventory':
        return (
          <UpdateInventory
            products={products}
            onUpdateProduct={updateProduct}
            onBack={goBack}
          />
        );
      case 'view-analytics':
        return (
          <ViewAnalytics
            products={products}
            onBack={goBack}
          />
        );
      case 'customer-orders':
        return (
          <CustomerOrders
            onBack={goBack}
          />
        );
      case 'edit-product':
        return (
          <EditProduct
            product={selectedProduct!}
            onUpdateProduct={updateProduct}
            onBack={goBack}
          />
        );
      case 'cart':
        return (
          <Cart
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={() => navigateTo('checkout')}
            onBack={goBack}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            onPlaceOrder={clearCart}
            onBack={goBack}
          />
        );
      case 'track-order':
        return <TrackOrder onBack={goBack} />;
      case 'settings':
        return <Settings user={user!} onBack={goBack} />;
      case 'your-orders':
        return <YourOrders onBack={goBack} />;
      case 'profile':
        return <Profile user={user!} onUpdateUser={setUser} onBack={goBack} />;
      case 'support-guide':
        return <SupportGuide userType={user?.type || 'customer'} onBack={goBack} />;
      default:
        return <LandingPage onGetStarted={() => navigateTo('account-selection')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar user={user} onNavigate={navigateTo} onLogout={logout} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;