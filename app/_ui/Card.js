import { Star } from "lucide-react";

export default function Card({ title, text, review, userName }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-cyan-400/15 p-2 text-cyan-300 ring-1 ring-cyan-400/20">
          <Star />
        </div>
        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/70">{text}</p>
        </div>

        <div>
          {/* condition applies for empty review  */}
          {review ? (
            <p className="text-sm text-white/80">&quot;{review}&quot;</p>
          ) : null}
          <h1 className="mt-2 text-xs font-semibold text-white/60">
            {userName}
          </h1>
        </div>
      </div>
    </div>
  );
}
