const QualityScoreCard = ({ title, weight, desc }) => {
  return (
    <div className="rounded-xl border border-slate-700 p-3 bg-slate-900/60 ">
      <h1 className="text-[12px] text-slate-400">{title}</h1>
      <h1 className="text-sm mt-1 text-white font-bold">Weight {weight}</h1>
      <p className="text-[12px] text-slate-500 mt-1">{desc}</p>
    </div>
  );
};

export default QualityScoreCard;
