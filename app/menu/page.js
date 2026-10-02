import { Suspense } from "react";
import { listDishes } from "../lib/store";
import FilterShell from "./FilterShell";
import DishList from "./DishList";

export const revalidate = 60;

function MenuSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#181615] rounded-2xl overflow-hidden border border-[#2b2724] p-5 space-y-4">
            <div className="h-44 bg-zinc-800/60 rounded-xl w-full" />
            <div className="h-5 bg-zinc-800 rounded w-2/3" />
            <div className="h-3 bg-zinc-800 rounded w-full" />
            <div className="h-3 bg-zinc-800 rounded w-4/5" />
            <div className="h-8 bg-zinc-800/80 rounded-lg w-full mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || "All";
  const allDishes = listDishes();
  const categories = ["All", ...new Set(allDishes.map((dish) => dish.category))];

  return (
    <FilterShell selectedCategory={selectedCategory} categories={categories}>
      <Suspense fallback={<MenuSkeleton />}>
        <DishList selectedCategory={selectedCategory} />
      </Suspense>
    </FilterShell>
  );
}