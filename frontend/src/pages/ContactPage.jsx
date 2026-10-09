import React, { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: null });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isBusinessOpen = () => {
    const day = currentTime.getDay();
    const hour = currentTime.getHours();
    
    // Monday-Friday: 9am-6pm, Saturday: 10am-4pm, Sunday: Closed
    if (day === 0) return false; // Sunday
    if (day === 6) return hour >= 10 && hour < 16; // Saturday
    return hour >= 9 && hour < 18; // Monday-Friday
  };

  const getCurrentDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[currentTime.getDay()];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ submitted: false, error: "Please fill all fields" });
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    setFormStatus({ submitted: true, error: null });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setFormStatus({ submitted: false, error: null });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (formStatus.error) {
      setFormStatus({ ...formStatus, error: null });
    }
  };

  const quickActions = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Call",
      action: "tel:+919876543210",
      color: "bg-burnt-500"
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: "WhatsApp",
      action: "https://wa.me/919876543210",
      color: "bg-green-600"
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      action: "mailto:support@minilabstore.com",
      color: "bg-burnt-500"
    }
  ];

  const contactInfo = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "support@minilabstore.com",
      href: "mailto:support@minilabstore.com"
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210"
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Address",
      value: "123 Science Avenue, Lab City, India",
      href: "https://maps.google.com/?q=123+Science+Avenue+Lab+City+India"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", days: [1, 2, 3, 4, 5] },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM", days: [6] },
    { day: "Sunday", hours: "Closed", days: [0] }
  ];

  const isCurrentDay = (days) => days.includes(currentTime.getDay());

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-12 box-border">
        {/* Page Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="font-display text-responsive-h1 font-bold text-olive-900 mb-2 md:mb-3">
            Get in Touch
          </h1>
          <p className="text-sm md:text-base text-olive-600 leading-relaxed max-w-2xl mx-auto">
            Have questions or need support? We're here to help!
          </p>
        </div>

        {/* Quick Actions - Mobile */}
        <div className="grid grid-cols-3 gap-2 mb-6 md:hidden">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.action}
              target={action.label === "WhatsApp" ? "_blank" : undefined}
              rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className={`${action.color} text-sand-50 rounded-xl py-3 flex flex-col items-center justify-center gap-1.5 hover:opacity-90 transition-opacity`}
            >
              {action.icon}
              <span className="text-xs font-semibold">{action.label}</span>
            </a>
          ))}
        </div>

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          {/* Left Column - Contact Info & Hours */}
          <div className="space-y-4">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="px-4 py-3 border-b border-sand-200">
                <h2 className="font-display text-lg md:text-xl font-bold text-olive-900">
                  Contact Information
                </h2>
              </div>
              <div className="divide-y divide-sand-200">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.label === "Address" ? "_blank" : undefined}
                    rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-sand-50 transition-colors group"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-burnt-500 text-sand-50 flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm font-semibold text-olive-700 mb-0.5">
                        {info.label}
                      </div>
                      <div className="text-sm md:text-base text-olive-900 break-words overflow-wrap-anywhere">
                        {info.value}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-olive-400 group-hover:text-burnt-500 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-olive-900 rounded-2xl shadow-soft overflow-hidden">
              <div className="px-4 py-3 border-b border-olive-800">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg md:text-xl font-bold text-sand-50">
                    Business Hours
                  </h2>
                  {isBusinessOpen() ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Open Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-sand-600 text-white text-xs font-semibold">
                      Closed
                    </span>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 space-y-2.5">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between text-sm ${
                      isCurrentDay(schedule.days)
                        ? 'font-semibold text-sand-50'
                        : 'text-sand-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCurrentDay(schedule.days) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-burnt-500"></span>
                      )}
                      <span>{schedule.day}</span>
                    </div>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="px-4 py-3 border-b border-sand-200">
              <h2 className="font-display text-lg md:text-xl font-bold text-olive-900">
                Send a Message
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-olive-900 mb-1.5">
                  Your Name <span className="text-burnt-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full h-11 md:h-12 px-3 rounded-xl border-2 border-sand-300 bg-white text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 transition-colors text-sm box-border"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-olive-900 mb-1.5">
                  Email Address <span className="text-burnt-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  autoComplete="email"
                  className="w-full h-11 md:h-12 px-3 rounded-xl border-2 border-sand-300 bg-white text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 transition-colors text-sm box-border"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-semibold text-olive-900 mb-1.5">
                  Message <span className="text-burnt-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-sand-300 bg-white text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 transition-colors resize-none text-sm box-border"
                  required
                />
              </div>

              {formStatus.error && (
                <div className="text-xs text-burnt-600 bg-burnt-50 px-3 py-2 rounded-lg">
                  {formStatus.error}
                </div>
              )}

              {formStatus.submitted ? (
                <div className="w-full bg-green-500 text-white h-11 md:h-12 rounded-xl font-bold flex items-center justify-center text-sm">
                  ✓ Message Sent Successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-burnt-500 text-sand-50 h-11 md:h-12 rounded-xl font-bold hover:bg-burnt-600 transition-colors text-sm"
                >
                  Send Message
                </button>
              )}
            </form>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-6 text-center bg-sand-100 rounded-xl p-3 md:p-4">
          <p className="text-xs md:text-sm text-olive-700">
            Need quick answers? Check our{" "}
            <a href="#" className="font-semibold text-burnt-600 hover:text-burnt-700">
              FAQ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
