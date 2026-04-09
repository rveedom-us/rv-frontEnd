"use client";

import {
  Percent,
  Calculator,
  Shield,
  Sparkles,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


export default function PriceBreakdown() {
  const dispatch = useDispatch();

  // Added 'guests' to the destructured state from Redux
  const {
    saving,
    savingPercentage,
    cleaningPrepFee,
    tax,
    taxAmount,
    totalDate,
    totalPrice,
    flexPrice,
    quantity,
    deliveryPrice,
    guests, //
  } = useSelector((state) => state.cart);

  // USA Financial Formatter Helper
  const formatUSD = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val || 0);

  const rows = [
    {
      label: `Nightly x ${formatUSD(flexPrice)}`,
      value: flexPrice * totalDate,
      Icon: Star,
    },
    { label: "Cleaning & Prep", value: cleaningPrepFee, Icon: Shield },
    { label: `Tax (${tax}%)`, value: taxAmount, Icon: Percent },
    // This now works because 'guests' is defined above
    { label: `Pet Fee`, value: guests?.petFee || 0, Icon: Users },
    { label: `Delivery`, value: deliveryPrice, Icon: Truck },
    { label: `Quantity`, value: quantity, Icon: Calculator },
  ];

  return (
    <div className="rounded-2xl border border-slate-700 p-4 bg-slate-900 text-slate-100">
      <h3 className="font-semibold mb-3">Price Breakdown</h3>

      <div className="mb-3 rounded-lg bg-emerald-900/40 text-emerald-300 p-3 text-xs flex items-center justify-between border border-emerald-700/40">
        <span>Flex+ savings vs. typical market</span>
        <span className="font-semibold">
          {formatUSD(saving)} ({savingPercentage}% off)
        </span>
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <r.Icon className="w-4 h-4 text-slate-400" /> {r.label}
            </div>
            <div className="tabular-nums">
              {r.label === "Quantity"
                ? `x${Math.round(r.value)}`
                : formatUSD(r.value)}
            </div>
          </div>
        ))}

        <div className="border-t border-slate-700 my-2" />
        <div className="flex items-center justify-between font-semibold text-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> Estimated Total
          </div>
          <div className="tabular-nums">{formatUSD(totalPrice)}</div>
        </div>

        <p className="text-xs text-slate-400">
          Displayed pricing is an estimate within the RVEEDOM Flex+ program.
          Final quote may vary based on exact dates, availability, and location
          specifics.
        </p>
      </div>
    </div>
  );
}
