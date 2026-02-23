export default function Pill({ icon, children, size = "sm" }) {
  const sizeClasses = {
    sm: "px-3 py-1 text-xs rounded-full",
    md: "px-4 py-2 text-sm rounded-2xl",
    lg: "px-5 py-4 text-sm rounded-xl",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 border border-white/10 bg-white/5 text-white/90 ${sizeClasses[size]}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}
