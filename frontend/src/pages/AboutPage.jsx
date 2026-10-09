import React from "react";

export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Products" },
    { value: "10k+", label: "Students" },
    { value: "4.9★", label: "Rating" }
  ];

  const values = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality",
      description: "ISO certified equipment"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Affordability",
      description: "Best prices guaranteed"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Support",
      description: "Expert guidance"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Education",
      description: "Learning resources"
    }
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-12">
        {/* Page Header */}
        <div className="mb-6 md:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs md:text-sm font-semibold mb-3 md:mb-4">
            Our Story
          </span>
          <h1 className="font-display text-responsive-h1 font-bold text-olive-900 mb-3 md:mb-4">
            Making Science <span className="text-burnt-500">Accessible</span> to Everyone
          </h1>
          <p className="text-responsive-body text-olive-600 max-w-2xl">
            Empowering the next generation of scientists and innovators
          </p>
        </div>

        {/* Mission Statement - Scannable Paragraphs */}
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-soft mb-6 md:mb-8">
          <p className="text-responsive-body text-olive-700 mb-3">
            ScienceHub is dedicated to making <span className="font-semibold text-burnt-600">quality laboratory equipment accessible</span> to students, hobbyists, and educators everywhere.
          </p>
          
          <p className="text-responsive-body text-olive-700 mb-3">
            We believe scientific exploration shouldn't be limited by budget or location. That's why we offer carefully curated lab equipment at prices everyone can afford.
          </p>
          
          <p className="text-responsive-body text-olive-700">
            Our mission is simple: inspire curiosity, enable discovery, and support every step of your scientific journey with exceptional products and service.
          </p>
        </div>

        {/* Stats - Compact 3-Column Row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-burnt-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-soft">
              <div className="font-display text-2xl md:text-3xl font-bold text-sand-50 mb-0.5 md:mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-sand-100">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values - 2-Column Mini Cards */}
        <div className="mb-6 md:mb-8">
          <h2 className="font-display text-responsive-h2 font-bold text-olive-900 mb-4 md:mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-soft">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-burnt-500 text-sand-50 flex items-center justify-center mb-2 md:mb-3">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-sm md:text-base text-olive-900 mb-1">
                  {value.title}
                </h3>
                <p className="text-xs md:text-sm text-olive-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-sand-100 rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="font-display text-responsive-h2 font-bold text-olive-900 mb-4 md:mb-6">
            What We Offer
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-burnt-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-olive-700">
                Wide range of products for physics, chemistry, and biology labs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-burnt-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-olive-700">
                Trusted by schools, colleges, and home learners nationwide
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-burnt-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-olive-700">
                Fast shipping and secure payment options
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-burnt-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-olive-700">
                Expert support and guidance for your science projects
              </span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center bg-olive-900 rounded-2xl p-6 md:p-8 text-sand-50">
          <p className="text-responsive-body mb-4">
            Whether you're setting up a classroom, working on a personal experiment, or exploring the wonders of science, ScienceHub is your partner in discovery.
          </p>
          <button className="bg-burnt-500 text-sand-50 px-6 py-3 rounded-xl font-semibold hover:bg-burnt-600 transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
