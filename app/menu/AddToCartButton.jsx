"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ dish, className = "", children }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    addItem(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const defaultClasses = `w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
    added
      ? "bg-emerald-700 text-white shadow-sm"
      : "bg-[#0c433b] hover:bg-[#07302a] text-white shadow-sm hover:shadow active:scale-[0.99]"
  }`;

  return (
    <button
      onClick={handleClick}
      type="button"
      className={className || defaultClasses}
      aria-label={`Add ${dish.name} to cart`}
    >
      {added ? (
        <>
          <svg className="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Added!</span>
        </>
      ) : children ? (
        children
      ) : (
        <>
          <svg className="w-4 h-4 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}
