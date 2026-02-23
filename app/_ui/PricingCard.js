const PricingCard = ({ title, list_items, action, badge }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-800/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur ">
      {/* Card content goes here */}
      <div className="flex items-center justify-between">
        {title && <h2 className="text-lg font-bold text-white">{title}</h2>}
        {badge && (
          <span className="rounded-md bg-cyan-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-300 ring-1 ring-cyan-400/20">
            {badge}
          </span>
        )}
      </div>
      {/* list item */}
      {list_items && (
        <ul className="mt-4 space-y-2">
          {list_items.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              {item.icon}
              <span className="text-white text-sm">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
      {/* action */}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default PricingCard;
