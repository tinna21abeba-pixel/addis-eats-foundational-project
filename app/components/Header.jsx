"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push("/menu");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Orders", href: "/orders" },
    { name: "Kitchen", href: "/kitchen" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#141312]/95 backdrop-blur-md border-b border-[#252321] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-1.5 text-amber-500 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 36 36" fill="currentColor" className="w-full h-full">
              <path d="M12 9c1-2.5 3-3.5 3-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M18 9c1-2.5 3-3.5 3-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M24 9c1-2.5 3-3.5 3-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M5 14h26c0 0 1 8-6 13-3 2.5-5 3.5-7 3.5s-4-1-7-3.5C4 22 5 14 5 14z" />
              <path d="M13 30.5h10c0 1.8-1.8 3-5 3s-5-1.2-5-3z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              Addis <span className="text-amber-500">Eats</span>
            </span>
            <span className="text-[11px] text-amber-400 font-medium tracking-wider mt-1">
              Authentic Ethiopian Food
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
            <svg
              className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="bg-[#222120] text-sm text-zinc-200 placeholder-zinc-500 pl-9 pr-4 py-1.5 rounded-full border border-zinc-700/60 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 w-44 lg:w-56 transition-all"
            />
          </form>

          <Link
            href="/cart"
            className="relative p-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/60 rounded-full transition"
            aria-label="Shopping Cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white font-bold text-[11px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/signin"
            className="p-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/60 rounded-full transition"
            aria-label="User Account"
            title="Account / Sign In"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 9a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#252321] flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/signin"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-zinc-800"
          >
            Sign In / Switch Role
          </Link>
        </div>
      )}
    </header>
  );
}