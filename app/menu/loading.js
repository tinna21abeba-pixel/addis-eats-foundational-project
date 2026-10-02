export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
      <p className="text-zinc-400 text-sm font-medium">Loading Addis Eats menu...</p>
    </div>
  );
}