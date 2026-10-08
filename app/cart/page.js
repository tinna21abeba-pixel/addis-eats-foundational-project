import CartView from "./CartView";

export const metadata = {
  title: "Your Cart",
  description: "Review your selected authentic Ethiopian dishes and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#111111] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-[#181615] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#2b2724]">
        <div className="text-center mb-8">
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
            Order Review
          </span>
          <h1 className="text-3xl font-extrabold text-white font-serif-display">
            Your Cart
          </h1>
        </div>
        <CartView />
      </div>
    </div>
  );
}
