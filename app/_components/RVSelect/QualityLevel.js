"use client";

import { tiers } from "@/_lists/tiers";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuality } from "@/_lib/store/cartSlice";
import { useEffect } from "react";
import QualityLevelCard from "@/_ui/QualityLevelCard";

const QualityLevel = () => {
  const qualityLevelCardData = Object.entries(tiers).map(([key, value]) => ({
    plan: key,
    slogan: value.note,
    backgroundColor: `bg-gradient-to-br ${value.color} opacity-25`,
    ...value,
  }));

  const dispatch = useDispatch();
  const selectedQuality = useSelector((state) => state.cart.selectedQuality);

  const handleSelect = (key) => {
    dispatch(setSelectedQuality(key));
  };

  // Auto-scroll to "Your Selection" when quality is selected
  useEffect(() => {
    if (selectedQuality) {
      const yourSelectionSection = document.getElementById("yourselection");
      if (yourSelectionSection) {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          yourSelectionSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [selectedQuality]);

  return (
    <section className="bg-slate-950/60 pt-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 ">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Pick a Quality Level
          </h1>
          <p className="text-sm text-slate-400 mt-1 ">
            Basic (1 diamond), Standard (2 diamond), Premium (3 diamond). See
            how we score quality below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5">
          {qualityLevelCardData.map((card) => (
            <QualityLevelCard
              key={card.plan}
              {...card}
              isSelected={selectedQuality === card.plan}
              onClick={() => handleSelect(card.plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityLevel;
