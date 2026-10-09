import React, { useState, useEffect } from "react";
import ImageWithFallback from "./ImageWithFallback";
import RelatedProducts from "./RelatedProducts";
import products from "../data/products";

export default function ProductDetailPage({ productId, addToCart, onNavigateToProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState("features"); // Track expanded accordion
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-olive-900 mb-4">Product Not Found</h2>
            <p className="text-olive-600">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Create image gallery - for now use main image, in real app would have multiple images
  const images = [product.image];
  const canSwipeLeft = currentImageIndex > 0;
  const canSwipeRight = currentImageIndex < images.length - 1;

  const handlePrevImage = () => {
    if (canSwipeLeft) setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleNextImage = () => {
    if (canSwipeRight) setCurrentImageIndex(currentImageIndex + 1);
  };

  const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100));
  const savings = product.price - discountedPrice;

  const handleAddToCart = (event) => {
    addToCart(product, event);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <div className="py-8 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button & Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => onNavigateToProduct(null)}
            className="flex items-center gap-2 text-burnt-500 hover:text-burnt-600 font-medium transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={() => onNavigateToProduct(null)} className="text-burnt-500 hover:text-burnt-600 font-medium">
              Shop
            </button>
            <span className="text-olive-400">/</span>
            <span className="text-olive-900 font-medium max-w-xs truncate">{product.name || product.title}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Swipeable Image Gallery with Dot Indicators */}
          <div className="flex flex-col gap-4">
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-sand-100 to-terra-100 rounded-2xl p-4 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px] overflow-hidden shadow-soft">
              {product.discountPercent > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-burnt-500 text-sand-50 px-3 py-1.5 rounded-full text-sm font-bold shadow-soft">
                  {product.discountPercent}% OFF
                </div>
              )}
              
              {/* Image with navigation arrows */}
              <div className="relative w-full h-full flex items-center justify-center">
                <ImageWithFallback
                  src={images[currentImageIndex]}
                  alt={product.name || product.title}
                  className="w-full h-full object-contain"
                />

                {/* Previous Button */}
                {canSwipeLeft && (
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-sand-50/80 text-olive-900 hover:bg-sand-50 transition-colors shadow-soft"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Next Button */}
                {canSwipeRight && (
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-sand-50/80 text-olive-900 hover:bg-sand-50 transition-colors shadow-soft"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Dot Indicators */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 py-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "w-6 bg-burnt-500"
                        : "w-2 bg-sand-300 hover:bg-sand-400"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col gap-6">
            {/* Product Name */}
            <div>
              <p className="text-olive-600 text-sm font-medium mb-2">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-olive-900 mb-2">
                {product.name || product.title}
              </h1>
            </div>

            {/* Price Section */}
            <div className="bg-sand-50 rounded-2xl p-6 border-2 border-sand-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-3xl font-bold text-burnt-600">₹{discountedPrice}</span>
                {product.discountPercent > 0 && (
                  <>
                    <span className="text-xl text-olive-500 line-through">₹{product.price}</span>
                    <span className="text-sm font-bold text-terra-600 bg-terra-50 px-2.5 py-1 rounded-lg">
                      Save ₹{savings}
                    </span>
                  </>
                )}
              </div>
              <p className="text-olive-600 text-sm">
                {product.stock === "In Stock" ? (
                  <span className="text-terra-600 font-semibold">✓ {product.stock}</span>
                ) : (
                  <span className="text-burnt-600 font-semibold">⚠ {product.stock}</span>
                )}
              </p>
            </div>

            {/* Short Description */}
            <div>
              <p className="text-olive-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-olive-900">Quantity:</span>
              <div className="flex items-center border-2 border-sand-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-sand-100 transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold text-olive-900 border-l-2 border-r-2 border-sand-200 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-sand-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-burnt-500 text-sand-50 px-6 py-4 rounded-2xl font-bold text-lg hover:bg-burnt-600 transition-colors shadow-soft hover:shadow-soft-lg"
              >
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-burnt-500 text-burnt-600 px-6 py-4 rounded-2xl font-bold text-lg hover:bg-burnt-50 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sand-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-terra-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span className="text-sm text-olive-700">Authentic Product</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-terra-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a6 6 0 016 6v3h-3v-3a4 4 0 00-4-4h-.5a4 4 0 00-4 4v10a2 2 0 002 2h10a2 2 0 002-2v-10a1 1 0 100-2 3 3 0 00-3 3v10H4V5z" />
                </svg>
                <span className="text-sm text-olive-700">Safe Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description Section - Collapsible Accordions */}
        <div className="mb-16 bg-sand-50 rounded-2xl overflow-hidden shadow-soft">
          {/* Features Accordion */}
          <div className="border-b border-sand-200">
            <button
              onClick={() => setExpandedSection(expandedSection === "features" ? null : "features")}
              className="w-full px-6 md:px-8 py-4 md:py-6 flex items-center justify-between hover:bg-sand-100 transition-colors"
            >
              <h3 className="font-display text-lg md:text-xl font-bold text-olive-900">
                Product Features
              </h3>
              <svg
                className={`w-6 h-6 text-burnt-500 transition-transform ${expandedSection === "features" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
              </svg>
            </button>
            {expandedSection === "features" && (
              <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-3 border-t border-sand-200">
                <div className="flex items-start gap-3">
                  <span className="text-burnt-500 font-bold flex-shrink-0">•</span>
                  <span className="text-olive-700">{product.description}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-burnt-500 font-bold flex-shrink-0">•</span>
                  <span className="text-olive-700">Category: <strong>{product.category}</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-burnt-500 font-bold flex-shrink-0">•</span>
                  <span className="text-olive-700">Stock Status: <strong>{product.stock}</strong></span>
                </div>
                {product.discountPercent > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-burnt-500 font-bold flex-shrink-0">•</span>
                    <span className="text-olive-700">Special Discount: <strong>{product.discountPercent}% OFF</strong></span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Specifications Accordion */}
          <div className="border-b border-sand-200">
            <button
              onClick={() => setExpandedSection(expandedSection === "specs" ? null : "specs")}
              className="w-full px-6 md:px-8 py-4 md:py-6 flex items-center justify-between hover:bg-sand-100 transition-colors"
            >
              <h3 className="font-display text-lg md:text-xl font-bold text-olive-900">
                Specifications
              </h3>
              <svg
                className={`w-6 h-6 text-burnt-500 transition-transform ${expandedSection === "specs" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
              </svg>
            </button>
            {expandedSection === "specs" && (
              <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-3 border-t border-sand-200">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-terra-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-olive-700">Complete product with original packaging</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-terra-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-olive-700">User manual and documentation included</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-terra-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-olive-700">ISO Certified and Quality Assured</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-terra-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-olive-700">Warranty and customer support available</span>
                </div>
              </div>
            )}
          </div>

          {/* Reviews Accordion */}
          <div>
            <button
              onClick={() => setExpandedSection(expandedSection === "reviews" ? null : "reviews")}
              className="w-full px-6 md:px-8 py-4 md:py-6 flex items-center justify-between hover:bg-sand-100 transition-colors"
            >
              <h3 className="font-display text-lg md:text-xl font-bold text-olive-900">
                Customer Reviews
              </h3>
              <svg
                className={`w-6 h-6 text-burnt-500 transition-transform ${expandedSection === "reviews" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
              </svg>
            </button>
            {expandedSection === "reviews" && (
              <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-sand-200">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-burnt-500 flex items-center justify-center text-sand-50 font-bold">
                        S
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-olive-900">Sameer Kumar</span>
                        <span className="text-sm text-burnt-600 font-semibold">★★★★★</span>
                      </div>
                      <p className="text-sm text-olive-700">
                        Excellent product quality. Very satisfied with the purchase. Highly recommended!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-terra-500 flex items-center justify-center text-sand-50 font-bold">
                        P
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-olive-900">Priya Singh</span>
                        <span className="text-sm text-burnt-600 font-semibold">★★★★</span>
                      </div>
                      <p className="text-sm text-olive-700">
                        Good quality and fast delivery. Would definitely order again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts currentProductId={productId} onNavigateToProduct={onNavigateToProduct} addToCart={addToCart} />
      </div>

      {/* Sticky Bottom Action Bar - Mobile Only */}
      <div className="fixed bottom-14 md:hidden left-0 right-0 bg-white border-t border-sand-200 px-4 py-2 z-30">
        <button
          onClick={handleAddToCart}
          className="w-full bg-burnt-500 text-sand-50 px-6 py-3 rounded-xl font-bold text-base hover:bg-burnt-600 transition-colors shadow-soft"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
