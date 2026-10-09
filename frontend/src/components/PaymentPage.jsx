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

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
    console.log("Using Razorpay Key:", razorpayKey ? razorpayKey.substring(0, 10) + "..." : "NOT SET");

    const options = {
      key: razorpayKey || "rzp_test_RbK6PeigFfj3iJ",
      amount: Math.round(amount * 100), // Convert Rs to paise, rounded
      currency: "INR",
      name: "ScienceHub",
      description: "Order Payment",
      handler: function (response) {
        console.log("Razorpay Response:", response);
        // Only call the success callback - do NOT save here
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: address.name || "Customer",
        contact: address.phone || "",
        email: address.email || "",
      },
      theme: {
        color: "#d97757",
      },
      modal: {
        ondismiss: function () {
          console.log("Payment modal closed by user");
          alert("Payment popup closed.");
        },
      },
    };

    try {
      console.log("Initializing Razorpay with options:", { ...options, key: "***" });
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      alert("Error initiating payment: " + err.message);
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
