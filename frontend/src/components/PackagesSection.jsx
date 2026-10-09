import React, { useState } from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

export default function PackagesSection({ addToCart, onNavigateToProduct }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false); // New state for show all

  // Extract unique categories from products
  const categories = ["all", ...new Set(products.map(p => p.category).filter(Boolean))];
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.title || product.name)
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Show first 8 or all products based on showAll state
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8);
  const hasMoreProducts = filteredProducts.length > 8;

  return (
    <section id="products-section" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-olive-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-olive-600 max-w-2xl mx-auto">
            Hand-picked selection of our most popular laboratory equipment
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for equipment..."
              className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-sand-200 bg-sand-50 text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 transition-colors font-body shadow-soft"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-olive-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowAll(false); // Reset to show 6 when changing category
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-burnt-500 text-sand-50 shadow-soft"
                      : "bg-sand-100 text-olive-700 hover:bg-sand-200"
                  }`}
                >
                  {category === "all" ? "All Products" : category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 justify-items-stretch">
              {displayedProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAdd={addToCart} 
                  onView={() => onNavigateToProduct(p.id)}
                />
              ))}
            </div>

            {/* View All Button */}
            {hasMoreProducts && !showAll && (
              <div className="text-center">
                <p className="text-olive-600 mb-4">
                  Showing {displayedProducts.length} of {filteredProducts.length} products
                </p>
                <button 
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-olive-900 text-sand-50 rounded-2xl font-semibold hover:bg-olive-800 transition-colors shadow-soft hover:shadow-soft-lg"
                >
                  View All Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Show Less Button (when all products are shown) */}
            {showAll && hasMoreProducts && (
              <div className="text-center">
                <p className="text-olive-600 mb-4">
                  Showing all {filteredProducts.length} products
                </p>
                <button 
                  onClick={() => {
                    setShowAll(false);
                    // Scroll back to products section
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sand-200 text-olive-900 rounded-2xl font-semibold hover:bg-sand-300 transition-colors"
                >
                  Show Less
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sand-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-olive-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold text-olive-900 mb-2">
              No products found
            </h3>
            <p className="text-olive-600 mb-6">
              Try adjusting your search or filter to find what you're looking for
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setShowAll(false);
              }}
              className="px-6 py-3 bg-burnt-500 text-sand-50 rounded-xl font-semibold hover:bg-burnt-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
