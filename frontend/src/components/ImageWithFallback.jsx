import React, { useState, useEffect } from "react";
import { placeholderImage } from "../data/products";

/**
 * Image component with fallback for broken/missing images
 * Automatically handles loading states and errors
 * Amazon images may be blocked due to referrer policy - falls back immediately
 */
export default function ImageWithFallback({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = placeholderImage,
  onError,
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Check if URL is from Amazon (likely to be blocked)
  const isAmazonUrl = src?.includes('amazon.com') || src?.includes('media-amazon');

  useEffect(() => {
    // If Amazon URL, try to load but be ready for failure
    if (isAmazonUrl) {
      const img = new Image();
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        setImageSrc(fallbackSrc);
        setHasError(true);
        setIsLoading(false);
      };
      img.src = src;
      
      // Timeout after 3 seconds if image doesn't load
      const timeout = setTimeout(() => {
        if (isLoading) {
          setImageSrc(fallbackSrc);
          setHasError(true);
          setIsLoading(false);
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [src, isAmazonUrl, fallbackSrc, isLoading]);

  const handleError = (e) => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
      if (onError) onError(e);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-sand-200 animate-pulse rounded-inherit" />
      )}
      <img
        src={imageSrc}
        alt={alt || "Product image"}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
}
