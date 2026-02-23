import VisualCard from "./YourSelection-VisualCard";
import TripDetails from "./YourSelection-TripDetails";
import PriceBreakdown from "./YourSelection-PriceBreakdown";

// const SIZES = [
//   {
//     key: "S",
//     label: "Small (S)",
//     length: "18–22 ft",
//     sleeps: "2–3",
//     ideal: "Weekend getaways, solo/duo trips",
//     rig: "Travel Trailer",
//     // hero/primary image for the card & live preview
//     // img: `${IMG_BASE}/sizes-S-small-hero.webp`,
//   },
//   {
//     key: "M",
//     label: "Medium (M)",
//     length: "23–26 ft",
//     sleeps: "3–4",
//     ideal: "Small families, compact comfort",
//     rig: "Travel Trailer",
//     // img: `${IMG_BASE}/sizes-M-medium-hero.webp`,
//   },
//   {
//     key: "L",
//     label: "Large (L)",
//     length: "27–30 ft",
//     sleeps: "4–6",
//     ideal: "Families & friends, extra space",
//     rig: "Travel Trailer",
//     // img: `${IMG_BASE}/sizes-L-large-hero.webp`,
//   },
//   {
//     key: "XL",
//     label: "Extra Large (XL)",
//     length: "31–34 ft",
//     sleeps: "6–8",
//     ideal: "Bigger groups, comfort features",
//     rig: "Travel Trailer / Fifth Wheel",
//     // img: `${IMG_BASE}/sizes-XL-extralarge-hero.webp`,
//   },
//   {
//     key: "XXL",
//     label: "Ultimate (XXL)",
//     length: "35–40+ ft",
//     sleeps: "8–10+",
//     ideal: "Long stays, premium amenities",
//     rig: "Fifth Wheel / Motorcoach",
//     // img: `${IMG_BASE}/sizes-XXL-ultimate-hero.webp`,
//   },
// ];

export default function YourSelection() {
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
          size/quality and may vary.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start pt-5">
        <VisualCard />
        <div className="space-y-4">
          <TripDetails />
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
