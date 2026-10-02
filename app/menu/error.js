"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-4">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2 font-serif-display">
        Something went wrong
      </h2>
      <p className="text-zinc-400 mb-6 text-sm max-w-sm">
        {error?.message || "Failed to load the menu content."}
      </p>
      <button
        onClick={() => reset()}
        className="px-7 py-3 bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 font-bold rounded-full text-sm transition shadow-md shadow-amber-500/20"
      >
        Try again
      </button>
    </div>
  );
}