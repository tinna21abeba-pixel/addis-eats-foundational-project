import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dishes from "../../data/dishes";
import AddToCartButton from "../AddToCartButton";

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => d.id.toString() === id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested Ethiopian dish could not be found.",
    };
  }

  return {
    title: `${dish.name} - Traditional Ethiopian Dish`,
    description: dish.description,
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      images: [
        {
          url: dish.image,
          width: 800,
          height: 600,
          alt: dish.name,
        },
      ],
    },
  };
}

export default async function DishDetails({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => d.id.toString() === id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: `https://addiseats.com${dish.image}`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: dish.rating || 4.8,
      reviewCount: dish.reviews || 80,
    },
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Menu</span>
      </Link>

      <div className="bg-[#181615] rounded-3xl shadow-2xl overflow-hidden border border-[#2b2724] grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-6 relative min-h-[300px] md:min-h-[420px] bg-zinc-900">
          <Image
            src={dish.image || "/images/banner.jpg"}
            alt={dish.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {dish.badge && (
            <span className="absolute top-4 left-4 bg-amber-500 text-zinc-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
              {dish.badge}
            </span>
          )}
        </div>

        <div className="md:col-span-6 p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#24201d] text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
                {dish.category}
              </span>
              <div className="flex items-center gap-1.5 text-sm text-amber-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-zinc-200">{dish.rating || "4.8"}</span>
                <span className="text-zinc-500 text-xs">({dish.reviews || 80} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 font-serif-display">
              {dish.name}
            </h1>

            <p className="text-zinc-300 leading-relaxed text-sm lg:text-base mb-6">
              {dish.description}
            </p>

            <div className="py-4 border-y border-[#292522] mb-8 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-500">
                ETB {dish.price}
              </span>
              <span className="text-xs text-zinc-400">including tax and fresh injera</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <AddToCartButton dish={dish} />
            </div>

            <Link
              href="/cart"
              className="text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-2.5 rounded-lg font-medium text-sm transition border border-zinc-700 flex items-center justify-center gap-2"
            >
              <span>View Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}