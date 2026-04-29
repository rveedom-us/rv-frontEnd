"use client";
import { useRef } from "react";
import VisualCard from "./YourSelection-VisualCard";
import TripDetails from "./YourSelection-TripDetails";
import PriceBreakdown from "./YourSelection-PriceBreakdown";
import YourLocation from "./YourLocation";
import GuestRequirements from "./GuestRequirements";

export default function YourSelection() {
  // 1. Create Refs for the scroll targets
  const locationRef = useRef(null);
  const guestReqRef = useRef(null);

  // 2. Scroll Helper
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="yourselection"
      className="container mx-auto max-w-7xl px-4 sm:px-6 text-white mt-10 mb-20"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Your Selection
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Sample photos & profile shown; actual RV will match your chosen
          size/Tier and may vary.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start pt-5">
        <VisualCard />

        <div className="space-y-4">
          {/* 3. Wrap components and pass onComplete triggers */}
          <TripDetails onComplete={() => scrollToSection(locationRef)} />

          <div ref={locationRef} className="scroll-mt-24">
            <YourLocation onComplete={() => scrollToSection(guestReqRef)} />
          </div>

          <div ref={guestReqRef} className="scroll-mt-24">
            <GuestRequirements />
          </div>

          <PriceBreakdown />

          <div className="rounded-xl border border-slate-700 p-3 text-xs text-slate-400 bg-slate-900">
            <div className="font-semibold mb-1 text-slate-200">Notes</div>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                Pricing shown is Flex+ estimated; exact total may update with
                dates and availability.
              </li>
              <li>
                Upgrades may be offered when inventory allows at no extra cost.
              </li>
              <li>
                Damage deposit and insurance options are presented at checkout
                if applicable.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
