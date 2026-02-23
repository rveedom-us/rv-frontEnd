import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BookFlexButton({ color = "default" }) {
  const baseClasses =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition active:translate-y-px";

  const colorClasses =
    color === "white"
      ? "bg-white text-slate-900 hover:bg-white/90"
      : "bg-cyan-400 text-slate-900 hover:bg-cyan-300 ";

  return (
    <Link
      href="/rvSelector"
      className={`${baseClasses} ${colorClasses} cursor-pointer`}
    >
      <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
      <span>Book Flex+</span>
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}
