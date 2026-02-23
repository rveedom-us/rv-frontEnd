/* eslint-disable @next/next/no-img-element */
"use client";

import { Check, GaugeCircle, Ruler, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { sizes } from "@/_lists/sizes";
import { tiers } from "@/_lists/tiers";
import { getPrice } from "@/_lib/getPrice";
import TierBadge from "@/_ui/TierBadge";
import QualityBadge from "@/_ui/QualityBadge";

export default function VisualCard() {
  const { selectedSize, selectedQuality, qualityScore, flexPrice } =
    useSelector((state) => state.cart);

  const size = sizes[selectedSize];
  const quality = tiers[selectedQuality];
  const { image } = getPrice(selectedSize, selectedQuality);

  return (
    <div className="rounded-3xl overflow-hidden border border-slate-700 bg-slate-900">
      <div className="aspect-video relative">
        <img
          src={image}
          alt="rvImage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-black/10" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-white drop-shadow">
            <div className="text-sm opacity-90">
              {size.label} • {size.length} • {size.sleeps}
            </div>
            <div className="text-xs opacity-80">Rig Type: {size.rig}</div>
            <div className="flex items-center gap-2 mt-1">
              <TierBadge tierKey={selectedQuality} />
              <QualityBadge quality={qualityScore} />
            </div>
          </div>
          <div className="text-white/90 text-right hidden md:block">
            <div className="text-xs">Est. nightly</div>
            <div className="text-2xl font-semibold tabular-nums">
              ${flexPrice}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border border-slate-700 p-3 bg-slate-900/60">
            <div className="text-slate-400 text-xs">Length</div>
            <div className="flex items-center gap-2 mt-1">
              <Ruler className="w-4 h-4 text-slate-400" /> {size.length}
            </div>
          </div>
          <div className="rounded-xl border border-slate-700 p-3 bg-slate-900/60">
            <div className="text-slate-400 text-xs">Sleeps</div>
            <div className="flex items-center gap-2 mt-1">
              <Users className="w-4 h-4 text-slate-400" /> {size.sleeps}
            </div>
          </div>
          <div className="rounded-xl border border-slate-700 p-3 bg-slate-900/60">
            <div className="text-slate-400 text-xs">Ideal For</div>
            <div className="flex items-center gap-2 mt-1">
              <GaugeCircle className="w-4 h-4 text-slate-400" />
              {size.sleeps} Travelers
            </div>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-700 p-4 bg-slate-900/60">
            <div className="text-xs text-slate-400">Level Amenities</div>
            <ul className="mt-2 text-sm space-y-1">
              {quality.benefits.map((a, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-700 p-4 bg-slate-900/60">
            <div className="text-xs text-slate-400">Size Profile</div>
            <ul className="mt-2 text-sm space-y-1">
              {size.benefits.map((p, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
