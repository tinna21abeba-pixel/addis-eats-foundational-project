"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function MenuExplorer({ initialDishes = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [dishes, setDishes] = useState(initialDishes);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery && selectedCategory === "All") {
      setDishes(initialDishes);
      return;
    }

    let active = true;
    const fetchFiltered = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") params.set("category", selectedCategory);
        if (debouncedQuery) params.set("q", debouncedQuery);

        const res = await fetch(`/api/dishes?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data.dishes)) {
            startTransition(() => {
              setDishes(data.dishes);
            });
          }
        }
      } catch {}
    };

    fetchFiltered();

    return () => {
      active = false;
    };
  }, [debouncedQuery, selectedCategory, initialDishes]);

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1 block">
          Taste Tradition
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 font-serif-display">
          Our Authentic Menu
        </h1>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          Explore authentic flavors crafted with traditional Ethiopian recipes, fresh
          ingredients, and fragrant berbere spices.
        </p>

        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <svg
              className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
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
              placeholder="Search dishes (e.g. Tibs, Shiro, Kitfo)..."
              className="w-full bg-[#1c1917] text-sm text-zinc-200 placeholder-zinc-500 pl-11 pr-4 py-3 rounded-full border border-zinc-700/60 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-[#1f1c1a] text-zinc-300 hover:text-white hover:bg-zinc-800 border border-[#302a26]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {dishes.length === 0 ? (
        <div className="text-center py-16 bg-[#181615] rounded-2xl border border-[#2b2724]">
          <p className="text-zinc-400 text-sm">No dishes found matching your criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-semibold rounded-full transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#181615] rounded-2xl overflow-hidden border border-[#2b2724] shadow-md hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={dish.image || "/images/banner.jpg"}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#141211]/80 backdrop-blur-md text-amber-400 font-semibold text-xs px-2.5 py-1 rounded-full border border-amber-500/30">
                  {dish.category}
                </span>
                {dish.badge && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-zinc-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                    {dish.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="text-xl font-bold text-white font-serif-display">
                    {dish.name}
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-amber-400 shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{dish.rating || "4.8"}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed mb-5 line-clamp-2">
                  {dish.description}
                </p>

                <div className="mt-auto pt-3 border-t border-[#292522] flex items-center justify-between mb-4">
                  <span className="text-amber-500 text-lg font-bold">
                    ETB {dish.price}
                  </span>
                  <span className="text-zinc-500 text-xs">
                    {dish.reviews ? `${dish.reviews} reviews` : "Traditional recipe"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/menu/${dish.id}`}
                    className="w-1/3 text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2.5 rounded-lg font-medium text-xs transition border border-zinc-700/60 flex items-center justify-center"
                  >
                    Details
                  </Link>
                  <div className="w-2/3">
                    <AddToCartButton dish={dish} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
