import BookFlexButton from "@/_ui/BookFlexButton";
import PricingCard from "@/_ui/PricingCard";
import { CircleCheck } from "lucide-react";
import { Info } from "lucide-react";

const Pricing = () => {
  // NOTE test json data
  const cardData = [
    {
      id: 1,
      title: "Flex+ Booking",
      list_items: [
        {
          icon: <CircleCheck className="w-5 h-5 text-green-500" />,
          text: "Up to 30% lower total trip cost",
        },
        {
          icon: <CircleCheck className="w-5 h-5 text-green-500" />,
          text: "Premium RVs & hosts",
        },
        {
          icon: <CircleCheck className="w-5 h-5 text-green-500" />,
          text: "24/7 Concierge support",
        },
        {
          icon: <CircleCheck className="w-5 h-5 text-green-500" />,
          text: "Complimentary upgrade potential",
        },
      ],
      action: <BookFlexButton />,
      badge: "Recommended",
    },
    {
      id: 2,
      title: "Typical Marketplace",
      list_items: [
        {
          icon: <Info className="w-5 h-5 text-white/40" />,
          text: "Prices vary; upgrades uncommon",
        },
        {
          icon: <Info className="w-5 h-5 text-white/40" />,
          text: "Mixed owner quality & response times",
        },
        {
          icon: <Info className="w-5 h-5 text-white/40" />,
          text: "Delivery fees & setup vary",
        },
        {
          icon: <Info className="w-5 h-5 text-white/40" />,
          text: "Limited support if things change",
        },
      ],
    },
  ];

  //   notes
  // container will contain max-w-7xl px-4 sm:px-6 pt-10

  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 ">
        {/* pricing */}
        <div>
          <h1 className="text-center  text-[#27DBFD] uppercase font-semibold text-xs">
            Pricing
          </h1>
          <p className="text-center text-4xl text-white font-bold mt-2">
            Flex+ vs. standard marketplace
          </p>
          <p className="text-base text-white/70 text-center mt-2">
            Our model lowers total trip cost while lifting quality and support.
          </p>
        </div>

        {/* REVIEW  card */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card) => (
            <PricingCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
