"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import RVSelectNav from "@/_ui/RvSelectNav";
import FullMatrix from "@/_components/RVSelect/FullMatrix";
import PickSize from "@/_components/RVSelect/PickSize";
import QualityLevel from "@/_components/RVSelect/QualityLevel";
import QualityScore from "@/_components/RVSelect/QualityScore";
import YourSelection from "@/_components/RVSelect/YourSelection";
import ListViewCard from "@/_components/RVSelect/ListView";

export default function Page() {
  const { selectedSize, selectedQuality } = useSelector((state) => state.cart);
  const isSelected = selectedSize && selectedQuality;
  const [view, setView] = useState("basic");

  return (
    <section className="bg-[#020618] min-h-screen overflow-hidden pb-28">
      <div className="pt-10  container mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-8">
        <div className="flex items-center justify-between sm:flex-row flex-col sm:gap-0 gap-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-10 w-10 text-cyan-300" />
            <h1 className="text-xl md:text-4xl font-bold tracking-tight flex items-center gap-3 text-white">
              Choose Your RV — Size &amp; Quality
            </h1>
          </div>

          <RVSelectNav handleProjectShow={setView} activeView={view} />
        </div>

        <div className="transition-all duration-500 ease-in-out">
          {view === "basic" && (
            <div className="animate-fadeIn space-y-6">
              <PickSize />
              <QualityLevel />
            </div>
          )}

          {view === "matrix" && (
            <div className="animate-popIn">
              <FullMatrix />
            </div>
          )}

          {view === "list" && (
            <div className="animate-fadeIn text-white text-lg p-6">
              <ListViewCard />
            </div>
          )}
        </div>

        {isSelected && (
          <>
            <QualityScore />
            <YourSelection />
          </>
        )}
      </div>
    </section>
  );
}
