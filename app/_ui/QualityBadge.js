export default function QualityBadge({ quality }) {
  let color = "";

  if (quality === "70-80") {
    color = "bg-yellow-900/40 text-yellow-300 border-yellow-700/50";
  } else if (quality === "80-90") {
    color = "bg-lime-900/40 text-lime-300 border-lime-700/50";
  } else if (quality === "90-100") {
    color = "bg-emerald-900/40 text-emerald-300 border-emerald-700/50";
  }

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${color}`}>
      Quality {quality}
    </span>
  );
}
