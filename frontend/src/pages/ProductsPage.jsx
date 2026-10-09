
import React, { useState } from "react";
import products from "../data/products";
import PackageCard from "../components/PackageCard";
import ProductDetailModal from "../components/ProductDetailModal";

export default function ProductsPage({ addToCart }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const handleView = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="font-display text-responsive-h2 md:text-3xl font-bold text-olive-900">All Products</h2>
        <span className="text-sm md:text-base font-semibold text-olive-700">{products.length} products</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {products.map((p) => (
          <div key={p.id} className="flex justify-center">
            <PackageCard product={p} addToCart={addToCart} onView={handleView} />
          </div>
        ))}
      </div>
      <ProductDetailModal
        open={modalOpen}
        product={modalProduct}
        onClose={() => setModalOpen(false)}
        onAdd={addToCart}
      />
    </div>
  );
}
