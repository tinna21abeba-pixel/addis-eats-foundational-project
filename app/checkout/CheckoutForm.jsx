"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../actions/orders";

const inputClass =
  "w-full bg-[#201d1b] border border-[#332e29] rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-sm transition-all";

function FieldError({ errors }) {
  if (!errors?.length) return null;
  return <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">{errors[0]}</p>;
}

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, null);

  useEffect(() => {
    if (state?.ok) clearCart();
  }, [state, clearCart]);

  if (state?.ok) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 font-serif-display">Order Confirmed!</h2>
        <p className="text-zinc-300 text-sm mb-6">
          Your order number is <span className="font-bold text-amber-400">{state.orderId}</span>. Our kitchen is now preparing your meal.
        </p>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 bg-[#e59e2a] hover:bg-[#d48e1d] transition px-7 py-3 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20"
        >
          <span>View My Orders</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-zinc-400 text-sm mb-6">Your cart is empty.</p>
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

  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const errors = state?.fieldErrors ?? {};
  const v = state?.values ?? {};

  const payload = JSON.stringify(
    items.map((i) => ({ dishId: i.id, quantity: i.quantity || 1 }))
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 text-left">
      <input type="hidden" name="items" value={payload} />

      {state && !state.ok && (
        <div className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
          <p>{state.message}</p>
          <FieldError errors={errors.items} />
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={v.name}
          className={inputClass}
          placeholder="Abebe Kebede"
        />
        <FieldError errors={errors.name} />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          defaultValue={v.phone}
          className={inputClass}
          placeholder="0911234567"
          inputMode="tel"
        />
        <FieldError errors={errors.phone} />
      </div>

      <div>
        <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Delivery Address
        </label>
        <input
          id="address"
          name="address"
          defaultValue={v.address}
          className={inputClass}
          placeholder="Bole, Addis Ababa"
        />
        <FieldError errors={errors.address} />
      </div>

      <div>
        <label htmlFor="note" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Special Note (Optional)
        </label>
        <textarea
          id="note"
          name="note"
          defaultValue={v.note}
          rows={2}
          className={inputClass}
          placeholder="e.g. Extra spicy, call upon arrival"
        />
        <FieldError errors={errors.note} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#2a2622]">
        <span className="text-zinc-400 font-medium">Total Amount</span>
        <span className="text-2xl font-bold text-amber-500">ETB {total}</span>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#e59e2a] hover:bg-[#d48e1d] disabled:opacity-60 disabled:cursor-not-allowed transition py-3 px-6 rounded-full font-bold text-zinc-950 shadow-md shadow-amber-500/20 text-sm mt-2 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <span>Placing Order...</span>
        ) : (
          <>
            <span>Place Order</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}