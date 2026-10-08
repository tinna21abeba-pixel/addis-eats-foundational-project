import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on Addis Eats.",
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#111111] text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-[#181615] border border-[#2b2724] rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 mx-auto flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-1 block">
          404 Error
        </span>
        <h1 className="text-3xl font-extrabold text-white font-serif-display mb-3">
          Page Not Found
        </h1>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          The page or dish you requested could not be located on Addis Eats.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/menu"
            className="px-6 py-3 bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 font-bold rounded-full text-sm transition shadow-md shadow-amber-500/20"
          >
            Explore Menu
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-full text-sm transition border border-zinc-700/60"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
