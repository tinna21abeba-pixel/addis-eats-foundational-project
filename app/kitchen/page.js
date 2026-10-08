import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import { listOrders } from "../lib/store";
import KitchenBoard from "./KitchenBoard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kitchen Board",
  description: "Real-time kitchen order management board for Addis Eats kitchen staff.",
};

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  if (session.role !== "kitchen") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-white">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold font-serif-display mb-2">Access Restricted</h1>
        <p className="text-zinc-400 text-sm mb-6">
          The kitchen board is restricted to authorized kitchen staff accounts. You are signed in as a customer ({session.name}).
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/orders"
            className="px-5 py-2.5 bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 font-bold rounded-full text-xs transition"
          >
            Go to My Orders
          </Link>
          <Link
            href="/signin?next=/kitchen"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-full text-xs transition"
          >
            Switch Account
          </Link>
        </div>
      </div>
    );
  }

  const orders = listOrders();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-white">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
            Staff Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-display">
            Kitchen Management Board
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Signed in as {session.name} ({session.role}).
          </p>
        </div>
        <Link
          href="/orders"
          className="text-xs text-zinc-400 hover:text-white transition"
        >
          Customer View
        </Link>
      </div>

      <KitchenBoard initialOrders={orders} />
    </div>
  );
}
