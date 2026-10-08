import Link from "next/link";
import Image from "next/image";
import dishes from "./data/dishes";
import AddToCartButton from "./menu/AddToCartButton";

export const metadata = {
  title: "Authentic Ethiopian Food & Delivery",
  description: "Experience the true taste of Ethiopia with authentic traditional dishes delivered fresh to your doorstep.",
};

export default function HomePage() {
  const featuredDishes = [
    dishes.find((d) => d.name === "Doro Wat") || dishes[1],
    dishes.find((d) => d.name === "Tibs") || dishes[3],
    dishes.find((d) => d.name === "Shiro") || dishes[5],
    dishes.find((d) => d.name === "Kitfo") || dishes[0],
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#181411] via-[#14110f] to-[#100e0d] border-b border-[#25201c] pt-12 pb-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <span className="text-amber-500 font-semibold text-xs tracking-[0.25em] uppercase mb-4">
                Traditional Flavors, Modern Convenience
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-serif-display">
                Experience the <br />
                True Taste of <br />
                <span className="font-script text-amber-400 text-6xl sm:text-7xl lg:text-8xl italic block -mt-1 font-normal">
                  Ethiopia
                </span>
              </h1>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                From our traditional recipes to your table. We bring the rich flavors
                of Ethiopian cuisine straight to you, fresh, authentic, and always
                made with love.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/menu"
                  className="bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 font-bold px-7 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Order Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <Link
                  href="/menu"
                  className="border border-zinc-600 hover:border-amber-400 text-white hover:text-amber-400 font-medium px-7 py-3 rounded-full transition-all bg-black/30 backdrop-blur-sm"
                >
                  View Menu
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-2 bg-amber-500 rounded-full" />
                <span className="w-2 h-2 bg-zinc-600 rounded-full" />
                <span className="w-2 h-2 bg-zinc-600 rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/80 bg-zinc-900 group">
                <Image
                  src="/images/hero.jpg"
                  alt="Authentic Ethiopian Food Feast"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-6 right-6 text-right select-none pointer-events-none">
                  <div className="font-script text-white text-2xl sm:text-3xl leading-snug drop-shadow-md -rotate-6">
                    Good Food <br />
                    Brings People <br />
                    Together
                    <span className="inline-block ml-1">
                      <svg className="w-5 h-5 inline-block text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-zinc-900 py-10 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V3m0 0a9.004 9.004 0 018.716 6.747M12 3a9.004 9.004 0 00-8.716 6.747" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 leading-snug">Fresh & Authentic</h2>
                <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                  Traditional recipes, fresh ingredients, real Ethiopian flavors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 leading-snug">Fast Delivery</h2>
                <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                  Your favorite dishes, delivered hot and fresh.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 leading-snug">Secure Payments</h2>
                <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                  Pay safely and easily with multiple options.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 leading-snug">Customer Care</h2>
                <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                  We are here to make your experience great.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f5] text-zinc-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-700 font-bold text-xs tracking-widest uppercase">
                  Popular Dishes
                </span>
                <span className="w-8 h-[2px] bg-amber-600 inline-block" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-serif-display">
                Our Signature Dishes
              </h2>
            </div>

            <Link
              href="/menu"
              className="text-amber-700 hover:text-amber-800 font-bold text-sm flex items-center gap-1 transition-colors"
            >
              <span>View All Menu</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-zinc-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                      {dish.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-zinc-900 mb-1 font-serif-display">
                    {dish.name}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {dish.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between mb-4">
                    <span className="text-[#0c433b] font-bold text-base">
                      ETB {dish.price}
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-zinc-800">{dish.rating}</span>
                      <span className="text-zinc-400">({dish.reviews})</span>
                    </div>
                  </div>

                  <AddToCartButton dish={dish} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-[#0f2e24] rounded-3xl overflow-hidden border border-emerald-900/40 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
              <div className="lg:col-span-7 text-left">
                <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">
                  Special Offers
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 mb-4 font-serif-display leading-tight">
                  Taste the Real Ethiopia
                </h2>
                <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                  Order now and enjoy authentic Ethiopian flavors from the comfort of
                  your home.
                </p>
                <Link
                  href="/menu"
                  className="bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 font-bold px-7 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Order Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-emerald-800/40">
                  <Image
                    src="/images/banner.jpg"
                    alt="Authentic Ethiopian Culinary Experience"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 text-right pointer-events-none">
                    <div className="font-script text-white text-xl sm:text-2xl drop-shadow-md leading-tight -rotate-3">
                      Authentic Food <br />
                      Authentic Experience
                      <span className="inline-block ml-1">
                        <svg className="w-4 h-4 inline-block text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#181310] border-t border-[#2a221c] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 3c0-1 1-1.5 2-1.5h4c1 0 2 .5 2 1.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  Craving Ethiopian Food?
                </h3>
                <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
                  Order now and enjoy a delicious meal, right at your doorstep.
                </p>
              </div>
            </div>

            <Link
              href="/menu"
              className="bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 font-bold px-7 py-2.5 rounded-full text-sm inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>Order Now</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}