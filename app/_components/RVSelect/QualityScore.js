"use client";

import { useSelector } from "react-redux";
import QualityScoreCard from "@/_ui/QualityScoreCard";
import QualityBadge from "@/_ui/QualityBadge";
import QualityBar from "@/_ui/QualityBar";

const QualityScore = () => {
  const qualityScore = useSelector((state) => state.cart.qualityScore);
  const qualityScoreCardData = [
    {
      title: "Build & Model",
      weight: "30%",
      desc: "Manufacturer quality and model line reputation.",
    },
    {
      title: "Features",
      weight: "25%",
      desc: "Amenities, technology, and trim level.",
    },
    {
      id: 3,
      title: "Age & Condition",
      weight: "15%",
      desc: "Newer model years scored higher.",
    },
    {
      id: 4,
      title: "Host QA",
      weight: "15%",
      desc: "Owner checklist + RVEEDOM spot‑checks.",
    },
    {
      id: 5,
      title: "Guest Reviews",
      weight: "15%",
      desc: "Recent ratings weighted more heavily.",
    },
  ];

  return (
    <section className="bg-slate-950/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 ">
        <div className="rounded-2xl border border-slate-700 p-4 bg-slate-900">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-white text-[16px]">
              Quality Score
            </h1>
            <QualityBadge quality={qualityScore} />
          </div>

          <QualityBar qualityScore={qualityScore} />

          <p className="mt-2 text-xs text-slate-400">
            Higher score indicates a newer, more feature‑rich model with strong
            guest reviews and confirmed quality.
          </p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 ">
            {qualityScoreCardData.map((card, index) => (
              <QualityScoreCard key={index} {...card} />
            ))}
          </div>

          <p className="text-[12px] text-slate-500 mt-3">
            Scores are calculated by RVEEDOM’s algorithm and may update with
            inventory, verification, and new reviews.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QualityScore;
