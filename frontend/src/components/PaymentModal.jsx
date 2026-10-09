
import React, { useEffect } from "react";

/* PaymentModal props:
   open (bool), onClose(), amount (number, rupees), onSuccess(paymentResponse)
*/
export default function PaymentModal({open, onClose, amount=0, onSuccess}){
  useEffect(() => {
    // no-op; Razorpay script is loaded in index.html
  }, []);

  if(!open) return null;
  const key = import.meta.env.VITE_RAZORPAY_KEY || "";

  const startPayment = () => {
    if(!key){ alert("Razorpay key not configured in .env"); return; }
    const options = {
      key,
      amount: Math.max(1, Math.round(amount * 100)), // paise
      currency: "INR",
      name: "ScienceHub",
      description: "Order Payment",
      handler: function(response){ onSuccess && onSuccess(response); },
      prefill: { name: "Customer", contact: "9999999999" },
      theme: { color: "#3399cc" }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in-down">
      <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/30 backdrop-blur-lg">
        <h3 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600">Pay Now</h3>
        <p className="mb-6 text-lg font-bold text-blue-700">Amount: ₹{amount}</p>
        <div className="flex gap-4">
          <button onClick={startPayment} className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-200">Pay with Razorpay (Test)</button>
          <button onClick={onClose} className="bg-white/80 px-6 py-3 rounded-xl border border-blue-200 text-blue-600 font-semibold shadow hover:bg-blue-50 transition-colors duration-200">Cancel</button>
        </div>
        <style>{`
          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
