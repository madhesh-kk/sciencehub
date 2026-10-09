import React from "react";
import ImageWithFallback from "./ImageWithFallback";

export default function AboutSection() {
  return (
    <section id="about-section" className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-olive-100 text-olive-700 text-xs md:text-sm font-semibold">
                Our Story
              </span>
            </div>
            
            <h2 className="font-display text-responsive-h1 md:text-5xl font-bold text-olive-900 leading-tight">
              Making Science Accessible to Everyone
            </h2>
            
            <p className="text-responsive-body text-olive-700">
              ScienceHub is dedicated to empowering students, hobbyists, and educators with quality laboratory equipment at affordable prices.
            </p>
            
            <p className="text-responsive-body text-olive-700">
              We believe that scientific exploration should be accessible to all, regardless of budget or location.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2 md:pt-4">
              <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-sand-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-burnt-500 text-sand-50 flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-olive-900 mb-0.5 md:mb-1">Quality Assured</h3>
                <p className="text-xs md:text-sm text-olive-600">ISO certified equipment</p>
              </div>
              
              <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-sand-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-burnt-500 text-sand-50 flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-olive-900 mb-0.5 md:mb-1">Best Prices</h3>
                <p className="text-xs md:text-sm text-olive-600">Affordable for everyone</p>
              </div>
              
              <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-sand-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-burnt-500 text-sand-50 flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-olive-900 mb-0.5 md:mb-1">Fast Shipping</h3>
                <p className="text-xs md:text-sm text-olive-600">Quick delivery nationwide</p>
              </div>
              
              <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-sand-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-burnt-500 text-sand-50 flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-olive-900 mb-0.5 md:mb-1">Expert Support</h3>
                <p className="text-xs md:text-sm text-olive-600">Guidance for your projects</p>
              </div>
            </div>
          </div>
          
          {/* Image/Stats Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="relative aspect-video rounded-2xl md:rounded-4xl overflow-hidden shadow-soft-lg bg-gradient-to-br from-olive-100 to-sand-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&auto=format&fit=crop"
                alt="Laboratory with scientific equipment"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="bg-burnt-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-soft">
                <div className="font-display text-2xl md:text-3xl font-bold text-sand-50 mb-0.5 md:mb-1">500+</div>
                <div className="text-xs md:text-sm text-sand-100">Products</div>
              </div>
              <div className="bg-olive-800 rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-soft">
                <div className="font-display text-2xl md:text-3xl font-bold text-sand-50 mb-0.5 md:mb-1">10k+</div>
                <div className="text-xs md:text-sm text-sand-100">Happy Customers</div>
              </div>
              <div className="bg-terra-600 rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-soft">
                <div className="font-display text-2xl md:text-3xl font-bold text-sand-50 mb-0.5 md:mb-1">4.9★</div>
                <div className="text-xs md:text-sm text-sand-100">Average Rating</div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="bg-sand-100 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-burnt-500 text-sand-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm md:text-base text-olive-900 mb-0.5 md:mb-1">Trusted by Schools & Institutions</div>
                <p className="text-xs md:text-sm text-olive-600">ISO 9001:2015 certified supplier with 100% genuine products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
