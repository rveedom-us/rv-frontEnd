export default function QualityBar({ qualityScore }) {
  function getQualityWidth(scoreRange) {
    if (!scoreRange) return 0;
    const [min, max] = scoreRange.split("-").map(Number);
    return (min + max) / 2;
  }

  return (
    <div className="h-2 rounded-full bg-slate-800 overflow-hidden mt-5">
      <div
        className="h-2 bg-linear-to-r from-cyan-500 via-fuchsia-500 to-purple-600 transition-all duration-700"
        style={{ width: `${getQualityWidth(qualityScore)}%` }}
      ></div>
    </div>
  );
}
