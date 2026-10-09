import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import PackagesSection from "./components/PackagesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SuccessModal from "./components/SuccessModal";
import CartCheckoutFlow from "./components/CartCheckoutFlow";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import ImageWithFallback from "./components/ImageWithFallback";
import ProductDetailPage from "./components/ProductDetailPage";
import MobileBottomNav from "./components/MobileBottomNav";

export default function App({ user: propUser, setUser: setParentUser, onLogout: parentLogout }) {
  const [view, setView] = useState("home"); // home | products | login | cart | register | productDetail
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [previousView, setPreviousView] = useState("home"); // Track where we came from
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(null);
  const [localUser, setLocalUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const user = propUser !== undefined ? propUser : localUser;
  const setUser = (value) => {
    if (setParentUser) setParentUser(value);
    setLocalUser(value);
  };
  const [checkoutActive, setCheckoutActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [flyingItem, setFlyingItem] = useState(null);
  const cartButtonRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => {
    setSidebarOpen(false);
    setLogoutPrompt(false);
  };

  useEffect(() => {
    // Disable background scrolling when sidebar is open
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      
      // Handle Escape key to close sidebar
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeSidebar();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const requestLogout = () => setLogoutPrompt(true);
  const cancelLogout = () => setLogoutPrompt(false);
  const confirmLogout = () => {
    setLogoutPrompt(false);
    setSidebarOpen(false);
    handleLogout();
  };

  const addToCart = (p, event) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });

    if (event?.currentTarget && cartButtonRef.current) {
      const buttonRect = cartButtonRef.current.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      const endX = buttonRect.left + buttonRect.width / 2;
      const endY = buttonRect.top + buttonRect.height / 2;

      setFlyingItem({
        id: `${p.id}-${Date.now()}`,
        image: p.image,
        startX,
        startY,
        endX,
        endY,
      });

      window.setTimeout(() => setFlyingItem(null), 2000);
    }
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0)
    );
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setView("home");
    setCheckoutActive(false);
    setSuccess(null);
    setCart([]);
    localStorage.removeItem("user");
    if (parentLogout) {
      parentLogout();
    }
    // Redirect to home page
    window.location.href = "/";
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.qty * Math.round(item.price * (1 - item.discountPercent / 100)),
    0
  );

  const handlePaymentSuccess = (res) => {
    setSuccess({
      type: "payment",
      title: "Payment Successful",
      message: "Your order has been placed successfully.",
      paymentId: res?.razorpay_payment_id,
    });
    setCart([]);
    setCheckoutActive(false);
    setView("home");
  };

  const handleAuthSuccess = (userInfo, nextView = "home", showSuccess = true) => {
    setUser(userInfo);
    if (showSuccess) {
      setSuccess({
        type: "auth",
        title: userInfo?.email ? "Login Successful" : "Registration Successful",
        message: userInfo?.email
          ? "Welcome back! You are now signed in."
          : "Your account is ready. You are now signed in.",
      });
    }
    setView(nextView);
  };

  const handleLoginSuccess = (userInfo) => {
    handleAuthSuccess(userInfo, "home");
  };

  const handleRegisterSuccess = (userInfo) => {
    handleAuthSuccess(userInfo, "home");
  };

  const handleRequireLogin = () => {
    setView("login");
  };

  const handleNavigateToProduct = (productId) => {
    if (productId === null) {
      // Going back - return to previous view (shop or home)
      setView(previousView);
      setSelectedProductId(null);
    } else {
      // Navigate to product detail - save current view as previous
      setPreviousView(view);
      setView("productDetail");
      setSelectedProductId(productId);
    }
  };

  // Modern Product Grid (Products view only)
  function ProductsView() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("popular"); // popular, price-asc, price-desc, newest
    const [filterOpen, setFilterOpen] = useState(false);
    
    let filteredProducts = products.filter(
      (product) =>
        (product.title || product.name)
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    // Sort products
    if (sortBy === "price-asc") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filteredProducts = [...filteredProducts].reverse();
    }

    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-olive-900 mb-8 text-center">All Products</h2>
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-sand-200 bg-sand-50 text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 transition-colors shadow-soft"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-olive-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Sticky Filter/Sort Bar - Mobile: Always visible, Desktop: Top bar */}
          <div className="sticky top-12 md:top-16 z-30 bg-sand-50 border-b border-sand-200 py-3 md:py-4 mb-4 md:mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-2 md:gap-4">
              {/* Filter button - Mobile only */}
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-sand-200 text-olive-700 hover:bg-sand-100 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2 md:gap-3 ml-auto">
                <label className="hidden sm:inline text-sm font-medium text-olive-700">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 md:px-4 py-2 rounded-lg border border-sand-200 bg-white text-olive-700 text-sm md:text-base font-medium hover:border-burnt-300 focus:outline-none focus:border-burnt-500 transition-colors cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Product count */}
              <div className="hidden md:block text-sm text-olive-600 font-medium ml-2">
                {filteredProducts.length} items
              </div>
            </div>

            {/* Mobile filter options (expandable) */}
            {filterOpen && (
              <div className="md:hidden mt-3 pt-3 border-t border-sand-200 space-y-2">
                <div className="text-xs font-semibold text-olive-800 mb-2">Filter Options</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 rounded-lg border border-sand-200 bg-white text-olive-700 text-sm font-medium hover:bg-sand-100 transition-colors">
                    Price Range
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-sand-200 bg-white text-olive-700 text-sm font-medium hover:bg-sand-100 transition-colors">
                    Category
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 justify-items-stretch">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                onView={() => handleNavigateToProduct(product.id)}
              />
            ))}
          </div>
          <ProductDetailModal
            open={modalOpen}
            product={modalProduct}
            onClose={() => setModalOpen(false)}
            onAdd={addToCart}
          />
        </div>
      </div>
    );
  }

  // Cart view section - Mobile-optimized
  function CartView({ user, cart, updateQty, onRequireLogin, setShowPayment }) {
    const subtotal = cart.reduce(
      (sum, item) =>
        sum + item.qty * Math.round(item.price * (1 - item.discountPercent / 100)),
      0
    );
    const delivery = cart.length > 0 ? 50 : 0;
    const total = subtotal + delivery;

    return (
      <div className="pb-0 md:pb-8" style={{ paddingBottom: cart.length > 0 ? 'calc(3.5rem + env(safe-area-inset-bottom))' : '0' }}>
        {/* Mobile: Full-width content with minimal padding */}
        <div className="md:max-w-4xl md:mx-auto">
          {/* Page Header */}
          <div className="px-4 py-3 md:py-8 bg-sand-50 border-b border-sand-200">
            <h2 className="font-display font-bold text-olive-900 md:text-3xl" style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--text-h2-lh)' }}>
              Your Cart {cart.length > 0 && <span className="text-olive-600">({cart.length})</span>}
            </h2>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-12 px-4 md:py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand-200 flex items-center justify-center md:w-20 md:mb-6">
                <svg className="w-8 h-8 text-olive-400 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-olive-900 mb-2 md:text-2xl" style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--text-h3-lh)' }}>
                Your cart is empty
              </h3>
              <p className="text-olive-600 mb-4" style={{ fontSize: 'var(--text-body)' }}>Start adding some products!</p>
              <button
                onClick={() => onRequireLogin ? onRequireLogin() : setView("products")}
                className="mobile-button-lg bg-burnt-500 text-sand-50 hover:bg-burnt-600 transition-colors md:inline-block md:px-6 md:py-3 md:rounded-xl md:h-auto"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items - Compact horizontal rows */}
              <div className="bg-white">
                {cart.map((item, index) => {
                  const itemTotal = item.qty * Math.round(item.price * (1 - item.discountPercent / 100));
                  return (
                    <div key={item.id} className={`px-4 py-2.5 md:py-3 ${index < cart.length - 1 ? 'border-b border-sand-200' : ''}`}>
                      <div className="flex gap-2.5 mb-2 md:gap-3">
                        {/* Product thumbnail */}
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-sand-100 md:w-20 md:h-20">
                          <ImageWithFallback 
                            src={item.image} 
                            alt={item.title || item.name} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                        
                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-olive-900 line-clamp-2 mb-0.5 md:text-base" style={{ fontSize: 'var(--text-sm)' }}>
                            {item.title || item.name}
                          </h3>
                          <p className="text-olive-600" style={{ fontSize: 'var(--text-xs)' }}>
                            ₹{Math.round(item.price * (1 - item.discountPercent / 100))} each
                          </p>
                          <p className="text-burnt-600 font-bold" style={{ fontSize: 'var(--text-sm)' }}>
                            ₹{itemTotal}
                          </p>
                        </div>
                      </div>

                      {/* Quantity stepper and remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-sand-100 rounded-lg px-1.5 py-1">
                          <button 
                            onClick={() => updateQty(item.id, Math.max(item.qty - 1, 0))} 
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-olive-900 hover:bg-sand-200 rounded transition-colors font-bold text-sm"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-semibold text-olive-900 w-6 text-center text-xs md:w-8 md:text-sm">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, item.qty + 1)} 
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-olive-900 hover:bg-sand-200 rounded transition-colors font-bold text-sm"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button 
                          onClick={() => updateQty(item.id, 0)} 
                          className="flex items-center gap-1 text-burnt-500 hover:text-burnt-600 font-medium transition-colors"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary - Compact on mobile */}
              <div className="px-4 py-3 md:py-4 bg-sand-50 border-y border-sand-200">
                <h3 className="font-semibold text-olive-900 mb-2 md:mb-3 uppercase tracking-wide" style={{ fontSize: 'var(--text-xs)' }}>Order Summary</h3>
                <div className="space-y-1.5 md:space-y-2" style={{ fontSize: 'var(--text-sm)' }}>
                  <div className="flex justify-between text-olive-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-olive-700">
                    <span>Delivery</span>
                    <span className="font-semibold">{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                  </div>
                  <div className="flex justify-between text-olive-900 font-bold pt-1.5 md:pt-2 border-t border-sand-300" style={{ fontSize: 'var(--text-body)' }}>
                    <span>Total</span>
                    <span className="text-burnt-600">₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Bar - Mobile */}
              <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-sand-200 px-4 py-3 z-30 safe-bottom flex items-center justify-between gap-3" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
                <div className="flex flex-col">
                  <p className="text-olive-600 font-medium" style={{ fontSize: 'var(--text-xs)' }}>Total</p>
                  <p className="font-display font-bold text-burnt-600" style={{ fontSize: 'var(--text-h2)' }}>₹{total}</p>
                </div>
                <button
                  onClick={setShowPayment}
                  className="mobile-button-lg bg-burnt-500 text-sand-50 hover:bg-burnt-600 transition-colors shadow-sm flex-shrink-0"
                >
                  Checkout
                </button>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden md:block px-4 py-6">
                <button
                  onClick={setShowPayment}
                  className="w-full bg-burnt-500 text-sand-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-soft hover:bg-burnt-600 hover:shadow-soft-lg transition-all duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-sand-100 via-terra-50 to-sand-200 font-body overflow-x-hidden">
      <div className="relative z-10 w-full">
        <Header
          onNavigate={setView}
          user={user}
          onLogout={handleLogout}
          onOpenSidebar={openSidebar}
          onOpenCart={() => { setView("cart"); setCheckoutActive(false); }}
          cartCount={cart.reduce((s, p) => s + p.qty, 0)}
          cartRef={cartButtonRef}
        />
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Dimmed blurred backdrop */}
            <button
              type="button"
              onClick={closeSidebar}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
              aria-label="Close sidebar"
            />
            
            {/* Sidebar panel with slide animation */}
            <aside 
              className="relative z-50 w-full max-w-[320px] bg-sand-50 shadow-2xl flex flex-col max-h-screen overflow-hidden rounded-r-3xl animate-slide-in"
              style={{
                animation: 'slideIn 300ms ease-out'
              }}
            >
              <style>{`
                @keyframes slideIn {
                  from {
                    transform: translateX(-100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateX(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                .menu-item-1 { animation: fadeIn 300ms ease-out 40ms both; }
                .menu-item-2 { animation: fadeIn 300ms ease-out 80ms both; }
                .menu-item-3 { animation: fadeIn 300ms ease-out 120ms both; }
                .menu-item-4 { animation: fadeIn 300ms ease-out 160ms both; }
                .menu-item-5 { animation: fadeIn 300ms ease-out 200ms both; }
              `}</style>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-sand-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sand-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-olive-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <span className="font-display text-xl font-bold text-olive-900">ScienceHub</span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="w-9 h-9 rounded-full bg-sand-200 text-olive-900 flex items-center justify-center hover:bg-olive-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burnt-500"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {/* Navigation Links */}
                <nav className="space-y-1">
                  <button
                    onClick={() => { setView("home"); closeSidebar(); }}
                    className={`menu-item-1 w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:translate-x-1 ${
                      view === "home" 
                        ? "bg-terra-50 border-l-4 border-burnt-500 text-burnt-700" 
                        : "text-olive-900 hover:bg-sand-100"
                    }`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold">Home</span>
                  </button>

                  <button
                    onClick={() => { setView("products"); closeSidebar(); }}
                    className={`menu-item-2 w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:translate-x-1 ${
                      view === "products" 
                        ? "bg-terra-50 border-l-4 border-burnt-500 text-burnt-700" 
                        : "text-olive-900 hover:bg-sand-100"
                    }`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="font-semibold">Shop Products</span>
                  </button>

                  <button
                    onClick={() => { setView("about"); closeSidebar(); }}
                    className={`menu-item-3 w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:translate-x-1 ${
                      view === "about" 
                        ? "bg-terra-50 border-l-4 border-burnt-500 text-burnt-700" 
                        : "text-olive-900 hover:bg-sand-100"
                    }`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">About</span>
                  </button>

                  <button
                    onClick={() => { setView("contact"); closeSidebar(); }}
                    className={`menu-item-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:translate-x-1 ${
                      view === "contact" 
                        ? "bg-terra-50 border-l-4 border-burnt-500 text-burnt-700" 
                        : "text-olive-900 hover:bg-sand-100"
                    }`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">Contact</span>
                  </button>
                </nav>
              </div>

              {/* Footer - Logout or Login */}
              <div className="border-t border-sand-200/50 px-6 py-4 bg-sand-50">
                {user ? (
                  logoutPrompt ? (
                    <div className="rounded-2xl border-2 border-burnt-200 bg-burnt-50 p-4">
                      <p className="text-xs font-bold text-burnt-900 uppercase tracking-wide mb-1">Confirm Logout</p>
                      <p className="text-sm text-burnt-700 mb-4">Are you sure?</p>
                      <div className="flex gap-2.5">
                        <button 
                          onClick={confirmLogout} 
                          className="flex-1 rounded-lg bg-burnt-500 px-4 py-2.5 text-sand-50 text-sm font-semibold shadow-soft hover:bg-burnt-600 transition-colors"
                        >
                          Yes
                        </button>
                        <button 
                          onClick={cancelLogout} 
                          className="flex-1 rounded-lg bg-sand-200 px-4 py-2.5 text-olive-900 text-sm font-semibold hover:bg-sand-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={requestLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-olive-700 hover:text-burnt-600 hover:bg-terra-50 transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-semibold">Logout</span>
                      </button>
                      <p className="text-xs text-olive-400 text-center mt-2">© 2026 ScienceHub</p>
                    </>
                  )
                ) : (
                  <>
                    <button 
                      onClick={() => { setView("login"); closeSidebar(); }}
                      className="w-full bg-burnt-500 text-sand-50 py-3 rounded-xl font-semibold hover:bg-burnt-600 transition-colors shadow-sm mb-2"
                    >
                      Login / Sign up
                    </button>
                    <p className="text-xs text-olive-400 text-center">© 2026 ScienceHub</p>
                  </>
                )}
              </div>
            </aside>
          </div>
        )}
        <main className="flex-1">
              {view === "home" && (
                <>
                  <Hero onNavigate={setView} onNavigateToProduct={handleNavigateToProduct} />
                  <PackagesSection addToCart={addToCart} onNavigateToProduct={handleNavigateToProduct} />
                </>
              )}
              {view === "about" && <AboutSection />}
              {view === "contact" && <ContactSection />}
              {view === "products" && <ProductsView />}
              {view === "productDetail" && selectedProductId && (
                <ProductDetailPage
                  productId={selectedProductId}
                  addToCart={addToCart}
                  onNavigateToProduct={handleNavigateToProduct}
                />
              )}
              {view === "login" && (
                <LoginPage
                  onBack={() => setView("home")}
                  onRegisterNavigate={() => setView("register")}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}
              {view === "register" && (
                <RegisterPage
                  onBack={() => setView("login")}
                  onSuccess={handleRegisterSuccess}
                />
              )}
              {view === "cart" && !checkoutActive && (
                <CartView
                  user={user}
                  cart={cart}
                  updateQty={updateQty}
                  onRequireLogin={handleRequireLogin}
                  setShowPayment={() => {
                    if (!user) {
                      handleRequireLogin();
                    } else {
                      setCheckoutActive(true);
                    }
                  }}
                />
              )}
              {view === "cart" && checkoutActive && user && (
                <CartCheckoutFlow
                  user={user}
                  cart={cart}
                  amount={total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onRequireLogin={handleRequireLogin}
                />
              )}
              {view === "cart" && checkoutActive && !user && (
                <LoginPage
                  onLoginSuccess={(userInfo) => {
                    handleAuthSuccess(userInfo, "cart", false);
                    setCheckoutActive(true);
                  }}
                  onBack={() => setView("cart")}
                />
              )}
            </main>
        <Footer />
      {flyingItem && (
        <div
          key={flyingItem.id}
          className="cart-fly-item"
          style={{
            "--start-x": `${flyingItem.startX}px`,
            "--start-y": `${flyingItem.startY}px`,
            "--end-x": `${flyingItem.endX}px`,
            "--end-y": `${flyingItem.endY}px`,
          }}
        >
          <img src={flyingItem.image} alt="flying product" className="w-full h-full object-contain rounded-2xl bg-sand-50 shadow-soft-lg border-2 border-burnt-500" />
        </div>
      )}
      <MobileBottomNav currentView={view} onNavigate={setView} cartCount={cart.reduce((s, p) => s + p.qty, 0)} />
      <SuccessModal open={!!success} onClose={() => setSuccess(null)} data={success} />
      <style>{`
        .cart-fly-item {
          position: fixed;
          left: var(--start-x);
          top: var(--start-y);
          width: 80px;
          height: 80px;
          z-index: 9999;
          pointer-events: none;
          animation: flyToCart 1500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes flyToCart {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--end-x) - var(--start-x) - 50%), calc(var(--end-y) - var(--start-y) - 50%)) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
      </div>
    </div>
  );
}
