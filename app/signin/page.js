import { Suspense } from "react";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Addis Eats account to manage orders and track deliveries.",
};

export default function SignInPage({ searchParams }) {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#111111] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#181615] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#2b2724]">
        <div className="text-center mb-8">
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
            Account Access
          </span>
          <h1 className="text-3xl font-extrabold text-white font-serif-display">
            Sign In
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Access your orders or manage kitchen operations.
          </p>
        </div>
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-zinc-500">Loading...</div>}>
          <SignInForm searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
