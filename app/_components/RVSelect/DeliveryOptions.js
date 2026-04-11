"use client";

import { Truck, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryOption } from "@/_lib/store/cartSlice";

const DeliveryOptions = () => {
  const dispatch = useDispatch();
  const { deliveryOption, deliveryPrice } = useSelector((state) => state.cart);

  // USA Financial Formatter Helper
  const formatUSD = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val || 0);

  const handleDeliverySelect = (option, event) => {
    dispatch(setDeliveryOption(option));

    const details = event.target.closest("details");
    if (details) details.removeAttribute("open");
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-slate-400 mb-2">
        Delivery Option
      </label>

      {/* Delivery Options Dropdown */}
      <div className="relative w-full">
        <details className="group w-full">
          <summary className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg cursor-pointer list-none hover:bg-slate-700 flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" />
              <span>
                {deliveryOption === null
                  ? "Select delivery option"
                  : deliveryOption === "transport"
                    ? "I will transport"
                    : "Add Delivery, Setup & Pickup"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-400">
                {formatUSD(deliveryPrice)}
              </span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </summary>

          <ul className="absolute left-0 mt-1 w-full bg-slate-800 rounded-lg shadow-lg border border-slate-600 z-10 hidden group-open:block">
            <li>
              <button
                onClick={(e) => handleDeliverySelect("transport", e)}
                className="w-full text-left px-3 py-3 hover:bg-slate-700 flex justify-between items-center border-b border-slate-700 text-sm"
              >
                <span>I will transport</span>
                <span className="font-semibold text-emerald-400">$0</span>
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleDeliverySelect("delivery", e)}
                className="w-full text-left px-3 py-3 hover:bg-slate-700 flex justify-between items-center text-sm"
              >
                <span>Add Delivery, Setup & Pickup</span>
                <span className="font-semibold text-emerald-400">$250</span>
              </button>
            </li>
          </ul>
        </details>
      </div>

      {/* Option Details with Info Icon */}
      {deliveryOption !== null && (
        <div className="mt-3 bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="group/tooltip relative shrink-0">
              <Info className="w-4 h-4 text-cyan-400 cursor-help mt-0.5" />
              <div className="invisible group-hover/tooltip:visible opacity-0 group-hover/tooltip:opacity-100 transition-opacity absolute left-0 top-full w-64 bg-slate-950 text-slate-200 text-xs rounded-lg p-3 shadow-xl z-20 border border-slate-700 mt-1">
                {deliveryOption === "transport"
                  ? "It is required for driver to show proof of insurance for the added tow vehicle to their policy and present prior to pickup."
                  : "We will include delivery, full setup of the RV so it's ready for you upon arrival, and pickup at the end of your trip. Our minimum is $250 and prices are subject to change based on availability and destination."}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-300 font-medium">
                {deliveryOption === "transport"
                  ? "Self Transport"
                  : "Delivery Service Included"}
              </p>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                {formatUSD(deliveryPrice)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
