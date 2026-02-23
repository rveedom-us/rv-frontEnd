/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

const rv = {
  Small: {
    label: "Small",
    people: "2 – 4",
    beds: 2,
    length: "18–22 ft",
    baseNightly: 115,
    hero: "linear-gradient(180deg, rgba(56,189,248,0.25), rgba(56,189,248,0.08)), url('https://images.unsplash.com/photo-1517999349371-c43520457b23?q=80&w=1600&auto=format&fit=crop')",
  },
  Medium: {
    label: "Medium",
    people: "4 – 6",
    beds: 3,
    length: "22–26 ft",
    baseNightly: 145,
    hero: "linear-gradient(180deg, rgba(56,189,248,0.25), rgba(56,189,248,0.08)), url('https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1600&auto=format&fit=crop')",
  },
  Large: {
    label: "Large",
    people: "6 – 8",
    beds: 4,
    length: "26–30 ft",
    baseNightly: 175,
    hero: "linear-gradient(180deg, rgba(56,189,248,0.25), rgba(56,189,248,0.08)), url('https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=1600&auto=format&fit=crop')",
  },
  XL: {
    label: "XL",
    people: "8 – 10",
    beds: 5,
    length: "30–34 ft",
    baseNightly: 205,
    hero: "linear-gradient(180deg, rgba(56,189,248,0.25), rgba(56,189,248,0.08)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')",
  },
  XXL: {
    label: "XXL",
    people: "10 – 12",
    beds: 6,
    length: "34–38 ft",
    baseNightly: 235,
    hero: "linear-gradient(180deg, rgba(56,189,248,0.25), rgba(56,189,248,0.08)), url('https://images.unsplash.com/photo-1461722001215-23652335b9c2?q=80&w=1600&auto=format&fit=crop')",
  },
};

export default function RVSelector() {
  const [open, setOpen] = useState(false);
  const [lastRv, setLastRv] = useState("Large");
  return (
    <section
      id="selector"
      className="border-b border-white/10 bg-slate-950/60 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            RV Selector
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Choose a size to start
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-balance text-white/70">
            Each type includes curated matches from trusted owners. You can’t
            choose wrong—Flex+ guarantees same-type or higher.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Object.keys(rv).map((k) => (
            <button
              key={k}
              onClick={() => {
                setLastRv(k);
                setOpen(true);
              }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white">{k}</h4>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/70 group-hover:text-white">
                  {rv[k].length}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/70">
                {rv[k].people} • {rv[k].beds} beds
              </p>
              <div className="mt-3 h-24 w-full overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-slate-800 to-slate-900">
                <img
                  className="h-full w-full object-cover opacity-90"
                  alt={`${k} example`}
                  src={`https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ix=${k}`}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-white/70">
                  From {rv[k].baseNightly}/night
                </span>
                <span className="inline-flex items-center gap-1 text-cyan-300">
                  Flex+ <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
