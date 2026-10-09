import React, { useState } from "react";
import ImageWithFallback from "./ImageWithFallback";

export default function ProductDetailModal({ open, product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  if (!open || !product) return null;

  const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100));
  const savings = product.price - discountedPrice;

  const handleAddToCart = (e) => {
    for (let i = 0; i < quantity; i++) {
      onAdd(product, e);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-olive-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-sand-50 rounded-3xl shadow-soft-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-sand-200 hover:bg-burnt-500 hover:text-sand-50 text-olive-900 flex items-center justify-center transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image Section */}
          <div className="relative">
            {product.discountPercent > 0 && (
              <div className="absolute top-4 right-4 z-10 bg-burnt-500 text-sand-50 px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                {product.discountPercent}% OFF
              </div>
            )}
            <div className="aspect-square bg-gradient-to-br from-sand-100 to-terra-100 rounded-3xl p-8 flex items-center justify-center">
              <ImageWithFallback
                src={product.image} 
                alt={product.name || product.title} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col">
            <div className="flex-1">
              {/* Category Badge */}
              {product.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-sm font-semibold mb-4">
                  {product.category}
                </span>
              )}

              {/* Title */}
              <h2 className="font-display text-3xl font-bold text-olive-900 mb-4">
                {product.name || product.title}
              </h2>

              {/* Description */}
              {product.description && (
                <p className="text-olive-700 leading-relaxed mb-6">
                  {product.description}
                </p>
              )}

              {/* Price Section */}
              <div className="bg-sand-100 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-4xl font-bold text-burnt-600">
                    ₹{discountedPrice}
                  </span>
                  {product.discountPercent > 0 && (
                    <span className="text-xl text-olive-500 line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-sm text-olive-600">
                    You save ₹{savings} ({product.discountPercent}%)
                  </p>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-olive-700">
                  <svg className="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Stock: {product.stock || "Available"}</span>
                </div>
                <div className="flex items-center gap-3 text-olive-700">
                  <svg className="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-3 text-olive-700">
                  <svg className="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Quality guaranteed</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-olive-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-sand-200 text-olive-900 hover:bg-sand-300 transition-colors flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="font-bold text-xl text-olive-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-sand-200 text-olive-900 hover:bg-sand-300 transition-colors flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-burnt-500 text-sand-50 px-6 py-4 rounded-2xl font-bold shadow-soft hover:bg-burnt-600 hover:shadow-soft-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
