import { useDispatch, useSelector } from "react-redux";
import { setGuests } from "@/_lib/store/cartSlice";

const GuestRequirements = ({ onChange }) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.cart.guests);
  const PET_FEE = 75;

  const handleChange = (field, value) => {
    const rawValue = parseInt(value) || 0;
    const nextValues = { ...values, [field]: rawValue };

    // Calculate pet fee immediately for the payload
    const payload = {
      ...nextValues,
      petFee: nextValues.pets * PET_FEE,
    };

    dispatch(setGuests(payload));
    onChange?.(payload);
  };

  return (
    <div className="rounded-2xl border border-slate-700 p-6 bg-slate-900 text-slate-100 ">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <span>👥</span> Guest Requirements
      </h2>

      <div className="space-y-5">
        {[
          { id: "people", label: "# of People", min: 1 },
          { id: "beds", label: "# of Beds Needed", min: 1 },
          { id: "pets", label: "# of Pets", min: 0, sub: "+$75 per pet" },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-300 block">
                {item.label}
              </label>
              {item.sub && (
                <span className="text-[10px] text-slate-500">{item.sub}</span>
              )}
            </div>
            <input
              type="number"
              min={item.min}
              value={values[item.id]}
              onChange={(e) => handleChange(item.id, e.target.value)}
              className="w-20 bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-center focus:ring-blue-500 focus:outline-none transition-colors"
            />
          </div>
        ))}
      </div>

      {values.pets > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
          <span className="text-slate-400">Pet charge:</span>
          <span className="text-green-400 font-semibold">
            ${values.pets * PET_FEE}
          </span>
        </div>
      )}
    </div>
  );
};

export default GuestRequirements;
