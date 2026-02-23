import { statuses, defaultStatus } from "@/_lists/status.js";

export default function StatusBadge({ status }) {
  const stat = status.toUpperCase();
  const meta = statuses[stat] || defaultStatus;

  return (
    <span className="relative group inline-block">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium bg-linear-to-br ${meta.className} border border-white/5`}
      >
        {stat}
      </span>

      <span
        className="
          absolute left-7 -translate-x-1/2 bottom-[130%] whitespace-nowrap px-2 py-1 rounded-md text-xs bg-slate-950/80 text-white
          opacity-0 scale-70 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none"
      >
        {meta.description}
      </span>
    </span>
  );
}
