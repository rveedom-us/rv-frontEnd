import Card from "@/_ui/Card";
import FlexPlusPartnerButton from "@/_ui/FlexPlusPartnerButton";
import { Trophy } from "lucide-react";

const ForOwners = () => {
  // NOTE test json data
  const forOwnerCardData = [
    {
      id: 1,
      icon: <Trophy />,
      title: "Priority job alerts",
      text: "Join a curated network where great service is rewarded with more volume.",
    },
    {
      id: 2,
      icon: <Trophy />,
      title: "Fast payouts",
      text: "Join a curated network where great service is rewarded with more volume.",
    },
    {
      id: 3,
      icon: <Trophy />,
      title: "Performance bonuses",
      text: "Join a curated network where great service is rewarded with more volume.",
    },
  ];
  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto  max-w-7xl px-4 sm:px-6">
        {/* text */}
        <div>
          <h1 className="text-center  text-[#27DBFD] uppercase font-semibold text-xs">
            For owners
          </h1>
          <p className="text-center text-4xl text-white font-bold mt-2">
            Earn more with Flex+
          </p>
          <p className="text-base text-white/70 text-center mt-2">
            Get premium, pre-qualified bookings delivered to you. Keep your
            calendar full and your guests thrilled.
          </p>
        </div>

        {/* card */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {forOwnerCardData.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>

        {/* flex+ partner */}
        <div className="mt-7 flex justify-center">
          <FlexPlusPartnerButton />
        </div>
      </div>
    </section>
  );
};

export default ForOwners;
