import React from "react";

export default function PaymentPage({ address, amount, onSuccess }) {
  const handleRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your index.html.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Invalid payment amount.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_RbK6PeigFfj3iJ",
      amount: Math.round(amount * 100), // Convert Rs to paise, rounded
      currency: "INR",
      name: "ScienceHub",
      description: "Order Payment",
      handler: function (response) {
        // Only call the success callback - do NOT save here
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: address.name,
        contact: address.phone,
      },
      theme: {
        color: "#1976d2",
      },
      modal: {
        ondismiss: function () {
          alert("Payment popup closed.");
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error initiating payment: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Confirm & Pay</h3>
      <p>
        <b>Deliver to:</b> {address.name}, {address.street}, {address.city} - {address.pincode} ({address.phone})
      </p>
      <p className="mt-4 mb-4">
        <b>Total Amount: ₹{amount}</b>
      </p>
      <button onClick={handleRazorpay} className="bg-green-500 text-white px-4 py-2 rounded">
        Pay with Razorpay
      </button>
    </div>
  );
}
