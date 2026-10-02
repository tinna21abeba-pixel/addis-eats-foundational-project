"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartView() {
  const { items, addItem, removeItem, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700 mx-auto flex items-center justify-center text-zinc-400 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 font-serif-display">Your cart is empty</h3>
        <p className="text-zinc-400 text-sm max-w-sm mx-auto mb-8">
          Explore our menu and add authentic Ethiopian dishes to your cart.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-[#e59e2a] hover:bg-[#d48e1d] transition px-7 py-3 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20"
        >
          <span>Browse Menu</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="divide-y divide-[#2a2622]">
        {items.map((item) => (
          <div
            key={item.id}
            className="py-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              {item.image && (
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-bold text-white text-base font-serif-display leading-snug">
                  {item.name}
                </h3>
                <p className="text-zinc-400 text-xs mt-0.5">
                  ETB {item.price} &times; {item.quantity || 1}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-amber-500 text-base">
                ETB {item.price * (item.quantity || 1)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1.5 text-zinc-400 hover:text-red-400 transition rounded-lg hover:bg-zinc-800"
                aria-label={`Remove ${item.name}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[#2a2622] flex items-center justify-between">
        <span className="text-zinc-400 font-medium">Subtotal</span>
        <span className="text-2xl font-bold text-amber-500">ETB {total}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          href="/checkout"
          className="flex-1 text-center bg-[#e59e2a] hover:bg-[#d48e1d] transition py-3 px-6 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        <button
          onClick={clearCart}
          className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-full text-xs font-semibold text-zinc-300"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
