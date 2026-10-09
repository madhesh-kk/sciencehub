import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import BannerCarousel from "./BannerCarousel";
import CategoryChips from "./CategoryChips";
import ProductRowScroll from "./ProductRowScroll";

export default function Hero({ onNavigate, onNavigateToProduct }) {
  const handleShopNow = (event) => {
    event.preventDefault();
    const productTarget = document.getElementById("products-section");
    if (productTarget) {
      productTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLearnMore = () => {
    if (onNavigate) {
      onNavigate("about");
    }
  };

  return (
    <>
      {/* Mobile Hero - Banner Carousel (320px-480px) */}
      <section className="block md:hidden">
        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Trust Badges - Compact horizontal strip */}
        <div className="bg-white border-b border-sand-200 px-3 py-2">
          <div className="flex items-center justify-around text-xs">
            <div className="text-center">
              <div className="font-bold text-burnt-600">500+</div>
              <div className="text-olive-600">Products</div>
            </div>
            <div className="h-8 w-px bg-sand-200"></div>
            <div className="text-center">
              <div className="font-bold text-burnt-600">10k+</div>
              <div className="text-olive-600">Students</div>
            </div>
            <div className="h-8 w-px bg-sand-200"></div>
            <div className="text-center">
              <div className="font-bold text-burnt-600">4.9★</div>
              <div className="text-olive-600">Rated</div>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <CategoryChips onCategorySelect={(cat) => console.log("Category:", cat)} />

        {/* Deals/Offers Row */}
        <ProductRowScroll 
          title="🔥 Deals Today" 
          onProductClick={onNavigateToProduct}
          sortBy="discount"
          limit={8}
        />

        {/* Best Sellers Row */}
        <ProductRowScroll 
          title="⭐ Best Sellers" 
          onProductClick={onNavigateToProduct}
          sortBy="popular"
          limit={8}
        />
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden md:block relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burnt-100 text-burnt-700 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium Lab Equipment
                </span>
              </div>
              
              <h1 className="font-display text-responsive-h1 md:text-6xl lg:text-7xl font-bold text-olive-900 leading-tight">
                Science Made
                <span className="block text-burnt-500">Accessible</span>
              </h1>
              
              <p className="text-responsive-body md:text-xl text-olive-700 max-w-xl font-body">
                Discover quality microscopes, beakers, and complete lab kits designed for students, educators, and curious minds. Build your home laboratory with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleShopNow}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-burnt-500 text-sand-50 font-semibold text-lg hover:bg-burnt-600 transition-all duration-200 shadow-soft hover:shadow-soft-lg"
                >
                  Explore Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleLearnMore}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-sand-200 text-olive-900 font-semibold text-lg hover:bg-sand-300 transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-sand-200">
                <div>
                  <div className="font-display text-3xl font-bold text-burnt-600">500+</div>
                  <div className="text-sm text-olive-600 mt-1">Products</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-burnt-600">10k+</div>
                  <div className="text-sm text-olive-600 mt-1">Students</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-burnt-600">4.9★</div>
                  <div className="text-sm text-olive-600 mt-1">Rating</div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-burnt-200/40 to-olive-200/40 rounded-4xl blur-3xl"></div>
              <div className="relative aspect-square rounded-4xl overflow-hidden shadow-soft-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop"
                  alt="Laboratory equipment and microscope"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-sand-50/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-soft-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-burnt-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-sand-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-olive-900">Quality Assured</div>
                      <div className="text-sm text-olive-600">ISO Certified Equipment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
