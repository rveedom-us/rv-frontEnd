"use client";

import { tripLengthCalc } from "@/_lib/tripLengthCalc";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "@/_lib/store/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import TierBadge from "../../_ui/TierBadge";
import Confirmation from "./Confirmation";
import SignInWithGoogle from "../Auth/SigninWithGoogleButton";

export default function FooterCart({ session }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    selectedSize,
    selectedQuality,
    totalPrice,
    saving,
    savingPercentage,
    quantity,
    startDate,
    endDate,
  } = useSelector((state) => state.cart);
  const isSelected =
    selectedSize && selectedQuality && tripLengthCalc(startDate, endDate) > 3;

  const tripDays = tripLengthCalc(startDate, endDate) || 0;
  const discountPct = tripDays >= 30 ? 35 : tripDays >= 7 ? 15 : 0;
  const discountLabel =
    discountPct === 35
      ? "Monthly discount"
      : discountPct === 15
        ? "Weekly discount"
        : "";

  const handleIncrease = () => {
    dispatch(setQuantity(quantity + 1));
  };

  const handleDecrease = () => {
    dispatch(setQuantity(Math.max(1, quantity - 1)));
  };
  return (
    <section
      id="footercart"
      className="fixed bottom-0 inset-x-0 z-40 backdrop-blur bg-slate-900/90 border-t border-slate-700"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">Selected</div>
          <div className="text-base md:text-lg font-semibold flex flex-wrap items-center gap-2">
            <span className="text-slate-200 text-base md:text-xl font-semibold">
              {selectedSize || "None"}
            </span>
            <TierBadge tierKey={selectedQuality} />
            <span className="hidden md:inline text-emerald-300 font-medium">
              Save ${saving} ({savingPercentage}%)
              {discountPct > 0 && (
                <span className="ml-2 text-slate-300 font-medium">
                  • {discountLabel} {discountPct}%
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 border rounded-lg px-2 py-1 bg-slate-800 border-slate-700">
            {/* <span className="text-[11px] text-slate-400 mr-1"></span> */}
            <button
              aria-label="Decrease"
              onClick={handleDecrease}
              className="p-1 rounded hover:bg-slate-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="w-8 text-center tabular-nums text-sm">
              {quantity}
            </div>
            <button
              aria-label="Increase"
              onClick={handleIncrease}
              className="p-1 rounded hover:bg-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">
              Est. Total (x{quantity})
            </div>
            <div className="text-xl font-bold text-white tabular-nums">
              ${Math.round(totalPrice)}
            </div>
          </div>
          {isSelected &&
            (session ? (
              <span
                onClick={() => setOpen(true)}
                className="rounded-xl px-6 py-3 font-semibold text-white bg-linear-to-r from-cyan-500 to-fuchsia-600 shadow-lg hover:cursor-pointer"
              >
                Continue
              </span>
            ) : (
              <div className="flex flex-col">
                <SignInWithGoogle />
              </div>
            ))}
        </div>
      </div>
      {open && (
        <Confirmation
          open={open}
          onClose={() => setOpen(false)}
          session={session}
        />
      )}
    </section>
  );
}
