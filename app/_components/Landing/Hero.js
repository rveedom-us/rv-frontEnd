import { CheckCircle2, Clock, ShieldCheck, Star, Trophy } from "lucide-react";
import BookingEstimator from "./Hero-BookingEstimator";
import BookFlexButton from "@/_ui/BookFlexButton";
import Pill from "@/_ui/Pill";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(80%_50%_at_50%_-10%,rgba(34,211,238,.25),transparent_70%),linear-gradient(180deg,#0b1220_0%,#0a0f1a_100%)]">
      <div className="absolute -left-[25%] top-20 h-72 w-[50%] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -right-[25%] top-40 h-72 w-[50%] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-20">
        <div>
          <Pill icon={<Trophy className="h-4 w-4 text-cyan-300" />}>
            America’s Easiest RV Upgrade Program
          </Pill>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Book the <span className="text-cyan-300">Right RV</span> — and often
            get a{" "}
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Free Upgrade
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-white/75">
            Pick a size. Tell us your dates and location. Our Flex+ network
            races to accept your trip— giving you a same-type or higher RV at a
            competitive rate, with professional delivery & setup.
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-white/80">
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" /> Best-match
              pricing
            </li>
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />{" "}
              Upgrade-eligible
            </li>
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" /> White-glove
              delivery
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <BookFlexButton />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/60">
            <Pill icon={<ShieldCheck className="h-4 w-4 text-cyan-300" />}>
              Flex+ Guarantee
            </Pill>
            <Pill icon={<Clock className="h-4 w-4 text-cyan-300" />}>
              Instant confirmations
            </Pill>
            <Pill icon={<Star className="h-4 w-4 text-cyan-300" />}>
              Top-rated RVs
            </Pill>
          </div>
        </div>

        <BookingEstimator />
      </div>
    </section>
  );
}
