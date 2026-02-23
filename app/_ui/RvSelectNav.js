"use client";

export default function RVSelectNav({ handleProjectShow, activeView }) {
  const baseTab =
    "group relative h-full flex-1  cursor-pointer transition-all duration-300 ease-in-out";
  const tabText =
    "relative z-10 flex h-full items-center justify-center bg-transparent text-xs md:text-sm md:font-semibold text-white";
  const hoverBg =
    "absolute inset-0 z-0 bg-gradient-to-r from-gray-500 to-slate-700 transition-opacity duration-300 ease-in-out";

  const views = [
    { id: "basic", label: "Standard View" },
    { id: "matrix", label: "Matrix View" },
    { id: "list", label: "List View" },
  ];

  return (
    <div className="flex h-12 w-100 items-center justify-between rounded-full border border-gray-800">
      {views.map((v, i) => (
        <div
          key={v.id}
          onClick={() => handleProjectShow(v.id)}
          className={`${baseTab}`}
        >
          <p
            className={`${tabText} ${
              i === 0
                ? "rounded-s-full"
                : i === views.length - 1
                ? "rounded-e-full"
                : ""
            }`}
          >
            {v.label}
          </p>
          <div
            className={`${hoverBg} ${
              i === 0
                ? "rounded-s-full"
                : i === views.length - 1
                ? "rounded-e-full"
                : ""
            } ${
              activeView === v.id
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          />
          {i < views.length - 1 && <span className="h-full w-px bg-gray-500" />}
        </div>
      ))}
    </div>
  );
}
