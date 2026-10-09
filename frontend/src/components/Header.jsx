import React, { useState, useRef, useEffect } from "react";

export default function Header({ onNavigate, user, onLogout, onOpenSidebar, onOpenCart, cartCount, cartRef, onSearch }) {
  const displayEmail = user?.email || user?.username || user?.name || "";
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Don't close if the click target is inside the profile menu
      if (profileRef.current && profileRef.current.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
    }
    
    // Use 'click' instead of 'mousedown' to avoid closing dropdown before click handler fires
    // This allows the Logout button click to complete before the dropdown closes
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    setShowDropdown(false);
    const shouldLogout = window.confirm("Are you sure you want to log out?");
    if (!shouldLogout) return;
    if (typeof onLogout === "function") {
      onLogout();
    }
    // Note: onLogout from App.jsx handles the redirect via window.location.href
  };

  return (
    <header className="bg-sand-50 border-b border-sand-200 sticky top-0 z-40 shadow-soft">
      {/* Mobile: Compact Header (320px-480px) */}
      <div className="block md:hidden">
        {/* Top bar: hamburger, logo, search, cart, account */}
        <div className="flex items-center justify-between h-14 px-2 gap-2">
          {/* Left: Hamburger */}
          <button
            onClick={onOpenSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-sand-200 text-olive-700 hover:bg-olive-100 transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Center: Logo (minimal on mobile) */}
          <button 
            onClick={() => onNavigate("home")} 
            className="flex items-center gap-1 flex-1 min-w-0 mx-1 h-11"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-burnt-500 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M9 3h6M10 3v7l-4 8a2 2 0 002 3h8a2 2 0 002-3l-4-8V3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-display text-sm font-bold text-olive-900 truncate hidden xs:inline">
              ScienceHub
            </span>
          </button>

          {/* Right: Search icon, cart, account */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button 
              onClick={() => onNavigate("search")}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-olive-700 hover:bg-sand-200 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button 
              ref={cartRef} 
              onClick={onOpenCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-burnt-600 hover:bg-sand-200 transition-colors"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-burnt-500 text-sand-50 rounded-full text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div ref={profileRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (user) {
                    setShowDropdown(!showDropdown);
                  } else {
                    onNavigate("login");
                  }
                }}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-sand-200 hover:bg-sand-300 transition-colors text-olive-900"
                aria-label="Account"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {showDropdown && user && (
                <div className="absolute top-11 right-0 bg-sand-50 rounded-xl shadow-soft-lg border border-sand-200 min-w-[160px] z-50">
                  <div className="p-2">
                    <>
                      <div className="px-3 py-2 border-b border-sand-200">
                        <p className="text-xs text-olive-600">Signed in</p>
                        <p className="text-sm font-semibold text-olive-900 truncate">{displayEmail}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogoutClick}
                        className="w-full px-3 py-2 mt-1 text-left text-olive-900 hover:bg-sand-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar below header */}
        <div className="px-2 py-2 border-t border-sand-100">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 pr-9 rounded-xl border border-sand-200 bg-sand-50 text-sm text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-olive-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop Header (unchanged for now) */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop layout stays mostly same */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate("home")} 
                className="flex items-center gap-2"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-burnt-500" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M9 3h6M10 3v7l-4 8a2 2 0 002 3h8a2 2 0 002-3l-4-8V3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-display text-xl font-bold text-olive-900">ScienceHub</span>
              </button>
            </div>

            <nav className="flex items-center gap-1 mr-4">
              <button onClick={() => onNavigate("home")} className="px-4 py-2 rounded-lg text-olive-800 hover:bg-sand-200 font-medium text-sm">Home</button>
              <button onClick={() => onNavigate("products")} className="px-4 py-2 rounded-lg text-olive-800 hover:bg-sand-200 font-medium text-sm">Shop</button>
              <button onClick={() => onNavigate("about")} className="px-4 py-2 rounded-lg text-olive-800 hover:bg-sand-200 font-medium text-sm">About</button>
              <button onClick={() => onNavigate("contact")} className="px-4 py-2 rounded-lg text-olive-800 hover:bg-sand-200 font-medium text-sm">Contact</button>
            </nav>

            <div className="flex items-center gap-3">
              <button 
                ref={cartRef} 
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-burnt-500 text-sand-50 font-semibold hover:bg-burnt-600 transition-colors shadow-soft"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-olive-600 text-sand-50 rounded-full text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <div ref={profileRef} className="relative">
                <button
                  onClick={() => {
                    if (user) {
                      setShowDropdown(!showDropdown);
                    } else {
                      onNavigate("login");
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sand-200 hover:bg-sand-300 transition-colors"
                >
                  <svg className="w-5 h-5 text-olive-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden md:block text-sm font-medium text-olive-900 max-w-[100px] truncate">
                    {displayEmail || "Account"}
                  </span>
                </button>

                {showDropdown && user && (
                  <div className="absolute top-12 right-0 bg-sand-50 rounded-xl shadow-soft-lg border border-sand-200 min-w-[180px] z-50">
                    <div className="p-2">
                      <>
                        <div className="px-3 py-2 border-b border-sand-200">
                          <p className="text-xs text-olive-600">Signed in as</p>
                          <p className="text-sm font-semibold text-olive-900 truncate">{displayEmail}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleLogoutClick}
                          className="w-full px-3 py-2 mt-1 text-left text-olive-900 hover:bg-sand-100 rounded-lg text-sm font-medium"
                        >
                          Logout
                        </button>
                      </>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
