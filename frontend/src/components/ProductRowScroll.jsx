import React from "react";
import products from "../data/products";
import ImageWithFallback from "./ImageWithFallback";

export default function ProductRowScroll({ title, onProductClick, filterCategory, limit = 8, sortBy = "discount" }) {
  // Filter products
  let filtered = products;
  if (filterCategory && filterCategory !== "all") {
    filtered = products.filter(p => p.category === filterCategory);
  }

  // Sort based on sortBy prop
  let displayProducts;
  
  if (sortBy === "discount") {
    // For "Deals Today" - sort by highest discount
    displayProducts = [...filtered]
      .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
      .slice(0, limit);
  } else if (sortBy === "popular") {
    // For "Best Sellers" - sort by price or use different criteria
    // Using reverse order to get different products than discount sorting
    displayProducts = [...filtered]
      .sort((a, b) => (a.price || 0) - (b.price || 0))
      .slice(0, limit);
  } else {
    // Default fallback
    displayProducts = filtered.slice(0, limit);
  }

  if (displayProducts.length === 0) return null;

  return (
    <div className="bg-white border-b border-sand-200">
      <div className="px-3 py-3 md:px-6 md:py-4">
        <h3 className="font-display text-base md:text-lg font-bold text-olive-900 mb-3">
          {title}
        </h3>
        
        {/* Horizontal scroll container - flex with stretch alignment */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {displayProducts.map((product) => {
            const discountedPrice = Math.round(
              product.price * (1 - (product.discountPercent || 0) / 100)
            );

            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product.id)}
                className="flex-shrink-0 w-28 md:w-32 bg-sand-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-24 md:h-28 bg-gradient-to-br from-sand-100 to-terra-100 p-2 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {product.discountPercent > 0 && (
                    <div className="absolute top-1 right-1 z-10 bg-burnt-500 text-sand-50 px-1.5 py-0.5 rounded-md text-xs font-bold">
                      {product.discountPercent}% OFF
                    </div>
                  )}
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name || product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="p-2 space-y-1 flex-1 flex flex-col">
                  <h4 className="text-xs font-semibold text-olive-900 line-clamp-2 flex-1">
                    {product.name || product.title}
                  </h4>
                  <div className="space-y-0.5 flex-shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-burnt-600">
                        ₹{discountedPrice}
                      </span>
                      {product.discountPercent > 0 && (
                        <span className="text-xs text-olive-500 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="w-full bg-burnt-500 text-sand-50 py-1 rounded-md text-xs font-semibold hover:bg-burnt-600 transition-colors mt-1 flex-shrink-0">
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
