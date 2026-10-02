import Link from "next/link";
import dishes from "../data/dishes";
import MenuCounter from "./MenuCounter";

export default function MenuSidebar() {
  return (
    <aside className="w-full md:w-64 bg-[#141211] border-b md:border-b-0 md:border-r border-[#26211e] p-6 flex flex-col gap-6 shrink-0">
      <div>
        <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3">
          Menu Navigation
        </h2>
        <nav className="flex flex-col gap-1">
          <Link
            href="/menu"
            className="text-zinc-200 hover:text-amber-400 transition py-1.5 px-3 rounded-lg hover:bg-zinc-800/50 text-sm font-medium"
          >
            All Dishes
          </Link>
          <div className="text-[11px] uppercase text-zinc-500 font-semibold tracking-wider mt-4 mb-2 px-3">
            Popular Dishes
          </div>
          {dishes.slice(0, 6).map((dish) => (
            <Link
              key={dish.id}
              href={`/menu/${dish.id}`}
              className="text-zinc-400 hover:text-amber-400 transition py-1.5 px-3 rounded-lg hover:bg-zinc-800/50 text-sm truncate"
            >
              {dish.name}
            </Link>
          ))}
        </nav>
      </div>

      <MenuCounter />
    </aside>
  );
}
