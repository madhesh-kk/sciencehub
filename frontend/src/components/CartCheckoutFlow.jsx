import React, { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentPage from "./PaymentPage";

export default function CartCheckoutFlow({ user, cart, amount, onPaymentSuccess, onRequireLogin }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  // If user not logged in, show login prompt and block checkout
  if (!user) {
    return (
      <div className="flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center border border-sand-200">
          <div className="w-16 h-16 rounded-full bg-olive-100 text-olive-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold text-olive-900 mb-2">
            Login Required
          </h2>
          <p className="text-sm text-olive-600 mb-6">
            Please sign in to complete your purchase
          </p>
          <button
            onClick={onRequireLogin}
            className="w-full bg-burnt-500 text-sand-50 px-6 py-3 rounded-xl font-bold hover:bg-burnt-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleNext = (addr) => {
    setAddress(addr);
    setStep(2);
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      const formattedAddress = `${address.name}, ${address.street}, ${address.city} - ${address.pincode} (Phone: ${address.phone})`;
      const payload = {
        username: user.username || "Guest",
        userAddress: formattedAddress,
        paymentId: paymentResponse.razorpay_payment_id || "mock-payment-id",
        orderId: paymentResponse.razorpay_order_id,
        signature: paymentResponse.razorpay_signature,
        amount,
        cart,
      };

      const res = await fetch("http://localhost:8085/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save order data");
      }

      onPaymentSuccess(paymentResponse);
    } catch (err) {
      alert("Failed to save order data: " + err.message);
      console.error(err);
    }
  };

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (step === 1) {
    return (
      <div className="pb-20 md:pb-8 bg-sand-50">
        {/* Collapsible Order Summary - Mobile */}
        <div className="md:hidden bg-white border-b border-sand-200">
          <button
            onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
            className="w-full px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-olive-700">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-burnt-600">₹{amount}</span>
              <svg className={`w-5 h-5 text-olive-600 transition-transform ${orderSummaryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {orderSummaryOpen && (
            <div className="px-4 pb-4 space-y-2 border-t border-sand-200">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-2 text-xs py-2">
                  <span className="text-olive-600">{item.qty}x</span>
                  <span className="flex-1 text-olive-900">{item.title || item.name}</span>
                  <span className="font-semibold text-olive-900">
                    ₹{item.qty * Math.round(item.price * (1 - item.discountPercent / 100))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile: Full-width content */}
        <div className="md:max-w-2xl md:mx-auto md:py-8">
          {/* Step Indicator */}
          <div className="bg-white px-4 py-4 border-b border-sand-200 md:border md:rounded-2xl md:mb-6">
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-burnt-500 text-sand-50 flex items-center justify-center font-bold text-sm md:text-base">
                  1
                </div>
                <span className="text-xs md:text-sm font-medium text-burnt-600 mt-1">Address</span>
              </div>
              <div className="flex-1 h-0.5 bg-sand-300 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-sand-200 text-olive-600 flex items-center justify-center font-bold text-sm md:text-base">
                  2
                </div>
                <span className="text-xs md:text-sm font-medium text-olive-600 mt-1">Payment</span>
              </div>
              <div className="flex-1 h-0.5 bg-sand-300 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-sand-200 text-olive-600 flex items-center justify-center font-bold text-sm md:text-base">
                  3
                </div>
                <span className="text-xs md:text-sm font-medium text-olive-600 mt-1">Review</span>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="px-4 py-4 md:bg-white md:border md:border-sand-200 md:rounded-2xl md:mb-6">
            <h2 className="font-display text-xl md:text-2xl font-bold text-olive-900">
              Delivery Address
            </h2>
            <p className="text-sm text-olive-600 mt-1">Where should we deliver your order?</p>
          </div>
          
          <AddressForm onNext={handleNext} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    if (!address) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="bg-burnt-50 border border-burnt-300 rounded-xl p-6 text-center max-w-md">
            <p className="text-burnt-900 font-semibold">
              Error: Address details missing. Please restart checkout.
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="pb-20 md:pb-8 bg-sand-50">
        {/* Mobile: Full-width content */}
        <div className="md:max-w-2xl md:mx-auto md:py-8">
          {/* Step Indicator */}
          <div className="bg-white px-4 py-4 border-b border-sand-200 md:border md:rounded-2xl md:mb-6">
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-olive-600 text-sand-50 flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-medium text-olive-600 mt-1">Address</span>
              </div>
              <div className="flex-1 h-0.5 bg-olive-600 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-burnt-500 text-sand-50 flex items-center justify-center font-bold text-sm md:text-base">
                  2
                </div>
                <span className="text-xs md:text-sm font-medium text-burnt-600 mt-1">Payment</span>
              </div>
              <div className="flex-1 h-0.5 bg-sand-300 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-sand-200 text-olive-600 flex items-center justify-center font-bold text-sm md:text-base">
                  3
                </div>
                <span className="text-xs md:text-sm font-medium text-olive-600 mt-1">Review</span>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="px-4 py-4 md:bg-white md:border md:border-sand-200 md:rounded-2xl md:mb-6">
            <h2 className="font-display text-xl md:text-2xl font-bold text-olive-900">
              Review & Payment
            </h2>
          </div>

          {/* Address Summary */}
          <div className="bg-white px-4 py-4 border-b border-sand-200 mb-4 md:border md:rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-olive-700">Delivery Address</h3>
              <button 
                onClick={() => setStep(1)}
                className="text-burnt-500 hover:text-burnt-600 text-sm font-semibold"
              >
                Edit
              </button>
            </div>
            <div className="space-y-1 text-sm text-olive-900">
              <p className="font-semibold">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city} - {address.pincode}</p>
              <p>Phone: {address.phone}</p>
            </div>
          </div>

          {/* Payment Section */}
          <PaymentPage address={address} amount={amount} onSuccess={handlePaymentSuccess} />
        </div>
      </div>
    );
  }

  return null;
}
