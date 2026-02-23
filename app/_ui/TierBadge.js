// /components/TierBadge.jsx
import { tiers } from "@/_lists/tiers";
import { Gem } from "lucide-react";

function Diamonds({ count }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Gem key={i} className="w-4 h-4 text-cyan-400" />
      ))}
    </div>
  );
}

export default function TierBadge({ tierKey }) {
  const tier = tiers[tierKey] || tiers.Basic;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${tier.tag}`}
      title={tier.note}
    >
      <Diamonds count={tier.diamonds} />
      <span className="font-medium">{tier.label}</span>
    </span>
  );
}
