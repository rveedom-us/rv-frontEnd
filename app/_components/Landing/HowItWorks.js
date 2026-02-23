import Card from "@/_ui/Card";

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-white/10 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            How it works
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            3 steps to your perfect setup
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card
            icon={1}
            title="Choose your type"
            text="Pick Medium → XXL, share your dates, location and any must-haves."
          />
          <Card
            icon={2}
            title="Owners compete to win"
            text="We alert top-rated local owners. The first qualified match accepts and locks your trip."
          />
          <Card
            icon={3}
            title="Delivered & ready"
            text="We handle delivery, hookups and walkthrough. Support is on-call the entire stay."
          />
        </div>
      </div>
    </section>
  );
}
