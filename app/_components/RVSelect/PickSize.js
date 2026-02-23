"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedSize } from "@/_lib/store/cartSlice";
import { sizes } from "@/_lists/sizes";
import PickSizeCard from "@/_ui/PickSizeCard";

const PickSize = () => {
  const dispatch = useDispatch();
  const selectedKey = useSelector((state) => state.cart.selectedSize);

  const handleSelect = (key) => {
    dispatch(setSelectedSize(key));
  };
  //   notes
  // container will contain max-w-7xl px-4 sm:px-6 pt-10
  return (
    <section className="bg-slate-950/60 mt-3">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* pick a size */}
        <div className="pt-10">
          {/* text */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Pick a Size
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              From M to XXL - smaller travel trailers for solo travelers to
              massive fifth wheel options
            </p>
          </div>

          {/* card */}
          <div className="pt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(sizes).map(([key, data]) => (
              <PickSizeCard
                key={key}
                {...data}
                isSelected={selectedKey === key}
                onClick={() => handleSelect(key)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickSize;
