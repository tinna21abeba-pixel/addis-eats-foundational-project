import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-3xl font-extrabold text-white mb-2 font-serif-display">
        Dish Not Found
      </h2>
      <p className="text-zinc-400 text-sm mb-6 max-w-sm">
        The dish you are looking for is not currently on our menu.
      </p>
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 bg-[#e59e2a] hover:bg-[#d48e1d] transition px-7 py-3 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20"
      >
        <span>Back to Menu</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}