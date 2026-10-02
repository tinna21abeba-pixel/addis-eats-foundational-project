import Link from "next/link";
import { listOrders, toPublicOrder } from "../lib/store";

export const dynamic = "force-dynamic";

export default function OrdersBoardPage() {
  const orders = listOrders().map(toPublicOrder);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-white">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
            Realtime Updates
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-display">
            Kitchen Board
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Live orders being prepared in our authentic Ethiopian kitchen.
          </p>
        </div>

        <Link
          href="/orders/mine"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
        >
          <span>See my orders</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#181615] border border-[#2b2724] rounded-2xl p-10 text-center">
          <p className="text-zinc-400 text-sm">No orders currently on the kitchen board.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((o) => (
            <li
              key={o.id}
              className="bg-[#181615] border border-[#2b2724] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-amber-500/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="font-bold text-white text-base font-serif-display">{o.id}</span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      o.status === "cancelled"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">
                  {o.items.map((i) => `${i.quantity} x ${i.name}`).join(", ")}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="text-amber-500 font-bold text-lg">ETB {o.total}</p>
                <p className="text-zinc-500 text-xs">
                  {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}