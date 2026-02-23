"use client";
import { Info } from "lucide-react";
import { tripLengthCalc } from "@/_lib/tripLengthCalc";
import { useDispatch, useSelector } from "react-redux";
import { setTotalDate, setStartDate, setEndDate } from "@/_lib/store/cartSlice";

export default function TripDetails() {
  const { totalDate, startDate, endDate } = useSelector((state) => state.cart);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();

  const dateInputClasses =
    "bg-slate-900 text-slate-100 border border-slate-700 rounded-md px-2 py-1 focus:ring-2 focus:ring-cyan-400 outline-none transition duration-150 ease-in-out [color-scheme:dark]";

  const handleStartChange = (value) => {
    dispatch(setStartDate(value));

    if (endDate && new Date(value) > new Date(endDate)) {
      dispatch(setEndDate(""));
      dispatch(setTotalDate(0));
    } else if (startDate && endDate) {
      calcTripLength(value, endDate);
    }
  };

  const handleEndChange = (value) => {
    dispatch(setEndDate(value));
    const totalDate = tripLengthCalc(startDate, value);
    dispatch(setTotalDate(totalDate));
  };

  const minNights = totalDate < 4;

  return (
    <div className="rounded-2xl border border-slate-700 p-4 bg-slate-900">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" /> Trip Details
        </h3>
        {minNights && (
          <span className="text-red-400 text-xs bg-red-900/40 px-2 py-0.5 rounded-md">
            Minimum 4 nights required.
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <label className="flex flex-col gap-2">
          <span className="text-slate-300">Starting Date</span>
          <input
            type="date"
            min={today}
            value={startDate || ""}
            onChange={(e) => handleStartChange(e.target.value)}
            className={dateInputClasses}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-slate-300">Ending Date</span>
          <input
            type="date"
            min={startDate || today}
            value={endDate || ""}
            onChange={(e) => handleEndChange(e.target.value)}
            className={dateInputClasses}
          />
        </label>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Trip length:{" "}
        <span className="text-slate-300">
          {totalDate > 0 ? `${totalDate} nights` : "-"}
        </span>
      </div>
    </div>
  );
}
