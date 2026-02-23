"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const pageTitle = path
    .split("/")
    .pop()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="col-span-12 lg:col-span-6 bg-slate-900 rounded-2xl sm:rounded-3xl lg:rounded-4xl p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <p className="text-xl sm:text-2xl font-semibold">{pageTitle}</p>
      <div className="text-sm sm:text-base">Icons</div>
    </div>
  );
}
