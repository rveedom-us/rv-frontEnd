/* eslint-disable @next/next/no-img-element */
"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import TierBadge from "./TierBadge";

const VisualStyleByLevel = ({ img, images, tag, note, label, plan }) => {
  const allImages = images || [img];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
      {/* Image Carousel */}
      <div className="relative">
        <Splide
          aria-label={label}
          options={{
            rewind: true,
            pagination: allImages.length > 1,
            arrows: allImages.length > 1,
            height: 300,
          }}
        >
          {allImages.map((src, index) => (
            <SplideSlide key={index}>
              <div className="relative h-[300px] w-full">
                <img
                  src={src}
                  alt={`${label} - Image ${index + 1}`}
                  className="h-[300px] w-full object-cover"
                />
                <div className={`absolute inset-0 opacity-25 ${tag}`}></div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Badge */}
      <div className="px-5 pb-5">
        <div className="flex gap-3 items-center mt-5">
          <div>
            <TierBadge tierKey={plan} />
          </div>
          <div>
            <p className="text-sm text-slate-300">{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualStyleByLevel;
