import React from "react";
import ImageWithFallback from "./ImageWithFallback";

export default function ProductCard({ product, onView, onAdd }) {
  const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100));
  
  return (
    <div 
      onClick={() => onView(product)}
      className="group relative bg-sand-50 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Discount Badge */}
      {product.discountPercent > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-burnt-500 text-sand-50 px-2.5 py-1 rounded-full text-xs font-bold shadow-soft">
          {product.discountPercent}% OFF
        </div>
      )}
      
      {/* Image Container - Responsive size */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-sand-100 to-terra-100 p-4 sm:p-5 md:p-6 flex items-center justify-center overflow-hidden">
        <ImageWithFallback 
          src={product.image} 
          alt={product.name || product.title} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Content - Responsive padding and text sizes */}
      <div className="p-3 sm:p-3.5 md:p-4 space-y-2 sm:space-y-2.5 md:space-y-3">
        <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold text-olive-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] md:min-h-[3rem]">
          {product.name || product.title}
        </h3>
        
        {/* Price - Responsive sizing */}
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-display text-base sm:text-lg md:text-xl font-bold text-burnt-600">
            ₹{discountedPrice}
          </span>
          {product.discountPercent > 0 && (
            <span className="text-xs text-olive-500 line-through">
              ₹{product.price}
            </span>
          )}
        </div>
        
        {/* Actions - Responsive button */}
        <button
          onClick={(event) => {
            event.stopPropagation(); // Prevent card click when clicking Add to Cart
            onAdd(product, event);
          }}
          className="w-full bg-burnt-500 text-sand-50 px-2.5 sm:px-3 md:px-3 py-2 sm:py-2.5 md:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-sm font-semibold hover:bg-burnt-600 transition-colors duration-200 shadow-soft"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
