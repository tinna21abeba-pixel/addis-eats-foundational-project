"use client";

import Link from "next/link";

export default function FilterShell({
  selectedCategory = "All",
  categories = [],
  children,
}) {
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

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Link
                key={category}
                href={
                  category === "All" ? "/menu" : `/menu?category=${category}`
                }
                scroll={false}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-[#1f1c1a] text-zinc-300 hover:text-white hover:bg-zinc-800 border border-[#302a26]"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </section>

      <div>{children}</div>
    </div>
  );
}
