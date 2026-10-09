import React from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

export default function RelatedProducts({ currentProductId, onNavigateToProduct, addToCart }) {
  // Get current product
  const currentProduct = products.find(p => p.id === currentProductId);

  // Get related products (same category, excluding current product)
  let relatedProducts = products.filter(
    p => p.category === currentProduct?.category && p.id !== currentProductId
  );

  // If not enough products in same category, add random products
  if (relatedProducts.length < 4) {
    const otherProducts = products.filter(
      p => p.category !== currentProduct?.category && p.id !== currentProductId
    );
    const additional = otherProducts.slice(0, 4 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...additional];
  }

  // Limit to 6 products
  relatedProducts = relatedProducts.slice(0, 6);

  return (
    <section className="py-12 border-t border-sand-200">
      <h2 className="font-display text-3xl font-bold text-olive-900 mb-8 text-center">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={() => onNavigateToProduct(product.id)}
            onAdd={addToCart}
          />
        ))}
      </div>
    </section>
  );
}
