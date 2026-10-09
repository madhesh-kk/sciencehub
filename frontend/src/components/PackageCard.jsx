import React from "react";

export default function PackageCard({ product, addToCart, onView }) {
  const discounted = Math.round(product.price * (1 - product.discountPercent / 100));
  
  return (
    <div className="relative rounded-2xl shadow-xl bg-white/60 backdrop-blur-lg border-2 border-transparent hover:border-gradient-to-r hover:from-blue-400 hover:to-pink-400 p-5 flex flex-col items-center transition-transform duration-300 hover:scale-105 group overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-40" />
      <img
        src={product.image}
        alt={product.title || product.name}
        className="w-40 h-40 object-contain rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10"
      />
      <h4 className="font-extrabold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 z-10 animate-fade-in-down">{product.title || product.name}</h4>
      <div className="flex items-center mb-2 z-10">
        <span className="font-bold text-xl text-indigo-600">
          ₹{discounted}
        </span>
        <span className="text-sm line-through text-gray-500 ml-2">
          ₹{product.price}
        </span>
        <span className="ml-2 px-2 py-1 rounded-md bg-green-100 text-green-600 text-xs animate-bounce">
          ({product.discountPercent}% off)
        </span>
      </div>
      <div className="mt-4 flex gap-2 z-10 w-full">
        <button
          onClick={(event) => addToCart(product, event)}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Add to Cart
        </button>
        <button
          className="bg-white/80 px-4 rounded-xl border border-indigo-200 text-indigo-700 font-semibold shadow hover:bg-indigo-50 transition-colors duration-200"
          onClick={() => onView && onView(product)}
        >
          View
        </button>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
