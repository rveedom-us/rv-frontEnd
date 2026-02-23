//   notes

import Card from "@/_ui/Card";

// container will contain max-w-7xl px-4 sm:px-6 pt-10
const HappyGuests = () => {
  // NOTE test json data
  const happyGuestsCardData = [
    {
      id: 1,
      review:
        "Picked 'Large' for our Derby weekend and got a spotless XL with bunk room. Setup was flawless and support answered at 11pm when we had a power question.",
      userName: "Danielle R.",
    },
    {
      id: 2,
      review:
        "Corporate tailgate. Flex+ found a perfect match in 2 hours. Price was under what we budgeted and the team handled every detail.",
      userName: "Michael S.",
    },
    {
      id: 3,
      review:
        "Insurance rental during home repairs. Delivery every month, extensions were easy. Truly grateful for the comfort and service.",
      userName: "The Nguyen Family",
    },
  ];

  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto  max-w-7xl px-4 sm:px-6">
        {/* text */}
        <div className="text-center">
          <h1 className="text-center  text-[#27DBFD] uppercase font-semibold text-xs">
            Happy guests
          </h1>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
            Real trips. Real upgrades.
          </h1>
        </div>
        {/* card */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {happyGuestsCardData.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyGuests;
