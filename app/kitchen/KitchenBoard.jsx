"use client";

import { useTransition } from "react";
import { updateOrderStatusAction } from "../actions";

export default function KitchenBoard({ initialOrders = [] }) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (orderId, nextStatus) => {
    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("nextStatus", nextStatus);
    startTransition(async () => {
      await updateOrderStatusAction(formData);
    });
  };

  if (initialOrders.length === 0) {
    return (
      <div className="bg-[#181615] border border-[#2b2724] rounded-2xl p-12 text-center">
        <p className="text-zinc-400 text-sm">No orders currently in the kitchen queue.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {initialOrders.map((o) => (
        <div
          key={o.id}
          className="bg-[#181615] border border-[#2b2724] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-lg font-serif-display text-white">{o.id}</span>
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
              <span className="text-xs text-zinc-500">
                {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <div className="text-zinc-300 text-sm mb-2">
              <span className="text-white font-medium">{o.name}</span> ({o.phone}) &bull;{" "}
              <span className="text-zinc-400">{o.address}</span>
            </div>

            <div className="bg-[#131110] border border-[#221f1c] rounded-xl p-3 text-sm text-zinc-300 mb-2">
              <ul className="space-y-1">
                {o.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.quantity} &times; {item.name}</span>
                    <span className="text-zinc-400">ETB {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              {o.note && (
                <p className="mt-2 text-xs text-amber-400/90 italic border-t border-[#221f1c] pt-2">
                  Note: {o.note}
                </p>
              )}
            </div>

            <div className="text-amber-500 font-bold text-base">
              Total: ETB {o.total}
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            {o.status === "pending" && (
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleUpdate(o.id, "preparing")}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-lg transition"
              >
                Start Preparing
              </button>
            )}

            {o.status === "preparing" && (
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleUpdate(o.id, "ready")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition"
              >
                Mark as Ready
              </button>
            )}

            {o.status === "ready" && (
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleUpdate(o.id, "delivered")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition"
              >
                Mark Delivered
              </button>
            )}

            {o.status !== "cancelled" && o.status !== "delivered" && (
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleUpdate(o.id, "cancelled")}
                className="px-4 py-2 bg-zinc-800 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 border border-zinc-700/60 disabled:opacity-50 text-xs rounded-lg transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
