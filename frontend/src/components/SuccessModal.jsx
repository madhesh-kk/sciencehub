import React from "react";

export default function SuccessModal({ open, onClose, data }) {
  if (!open || !data) return null;

  const title = data.title || (data.paymentId ? "Payment Successful" : "Success");
  const message = data.message || (data.paymentId ? `Your order has been placed successfully!` : "Operation completed successfully.");

  return (
    <div className="fixed inset-0 bg-olive-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-sand-50 p-8 md:p-10 rounded-3xl shadow-soft-lg max-w-md w-full text-center animate-fade-in">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-burnt-500 to-terra-600 text-sand-50 flex items-center justify-center text-4xl mx-auto mb-6 shadow-soft">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {/* Title */}
        <h3 className="font-display text-3xl font-bold text-olive-900 mb-4">
          {title}
        </h3>
        
        {/* Message */}
        <p className="text-lg text-olive-700 mb-6">
          {message}
        </p>
        
        {/* Payment ID */}
        {data.paymentId && (
          <div className="bg-sand-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-olive-600 mb-1">Payment ID</p>
            <p className="font-mono text-sm text-olive-900 font-semibold break-all">
              {data.paymentId}
            </p>
          </div>
        )}
        
        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-burnt-500 text-sand-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-soft hover:bg-burnt-600 hover:shadow-soft-lg transition-all duration-200"
        >
          {data.buttonText || "Continue Shopping"}
        </button>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
