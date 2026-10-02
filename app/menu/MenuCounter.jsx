"use client";

import { useState } from "react";

export default function MenuCounter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="bg-[#1c1917] p-4 rounded-xl border border-[#2d2824]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
        Sidebar State
      </h3>
      <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
        State is preserved across menu navigations.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCounter((c) => c + 1)}
          className="px-3 py-1.5 bg-[#e59e2a] hover:bg-[#d48e1d] text-zinc-950 rounded-lg text-xs font-bold transition shadow-sm"
        >
          Count: {counter}
        </button>
        <button
          onClick={() => setCounter(0)}
          className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
