import Image from "next/image";
import Pill from "./Pill";

const FloorPlansCard = ({ title, size, beds, cardDetails }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur ">
      {/* title size beds */}
      <div className="flex items-center justify-between">
        {title && <h2 className="text-lg font-bold text-white">{title}</h2>}

        <div className="uppercase">
          <Pill>
            {size}
            {" . "}
            {beds}
          </Pill>
        </div>
      </div>
      {/* card */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full mt-3">
        {cardDetails.map((card) => (
          <div key={card.feature} className="pb-2 rounded-md bg-[#1c2437]">
            <Image
              src={card.img}
              alt={card.feature}
              className=" object-cover rounded-md h-36 w-full"
              width={200}
              height={200}
            />
            <h1 className="text-center text-sm text-white/80 mt-2">
              {card.feature}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorPlansCard;
