"use client";
import { BedDouble, Truck, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSize, setSelectedQuality } from "@/_lib/store/cartSlice";
import { sizes } from "@/_lists/sizes";
import QualityBadge from "@/_ui/QualityBadge";
import QualityBar from "@/_ui/QualityBar";
import TripDetails from "../RVSelect/YourSelection-TripDetails";

export default function BookingEstimator() {
  const dispatch = useDispatch();
  const {
    selectedSize,
    selectedQuality,
    savingPercentage,
    totalPrice,
    qualityScore,
    downPayment,
  } = useSelector((state) => state.cart);

  const handleSizeChange = (key) => {
    dispatch(setSelectedSize(key));
  };

  const handleQualityChange = (quality) => {
    dispatch(setSelectedQuality(quality));
  };

  const getQualityWidth = (scoreRange) => {
    if (!scoreRange) return 0;
    const [min, max] = scoreRange.split("-").map(Number);
    return (min + max) / 2;
  };

  return (
    <div className="sm:w-2xl rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur relative">
      {/* Badge */}
      <div className="absolute -right-6 -top-6 rotate-12 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-900 shadow">
        Save {savingPercentage}% avg
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="rounded-md bg-cyan-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-300 ring-1 ring-cyan-400/20">
            Instant Estimate
          </span>
          <h3 className="mt-1 text-lg font-bold text-white">
            Your Flex+ Trip Preview
          </h3>
          <p className="text-sm text-white/70">
            Adjust options to see your estimated Flex+ cost.
          </p>
        </div>
        <Truck className="hidden h-10 w-10 text-cyan-300 sm:block" />
      </div>

      {/* Size Selector */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.keys(sizes).map((key) => {
          const s = sizes[key];
          return (
            <button
              key={key}
              onClick={() => handleSizeChange(key)}
              className={`group relative overflow-hidden rounded-xl border px-2 py-3 text-left transition ${
                selectedSize === key
                  ? "border-cyan-400/60 bg-cyan-400/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
              style={{
                backgroundImage:
                  selectedSize === key ? `url(${s.img})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`relative z-10 ${
                  selectedSize === key ? "backdrop-brightness-90" : ""
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  {s.label}
                </p>
                <div className="mt-1 flex flex-nowrap gap-2 items-center text-xs text-white/80 whitespace-nowrap">
                  <Users className="h-3.5 w-3.5" /> {s.sleeps}
                  <span className="opacity-50">•</span>
                  <BedDouble className="h-3.5 w-3.5" /> {s.length}
                </div>
                <p className="mt-1 text-[11px] text-white/60">{s.rig}</p>
              </div>
              {selectedSize === key && (
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/65 to-slate-900/0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quality Selector */}
      <div className="mt-4 mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 col-span-3">
          <label className="flex items-center justify-between text-xs text-white/70">
            Quality
            <span className="text-white">
              <QualityBadge quality={qualityScore} />
            </span>
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            {["Basic", "Standard", "Premium"].map((s) => (
              <button
                key={s}
                onClick={() => handleQualityChange(s)}
                className={`rounded-lg px-2 py-1 font-semibold ${
                  selectedQuality === s
                    ? "bg-cyan-400 text-slate-900"
                    : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <QualityBar qualityScore={qualityScore} />
        </div>
      </div>
      <div className="text-white">
        <TripDetails />
      </div>

      {/* Price Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5">
          <p className="text-xs text-white/70">Flex+ Estimate</p>
          <p className="text-2xl font-extrabold text-cyan-300">
            ${totalPrice.toFixed(2)}
          </p>
          <p className="text-xs text-white/50">
            Includes taxes, prep fee & options
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5">
          <p className="text-xs text-white/70">Savings</p>
          <p className="text-2xl font-extrabold text-emerald-300">
            {savingPercentage}%
          </p>
          <p className="text-xs text-white/50">
            Compared to typical market price
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5">
          <p className="text-xs text-white/70">Only 5% Down</p>
          <p className="text-2xl font-extrabold text-white">${downPayment} </p>
          <p className="text-xs text-white/50">to lock in your RV</p>
        </div>
      </div>
    </div>
  );
}
