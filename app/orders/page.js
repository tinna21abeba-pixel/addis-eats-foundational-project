import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import { listOrdersByUser, toOwnerOrder } from "../lib/store";
import OrdersList from "./OrdersList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Orders",
  description: "Track your Addis Eats orders and view live delivery status.",
};

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const orders = listOrdersByUser(session.userId).map(toOwnerOrder);

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
            Track your delicious meals and real-time preparation status.
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

      <OrdersList initialOrders={orders} />
    </div>
  );
}