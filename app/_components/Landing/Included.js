import Pill from "@/_ui/Pill";
import { CheckCircle2 } from "lucide-react";

export default function Included() {
  return (
    <section
      id="included"
      className="border-b border-white/10 bg-slate-950/60 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Included
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Every Flex+ stay includes premium essentials
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Full delivery & setup
          </Pill> */}
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            High-grade cleaning
          </Pill>
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Fresh linens & towels
          </Pill>
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Stocked bathroom & kitchen
          </Pill>
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Climate control
          </Pill>
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            24/7 trip support
          </Pill>
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Power & water hookups
          </Pill>
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Pet-friendly options
          </Pill>{" "}
          <Pill
            size="lg"
            icon={<CheckCircle2 className="text-cyan-400 h-5 w-5" />}
          >
            Delivery & setup add-on
          </Pill>
        </div>
      </div>
    </section>
  );
}
