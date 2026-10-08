import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout",
  description: "Complete your authentic Ethiopian meal order with secure checkout.",
};

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/checkout");
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#111111] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-[#181615] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#2b2724]">
        <div className="text-center mb-8">
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
            Delivery Details
          </span>
          <h1 className="text-3xl font-extrabold text-white font-serif-display">
            Checkout
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Complete your order to enjoy authentic Ethiopian food hot and fresh.
          </p>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}