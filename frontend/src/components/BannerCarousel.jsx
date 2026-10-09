import React, { useState, useEffect } from "react";

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner data with proper images and offers
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off on lab equipment",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=300&fit=crop&q=80",
      color: "from-burnt-500 to-terra-600",
      offer: "50%",
    },
    {
      id: 2,
      title: "New Stock",
      subtitle: "Fresh microscopes & kits just arrived",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&h=300&fit=crop&q=80",
      color: "from-olive-600 to-olive-800",
      offer: "30%",
    },
    {
      id: 3,
      title: "Best Sellers",
      subtitle: "Most loved products at special price",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=300&fit=crop&q=80",
      color: "from-terra-600 to-burnt-500",
      offer: "40%",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3500); // Auto-rotate every 3.5 seconds
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main banner carousel */}
      <div className="relative h-40 md:h-64 overflow-hidden bg-gradient-to-br from-sand-100 to-terra-100">
        {/* Slides */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with proper sizing */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Dark overlay for text readability */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-50`} />
            
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="inline-block mb-2 bg-sand-50 text-burnt-600 px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                {banner.offer} OFF
              </div>
              <h2 className="font-display text-lg md:text-3xl font-bold text-sand-50 mb-1 leading-tight">
                {banner.title}
              </h2>
              <p className="text-xs md:text-base text-sand-100">{banner.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Navigation arrows - hide on very small screens */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 items-center justify-center rounded-full bg-sand-50/80 text-olive-900 hover:bg-sand-50 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 items-center justify-center rounded-full bg-sand-50/80 text-olive-900 hover:bg-sand-50 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 py-2 bg-sand-50">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-6 bg-burnt-500"
                : "w-2 bg-sand-300 hover:bg-sand-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
