import React, { useState } from "react";

// Mobile Accordion Section Component
function AccordionSection({ title, children, isOpen, onToggle, id }) {
  return (
    <div className="border-b border-olive-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between h-12 text-left"
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}`}
      >
        <h3 className="font-display text-base font-semibold text-sand-50">{title}</h3>
        <svg 
          className={`w-5 h-5 text-sand-300 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        id={`accordion-${id}`}
        className="overflow-hidden transition-all duration-250"
        style={{ 
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        <ul className="pb-3 space-y-2 text-sm">
          {children}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-olive-900 text-sand-100 mt-12 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-16 lg:px-8">
        
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Compact Brand Block */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-burnt-500 to-terra-600 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 64 64" className="w-5 h-5 text-sand-50">
                  <path d="M20 6h24v8H20z" fill="currentColor" opacity="0.3" />
                  <path d="M18 14h28l-6 28a10 10 0 0 1-20 0l-6-28z" fill="none" stroke="currentColor" strokeWidth="3" />
                  <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold">ScienceHub</span>
            </div>
            <p className="text-sand-300 text-xs mb-4">
              Quality lab equipment for every scientist
            </p>
            
            {/* Social Icons - Smaller */}
            <div className="flex items-center gap-2">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Compact Newsletter */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-semibold mb-2 text-sand-50">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-olive-800 border border-olive-700 text-sand-100 placeholder-sand-400 focus:outline-none focus:border-burnt-500 transition-colors text-sm min-w-0"
                required
              />
              <button
                type="submit"
                className="bg-burnt-500 text-sand-50 px-4 py-2 rounded-lg font-semibold hover:bg-burnt-600 transition-colors text-sm flex-shrink-0"
              >
                {subscribed ? "✓" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Accordion Sections */}
          <div className="mb-6">
            <AccordionSection 
              title="Shop" 
              id="shop"
              isOpen={openSection === 'shop'}
              onToggle={() => toggleSection('shop')}
            >
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">All Products</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Microscopes</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Lab Kits</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Best Sellers</a></li>
            </AccordionSection>

            <AccordionSection 
              title="Company" 
              id="company"
              isOpen={openSection === 'company'}
              onToggle={() => toggleSection('company')}
            >
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Careers</a></li>
            </AccordionSection>

            <AccordionSection 
              title="Support" 
              id="support"
              isOpen={openSection === 'support'}
              onToggle={() => toggleSection('support')}
            >
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Shipping</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Returns</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Privacy</a></li>
            </AccordionSection>
          </div>

          {/* Minor Links - Inline Row */}
          <div className="mb-6 text-xs text-sand-400 text-center">
            <a href="#" className="hover:text-burnt-400 transition-colors">Blog</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-burnt-400 transition-colors">FAQs</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-burnt-400 transition-colors">Terms</a>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-6 px-2 bg-white rounded flex items-center justify-center">
              <svg className="h-4" viewBox="0 0 48 16" fill="none">
                <path d="M18.5 1.5l-3.8 13h-3l-1.9-7.4c-.1-.4-.2-.6-.5-.7-.5-.3-1.4-.6-2.1-.7l.1-.3h3.6c.5 0 .9.3 1 .8l.9 4.9 2.3-5.7h3l-4.6 11.1zm11.3 8.8c0-3.4-4.7-3.6-4.7-5.1 0-.5.5-.9 1.4-.9.9-.1 2.4.2 3.5.7l.6-2.9c-1.2-.4-2.6-.7-3.9-.7-3.3 0-5.6 1.8-5.6 4.3 0 1.9 1.7 2.9 3 3.5 1.3.6 1.8 1 1.8 1.6 0 .9-1.1 1.3-2 1.3-1.7 0-2.6-.4-3.4-.8l-.6 2.9c1.2.5 2.4.8 3.5.8 3.5 0 5.8-1.7 5.8-4.4zm8.8 4.2h2.7l-2.3-13h-2.5c-.5 0-1 .3-1.2.8l-4.3 12.2h3.3l.7-1.9h4.1l.4 1.9zm-3.6-4.5l1.7-4.7 1 4.7h-2.7zm-16.5-8.5l-2.6 13h-3.2l2.6-13h3.2z" fill="#1434CB"/>
              </svg>
            </div>
            <div className="h-6 px-2 bg-white rounded flex items-center justify-center">
              <svg className="h-4" viewBox="0 0 48 32" fill="none">
                <circle cx="15" cy="16" r="10" fill="#EB001B"/>
                <circle cx="25" cy="16" r="10" fill="#F79E1B"/>
                <path d="M20 9.5c-1.3 1.5-2 3.4-2 5.5s.7 4 2 5.5c1.3-1.5 2-3.4 2-5.5s-.7-4-2-5.5z" fill="#FF5F00"/>
              </svg>
            </div>
            <div className="h-6 px-2 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">UPI</span>
            </div>
            <div className="h-6 px-2 bg-white rounded flex items-center justify-center">
              <svg className="h-4" viewBox="0 0 48 16" fill="none">
                <path d="M18.3 2.4c-.5-3.3-3.6-3.3-6.5-3.3H5.4c-.4 0-.8.3-.9.7L1.1 14.3c0 .3.2.6.5.6h3.6l.9-5.7v.2c.1-.4.5-.7.9-.7h1.9c3.7 0 6.6-1.5 7.5-5.9 0-.1 0-.3.1-.4-.1 0-.1 0 0 0 .1-.3.1-.6.1-1zm-1.2 1c-.8 3.6-3.3 3.6-6 3.6h-1.5l1-6.5c.1-.2.3-.4.5-.4h.5c1.2 0 2.4 0 3 .7.4.4.5 1 .4 1.6z" fill="#003087"/>
              </svg>
            </div>
          </div>

          {/* Copyright - Centered */}
          <p className="text-sand-400 text-xs text-center">
            © 2026 ScienceHub. All rights reserved.
          </p>
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Brand Block */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-burnt-500 to-terra-600 flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 64 64" className="w-6 h-6 text-sand-50">
                    <path d="M20 6h24v8H20z" fill="currentColor" opacity="0.3" />
                    <path d="M18 14h28l-6 28a10 10 0 0 1-20 0l-6-28z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2" />
                  </svg>
                </div>
                <span className="font-display text-2xl font-bold">ScienceHub</span>
              </div>
              <p className="text-sand-300 text-sm mb-6">
                Quality lab equipment for every scientist
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-olive-800 flex items-center justify-center hover:bg-burnt-500 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Shop */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4 text-sand-50">Shop</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">All Products</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Microscopes</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Beakers & Glassware</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Lab Kits</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Best Sellers</a></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4 text-sand-50">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Column 4: Support & Policies */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4 text-sand-50">Support</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Track Order</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sand-300 hover:text-burnt-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Column 5: Newsletter */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4 text-sand-50">Stay in the Loop</h3>
              <p className="text-sand-300 text-sm mb-4">Get exclusive offers and updates delivered to your inbox.</p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-olive-800 border border-olive-700 text-sand-100 placeholder-sand-400 focus:outline-none focus:border-burnt-500 transition-colors text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-burnt-500 text-sand-50 px-4 py-2.5 rounded-xl font-semibold hover:bg-burnt-600 transition-colors shadow-soft text-sm"
                >
                  {subscribed ? "Subscribed! ✓" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-olive-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-sand-400 text-sm">
                © 2026 ScienceHub. All rights reserved.
              </p>
              
              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-sand-400 text-xs mr-2">We accept:</span>
                
                {/* Visa */}
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <svg className="h-5" viewBox="0 0 48 16" fill="none">
                    <path d="M18.5 1.5l-3.8 13h-3l-1.9-7.4c-.1-.4-.2-.6-.5-.7-.5-.3-1.4-.6-2.1-.7l.1-.3h3.6c.5 0 .9.3 1 .8l.9 4.9 2.3-5.7h3l-4.6 11.1zm11.3 8.8c0-3.4-4.7-3.6-4.7-5.1 0-.5.5-.9 1.4-.9.9-.1 2.4.2 3.5.7l.6-2.9c-1.2-.4-2.6-.7-3.9-.7-3.3 0-5.6 1.8-5.6 4.3 0 1.9 1.7 2.9 3 3.5 1.3.6 1.8 1 1.8 1.6 0 .9-1.1 1.3-2 1.3-1.7 0-2.6-.4-3.4-.8l-.6 2.9c1.2.5 2.4.8 3.5.8 3.5 0 5.8-1.7 5.8-4.4zm8.8 4.2h2.7l-2.3-13h-2.5c-.5 0-1 .3-1.2.8l-4.3 12.2h3.3l.7-1.9h4.1l.4 1.9zm-3.6-4.5l1.7-4.7 1 4.7h-2.7zm-16.5-8.5l-2.6 13h-3.2l2.6-13h3.2z" fill="#1434CB"/>
                  </svg>
                </div>
                
                {/* Mastercard */}
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <svg className="h-5" viewBox="0 0 48 32" fill="none">
                    <circle cx="15" cy="16" r="10" fill="#EB001B"/>
                    <circle cx="25" cy="16" r="10" fill="#F79E1B"/>
                    <path d="M20 9.5c-1.3 1.5-2 3.4-2 5.5s.7 4 2 5.5c1.3-1.5 2-3.4 2-5.5s-.7-4-2-5.5z" fill="#FF5F00"/>
                  </svg>
                </div>
                
                {/* PayPal */}
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <svg className="h-5" viewBox="0 0 48 16" fill="none">
                    <path d="M18.3 2.4c-.5-3.3-3.6-3.3-6.5-3.3H5.4c-.4 0-.8.3-.9.7L1.1 14.3c0 .3.2.6.5.6h3.6l.9-5.7v.2c.1-.4.5-.7.9-.7h1.9c3.7 0 6.6-1.5 7.5-5.9 0-.1 0-.3.1-.4-.1 0-.1 0 0 0 .1-.3.1-.6.1-1zm-1.2 1c-.8 3.6-3.3 3.6-6 3.6h-1.5l1-6.5c.1-.2.3-.4.5-.4h.5c1.2 0 2.4 0 3 .7.4.4.5 1 .4 1.6zm14.1 0c-.8 3.6-3.3 3.6-6 3.6h-1.5l1-6.5c.1-.2.3-.4.5-.4h.5c1.2 0 2.4 0 3 .7.4.4.5 1 .4 1.6zm-.1-1c-.5-3.3-3.6-3.3-6.5-3.3h-6.4c-.4 0-.8.3-.9.7l-3.4 14.5c0 .3.2.6.5.6h3.3c.4 0 .8-.3.9-.7l.9-5.9v.2c.1-.4.5-.7.9-.7h1.9c3.7 0 6.6-1.5 7.5-5.9 0-.1 0-.3.1-.4-.1 0-.1 0 0 0 .1-.3.1-.6.1-1zm8.5 6.8c0-.2-.1-.3-.3-.3h-1.7c-.1 0-.2.1-.2.1l-2.4 3.7-1.1-3.5c0-.1-.1-.2-.3-.2h-1.7c-.2 0-.3.2-.3.4l2 5.9-1.9 2.7c-.1.2 0 .4.2.4h1.7c.1 0 .2-.1.2-.1l5.9-8.5c.1-.2.1-.4-.1-.6z" fill="#003087"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
