"use client";

import { useActionState, use } from "react";
import { signInAction } from "../actions";

const inputClass =
  "w-full bg-[#201d1b] border border-[#332e29] rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-sm transition-all";

function sanitizeNext(next) {
  if (!next || typeof next !== "string") return "/";
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("://")) {
    return "/";
  }
  return next;
}

export default function SignInForm({ searchParams }) {
  const resolvedParams = searchParams ? use(searchParams) : {};
  const rawNext = resolvedParams?.next || "/";
  const safeNext = sanitizeNext(rawNext);

  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4 text-left">
        <input type="hidden" name="next" value={safeNext} />

        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue="Almaz Kebede"
            required
            className={inputClass}
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue="almaz@example.com"
            required
            className={inputClass}
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            className={inputClass}
            defaultValue="customer"
          >
            <option value="customer" className="bg-[#181615] text-white">Customer (Order & Track)</option>
            <option value="kitchen" className="bg-[#181615] text-white">Kitchen Staff (Kitchen Board)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[#e59e2a] hover:bg-[#d48e1d] disabled:opacity-60 disabled:cursor-not-allowed transition py-3 px-6 rounded-full font-bold text-zinc-950 shadow-md shadow-amber-500/20 text-sm mt-2 flex items-center justify-center gap-2"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="pt-4 border-t border-[#292522] flex flex-col gap-2">
        <span className="text-xs text-zinc-500 text-center uppercase tracking-wider">
          Quick Demo Login
        </span>
        <div className="grid grid-cols-2 gap-2">
          <form action={formAction}>
            <input type="hidden" name="next" value={safeNext} />
            <input type="hidden" name="name" value="Almaz Kebede" />
            <input type="hidden" name="email" value="almaz@addiseats.com" />
            <input type="hidden" name="role" value="customer" />
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition text-center"
            >
              As Customer
            </button>
          </form>

          <form action={formAction}>
            <input type="hidden" name="next" value={safeNext === "/" ? "/kitchen" : safeNext} />
            <input type="hidden" name="name" value="Kitchen Staff" />
            <input type="hidden" name="email" value="kitchen@addiseats.com" />
            <input type="hidden" name="role" value="kitchen" />
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-lg text-xs font-medium transition text-center"
            >
              As Kitchen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
