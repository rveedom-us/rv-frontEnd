import Card from "@/_ui/Card";
import { DollarSign, Info, ShieldCheck, Truck, Zap } from "lucide-react";

export default function Why() {
  return (
    <section
      id="why"
      className="border-b border-white/10 bg-slate-950/60 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Why Flex+
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            A smarter way to book the perfect RV
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-balance text-white/70">
            Flex+ turns the rental marketplace into your advantage—owners
            compete to win your trip, and you enjoy professional delivery, great
            value, and upgrade potential.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={<DollarSign className="h-5 w-5" />}
            title="Better value"
            text="Dynamic owner competition and streamlined ops unlock lower pricing without sacrificing quality."
          />
          <Card
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Flex+ Guarantee"
            text="Matched to same-type or higher. If not, we’ll make it right with options you’ll love."
          />
          <Card
            icon={<Truck className="h-5 w-5" />}
            title="Delivered & setup"
            text="White-glove delivery to your campsite, event, driveway or job site—ready when you arrive."
          />
          <Card
            icon={<Zap className="h-5 w-5" />}
            title="Instant confirmations"
            text="Most requests confirm within hours. Real humans oversee every detail 24/7."
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-linear-to-r from-cyan-500/10 to-blue-500/10 p-6 text-sm text-white/80">
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4 text-cyan-300" /> Flex+ works for
            vacations, events, tailgates, film/production, emergency housing and
            more. FEMA/insurance-supported stays welcome.
          </p>
        </div>
      </div>
    </section>
  );
}
