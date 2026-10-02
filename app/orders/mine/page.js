import Link from "next/link";
import { getSession } from "../../lib/session";
import { listOrdersByUser, toOwnerOrder } from "../../lib/store";
import CancelOrderButton from "../CancelOrderButton";

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const session = await getSession();
  const orders = session ? listOrdersByUser(session.userId).map(toOwnerOrder) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-white">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
            Customer Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-display">
            My Orders
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Track your delicious meals and order history.
          </p>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
        >
          <span>Order more</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {orders.length === 0 ? (
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
      ) : (
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
                </div>
              </div>
              {o.status === "pending" && <CancelOrderButton orderId={o.id} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}