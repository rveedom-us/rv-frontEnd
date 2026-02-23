"use client";

import TierBadge from "@/_ui/TierBadge";
import { tiers } from "@/_lists/tiers";
import { sizes } from "@/_lists/sizes";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuality, setSelectedSize } from "@/_lib/store/cartSlice";
import { getPrice } from "@/_lib/getPrice";

export default function FullMatrix() {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state) => state.cart.selectedSize);
  const selectedQuality = useSelector((state) => state.cart.selectedQuality);
  const cleaningPrepFee = useSelector((state) => state.cart.cleaningPrepFee);
  const tax = useSelector((state) => state.cart.tax);

  const handleSelect = (sKey, tKey) => {
    dispatch(setSelectedQuality(tKey));
    dispatch(setSelectedSize(sKey));
  };

  return (
    <section
      id="fullmatrix"
      className="container mx-auto max-w-7xl sm:px-6 text-white space-y-5 my-10"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Compare the full Matrix
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Click any combo to update your selection
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-slate-300">
              <th className="text-left p-3">Size</th>
              {Object.entries(tiers).map(([tKey]) => (
                <th key={tKey} className="text-left p-3">
                  <div className="flex items-center gap-2">
                    <TierBadge tierKey={tKey} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.entries(sizes).map(([sKey, s]) => (
              <tr key={sKey} className="border-t border-slate-700">
                <td className="p-3">
                  <div className="font-medium">{s.label}</div>
                  <div className="text-xs text-slate-400">
                    {s.length} • Sleeps {s.sleeps} • {s.rig}
                  </div>
                </td>

                {Object.entries(tiers).map(([tKey]) => {
                  const isActive =
                    selectedSize === sKey && selectedQuality === tKey;
                  const { flexPrice, marketPrice } = getPrice(sKey, tKey);

                  return (
                    <td key={tKey} className="px-1 py-2 align-top text-center">
                      <button
                        onClick={() => handleSelect(sKey, tKey)}
                        className={`text-left rounded-xl border px-3 py-2 transition w-[110px] md:w-full
                              ${
                                isActive
                                  ? "border-cyan-400 ring-2 ring-cyan-300 bg-slate-900"
                                  : "border-slate-700 hover:bg-slate-800"
                              }`}
                      >
                        <div className="font-medium tabular-nums">
                          ${flexPrice} / night
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Cleaning & Prep Fee: ${cleaningPrepFee} • Tax: {tax}%
                        </div>

                        <div className="mt-1 text-[11px] text-emerald-300">
                          Save ${marketPrice - flexPrice}/night with Flex+
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
