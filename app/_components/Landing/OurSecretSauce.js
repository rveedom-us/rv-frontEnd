import { Sparkles } from "lucide-react";

//   notes
// container will contain max-w-7xl px-4 sm:px-6 pt-10

const OurSecretSauce = () => {
  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* text */}
        <div className="text-center">
          <h1 className=" mt-5 text-[#27DBFD] uppercase font-semibold text-xs">
            Our Secret Sauce
          </h1>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
            AI-powered booking magic
          </h1>

          <p className="mx-auto max-w-3xl text-balance text-white/70 mt-2">
            We do the hard work connecting you with the ultimate <br /> RV at
            the best value—so you don’t waste time or money.
          </p>
        </div>

        {/* card */}
        <div className="flex justify-center mt-10">
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur md:w-[70%]">
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="h-10 w-10  text-cyan-300 block mx-auto " />

              <div className="px-2">
                <p className="text-pretty text-white/80 text-center">
                  Why spend hours on marketplaces with extra fees and
                  hit-or-miss quality? Flex+ activates our internal booking
                  engine—combining AI matching with a curated pro-owner
                  network—to lock in your setup at unbeatable value.
                </p>
                <p className="text-pretty text-white/80 text-center mt-3">
                  You get{" "}
                  <strong data-ninja-font="arial_bold_normal_qxjpy">
                    instant confirmation
                  </strong>
                  , transparent pricing, and support that goes the extra mile.
                  We aim for the{" "}
                  <strong data-ninja-font="arial_bold_normal_qxjpy">
                    best deal, guaranteed
                  </strong>
                  , and often surprise guests with upgrades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSecretSauce;
