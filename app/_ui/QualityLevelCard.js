import { Check } from "lucide-react";
import TierBadge from "./TierBadge";

const QualityLevelCard = ({
  plan,
  benefits,
  backgroundColor,
  qualityScore,
  slogan,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={[
        "relative overflow-hidden rounded-2xl p-4 sm:p-5",
        "border cursor-pointer transition",
        "focus:outline-none",
        isSelected
          ? "ring-2 ring-cyan-400 border-cyan-400"
          : "border-slate-800 hover:border-slate-700",
      ].join(" ")}
    >
      <div className={`${backgroundColor} absolute inset-0 -z-10`} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 sm:flex-1 min-w-0">
          <div className="shrink-0">
            <TierBadge tierKey={plan} />
          </div>

          <p className="text-slate-400 text-xs sm:text-sm leading-snug wrap-break-word min-w-0">
            {slogan}
          </p>
        </div>

        <div className="flex items-center justify-between sm:block sm:text-right shrink-0">
          <span className="text-[10px] sm:text-xs text-slate-500">
            Quality Score
          </span>
          <span className="sm:hidden text-white font-bold tabular-nums">
            {qualityScore}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 sm:flex-1 min-w-0">
          {benefits.map((benefit, index) => (
            <li key={index} className="min-w-0">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm leading-snug wrap-break-word min-w-0">
                  {benefit}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex items-start justify-end shrink-0">
          <h1 className="text-white font-bold text-lg tabular-nums">
            {qualityScore}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default QualityLevelCard;
