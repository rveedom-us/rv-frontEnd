"use client";

import Accordion from "@/_ui/Accordion";
import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // NOTE demo json
  const faqData = [
    {
      id: 1,
      question: "What is RVEEDOM Flex+?",
      answer:
        "Flex+ is our premium matching service. You pick the RV type and dates, and we instantly notify top-rated local owners. The first qualified owner to accept wins the job—meaning you get a same-type or higher upgrade at a competitive Flex+ rate with professional delivery, setup and support included.",
    },
    {
      id: 2,
      question: "How much can I save?",
      answer:
        "Typical Flex+ bookings come in 8–18% under comparable listings thanks to dynamic owner competition and our streamlined operations. Savings vary by season, location and length of stay.",
    },
    {
      id: 3,
      question: "What if no owner accepts?",
      answer:
        "We expand the search radius and tiers. If we can’t confirm a match within your chosen window, we’ll present alternatives or issue a fast refund—your choice.",
    },
    {
      id: 4,
      question: "Is delivery required?",
      answer:
        "Most Flex+ trips include white-glove delivery and full setup at your campsite, home, or event venue. Driveables and self-pickup options are also available in select markets.",
    },
    {
      id: 5,
      question: "Do you work with insurance/FEMA?",
      answer:
        "Yes. We support insurance-covered and FEMA-supported long-term stays. Our team can coordinate documentation, billing, and extensions to keep families comfortably housed.",
    },
  ];

  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto  max-w-7xl px-4 sm:px-6">
        {/* text */}
        <div>
          <h1 className="text-center  text-[#27DBFD] uppercase font-semibold text-xs">
            FAQ
          </h1>
          <p className="text-center text-4xl text-white font-bold mt-2">
            Answers before you request
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-7 space-y-3 ">
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              indexNum={index}
              question={item.question}
              answer={item.answer}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
