import { Phone } from "lucide-react";
import Link from "next/link";

export default function CallButton() {
  return (
    <Link
      href="tel:859-379-9977"
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition-all duration-300"
    >
      <Phone className="h-4 w-4" /> 24/7 Help
    </Link>
  );
}
