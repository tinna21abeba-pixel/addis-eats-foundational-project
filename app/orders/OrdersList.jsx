"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CancelOrderButton from "./CancelOrderButton";
import { cancelOrder } from "../actions";

export default function OrdersList({ initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.cancelOrder = cancelOrder;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.orders)) {
            setOrders(data.orders);
          }
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="bg-[#181615] border border-[#2b2724] rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700 mx-auto flex items-center justify-center text-zinc-400 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 font-serif-display">No orders yet</h3>
        <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">
          You haven&apos;t placed any orders yet. Discover our signature dishes and place your first order.
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
    <ul className="flex flex-col gap-4">
      {orders.map((o) => (
        <li key={o.id} className="bg-[#181615] border border-[#2b2724] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="font-bold text-white text-base font-serif-display">{o.id}</span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    o.status === "cancelled"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : o.status === "delivered"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : o.status === "ready"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : o.status === "preparing"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <p className="text-zinc-300 text-sm">
                {o.items.map((i) => `${i.quantity} x ${i.name}`).join(", ")}
              </p>
              <p className="text-zinc-500 text-xs mt-1.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{o.address}</span>
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-amber-500 font-bold text-lg">ETB {o.total}</p>
              {o.createdAt && (
                <p className="text-zinc-500 text-xs mt-0.5">
                  {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>
          </div>
          {o.status === "pending" && <CancelOrderButton orderId={o.id} />}
        </li>
      ))}
    </ul>
  );
}
