/* eslint-disable @next/next/no-img-element */
"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";

const PickSizeCard = ({
  label,
  length,
  sleeps,
  benefits,
  rig,
  img,
  isSelected,
  onClick,
}) => {
  // Auto-scroll to QualityLevel when this card is selected
  useEffect(() => {
    if (isSelected) {
      const qualitySection = document.getElementById("qualitylevel");
      if (qualitySection) {
        setTimeout(() => {
          qualitySection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [isSelected]);

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden border text-left bg-slate-900 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer ${
        isSelected ? "ring ring-cyan-400 border-cyan-400" : "border-transparent"
      }`}
    >
      <div className="relative">
        {img ? (
          <img
            src={img}
            alt={label}
            width={100}
            height={100}
            className="object-cover h-[150px] w-full brightness-50"
          />
        ) : (
          <div className="h-[150px] w-full bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
            {label}
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <h1 className="text-sm opacity-90 text-white font-bold">{label}</h1>
          <p className="text-xs opacity-80 text-white">
            {rig} . {length} . {sleeps}
          </p>
        </div>
      </div>

      <div className="p-4 text-white/80 space-y-1 text-sm">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <p>{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickSizeCard;
