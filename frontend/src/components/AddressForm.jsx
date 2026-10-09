import React, { useState } from "react";

// InputField component extracted to module level to prevent re-creation on each render
// This prevents focus loss when parent component's state changes
const InputField = ({ label, name, type = "text", inputMode, autoComplete, placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-olive-900 mb-1.5">
      {label} <span className="text-burnt-500">*</span>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full h-12 px-4 rounded-xl border-2 bg-white text-olive-900 placeholder-olive-400 transition-colors focus:outline-none ${
        error 
          ? 'border-burnt-500 focus:border-burnt-600' 
          : 'border-sand-300 focus:border-burnt-500'
      }`}
    />
    {error && (
      <p className="mt-1 text-xs text-burnt-600">{error}</p>
    )}
  </div>
);

export default function AddressForm({ onNext }) {
  const [address, setAddress] = useState({
    name: "", phone: "", street: "", city: "", pincode: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!address.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(address.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    
    if (!address.street.trim()) {
      newErrors.street = "Street address is required";
    }
    
    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pin code is required";
    } else if (!/^\d{6}$/.test(address.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pin code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onNext(address);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white md:border md:border-sand-200 md:rounded-2xl">
      <div className="px-4 py-4 md:p-6">
        <InputField
          label="Full Name"
          name="name"
          autoComplete="name"
          placeholder="Enter your full name"
          value={address.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile number"
          value={address.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <InputField
          label="Street Address"
          name="street"
          autoComplete="street-address"
          placeholder="House no., Building name, Street"
          value={address.street}
          onChange={handleChange}
          error={errors.street}
        />

        {/* City and Pin Code side by side */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-olive-900 mb-1.5">
              City <span className="text-burnt-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className={`w-full h-12 px-4 rounded-xl border-2 bg-white text-olive-900 placeholder-olive-400 transition-colors focus:outline-none ${
                errors.city 
                  ? 'border-burnt-500 focus:border-burnt-600' 
                  : 'border-sand-300 focus:border-burnt-500'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-burnt-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-olive-900 mb-1.5">
              Pin Code <span className="text-burnt-500">*</span>
            </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="6 digits"
              maxLength="6"
              value={address.pincode}
              onChange={handleChange}
              className={`w-full h-12 px-4 rounded-xl border-2 bg-white text-olive-900 placeholder-olive-400 transition-colors focus:outline-none ${
                errors.pincode 
                  ? 'border-burnt-500 focus:border-burnt-600' 
                  : 'border-sand-300 focus:border-burnt-500'
              }`}
            />
            {errors.pincode && (
              <p className="mt-1 text-xs text-burnt-600">{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-sand-200 px-4 py-3 z-30 safe-bottom md:border-0 md:p-6 md:pt-0" style={{ paddingBottom: 'md' in {} ? 'auto' : 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
        <button
          type="submit"
          className="mobile-button-lg w-full bg-burnt-500 text-sand-50 hover:bg-burnt-600 transition-colors shadow-sm"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
