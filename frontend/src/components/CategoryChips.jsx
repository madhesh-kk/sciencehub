import React, { useState } from "react";
import products from "../data/products";

export default function CategoryChips({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = [
    { id: "all", name: "All", icon: "🏪" },
    ...Array.from(new Set(products.map(p => p.category)))
      .filter(Boolean)
      .map((cat, idx) => {
        const iconMap = {
          "Microscopes": "🔬",
          "Glassware": "🧪",
          "Safety Equipment": "🛡️",
          "Medical Equipment": "🩺",
          "Kits": "📦",
          "Accessories": "🔧",
          "Measuring Instruments": "📏",
          "Chemicals": "⚗️",
        };
        return {
          id: cat,
          name: cat,
          icon: iconMap[cat] || "•",
        };
      }),
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId === "all" ? "all" : categoryId);
    }
  };

  return (
    <div className="bg-sand-50 border-b border-sand-200 py-3 px-2 md:px-0">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg flex-shrink-0 min-w-fit transition-all ${
              selectedCategory === category.id
                ? "bg-burnt-500 text-sand-50 shadow-soft"
                : "bg-white text-olive-700 border border-sand-200 hover:border-burnt-300"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-xs font-medium text-center whitespace-nowrap max-w-[60px] truncate">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
