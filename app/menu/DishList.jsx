import Link from "next/link";
import Image from "next/image";
import dishes from "../data/dishes";
import AddToCartButton from "./AddToCartButton";

export default function DishList({ selectedCategory = "All" }) {
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredDishes.map((dish) => (
        <div
          key={dish.id}
          className="bg-[#181615] rounded-2xl overflow-hidden border border-[#2b2724] shadow-md hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col group"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
            <Image
              src={dish.image || "/images/banner.jpg"}
              alt={dish.name}
              fill
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
              <h3 className="text-xl font-bold text-white font-serif-display">
                {dish.name}
              </h3>
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
  );
}