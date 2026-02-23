/* eslint-disable @next/next/no-img-element */
"use client";

import { setSelectedQuality, setSelectedSize } from "@/_lib/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Ruler, Users } from "lucide-react";
import { getPrice } from "@/_lib/getPrice";
import { tiers } from "@/_lists/tiers";
import { sizes } from "@/_lists/sizes";
import TierBadge from "@/_ui/TierBadge";

export default function ListView() {
  const dispatch = useDispatch();
  const { selectedSize, selectedQuality, cleaningPrepFee, tax } = useSelector(
    (state) => state.cart,
  );

  const handleSelect = (sKey, tKey) => {
    dispatch(setSelectedQuality(tKey));
    dispatch(setSelectedSize(sKey));
  };

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 mt-10 space-y-5 mb-10 text-white">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Compare the full List View
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Click any card to update your selection
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(sizes).map(([sKey, s]) => (
          <div key={sKey} className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-200">
              {s.label} | {s.rig}
            </h3>

            {Object.entries(tiers).map(([tKey, t]) => {
              const isActive =
                selectedSize === sKey && selectedQuality === tKey;

              const { flexPrice, marketPrice, image } = getPrice(sKey, tKey);

              return (
                <div
                  key={`${sKey}-${tKey}`}
                  onClick={() => handleSelect(sKey, tKey)}
                  className={[
                    "group cursor-pointer transition rounded-2xl border p-4",
                    "flex flex-col sm:flex-row gap-4",
                    isActive
                      ? "border-cyan-400 ring-2 ring-cyan-300 bg-slate-900/80"
                      : "border-slate-700 bg-slate-900 hover:bg-slate-800",
                  ].join(" ")}
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-56 relative rounded-xl overflow-hidden shrink-0">
                    <img
                      src={image}
                      alt={s.label}
                      className="w-full h-44 sm:h-36 object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/50">
                        Quality Score {t.qualityScore}
                      </span>

                      <TierBadge tierKey={tKey} />

                      <span className="text-xs text-slate-400">{s.rig}</span>
                    </div>

                    <h4 className="mt-1 font-semibold text-base sm:truncate">
                      {t.label} • {s.label}
                    </h4>

                    <div className="text-xs text-slate-400">
                      {s.length} • Sleeps {s.sleeps}
                    </div>

                    <ul className="mt-3 text-sm grid gap-2 sm:grid-cols-2">
                      <li className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-slate-300">Size:</span>{" "}
                        <span className="text-slate-200">{s.length}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-slate-300">Sleeps:</span>{" "}
                        <span className="text-slate-200">{s.sleeps}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Price Section */}
                  <div className="w-full sm:w-40 sm:text-right flex flex-col justify-between gap-3 sm:gap-0">
                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-400">from</div>

                      <div className="text-xl font-semibold tabular-nums leading-tight">
                        ${flexPrice}
                        <span className="text-xs font-normal">/night</span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        Cleaning & Prep Fee: ${cleaningPrepFee} • Tax: {tax}%
                      </div>

                      <div className="text-[11px] text-emerald-400">
                        Save ${marketPrice - flexPrice}/night
                      </div>
                    </div>

                    <button className="w-full sm:w-auto text-xs font-medium px-3 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
