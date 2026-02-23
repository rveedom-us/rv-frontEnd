import { tiers } from "@/_lists/tiers";
import VisualStyleByLevelCard from "@/_ui/VisualStyleByLevelCard";

const VisualStyleByLevel = () => {
  const qualityLevelCardData = Object.entries(tiers).map(([key, value]) => ({
    plan: key,
    backgroundColor: `bg-gradient-to-br ${value.color} opacity-25`,
    ...value,
  }));

  //   notes
  // container will contain max-w-7xl px-4 sm:px-6 pt-10
  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 ">
        {/* VisualStyleByLevel */}

        <div>
          <div>
            <h1 className="text-center  text-[#27DBFD] uppercase font-semibold text-xs">
              Visual Style by Level
            </h1>
            <p className="text-center text-4xl text-white font-bold mt-2">
              Here’s the vibe you can expect. Actual units vary by availability.
            </p>
          </div>

          {/* card */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {qualityLevelCardData.map((card) => (
              <VisualStyleByLevelCard key={card.label} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualStyleByLevel;
