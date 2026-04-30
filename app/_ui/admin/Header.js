"use client";
import { usePathname } from "next/navigation";
import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  const path = usePathname();
  const pageTitle =
    path
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "Dashboard";

  return (
    <header className="col-span-12 lg:col-span-12 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-5 flex justify-between items-center shadow-lg transition-all duration-300">
      <div className="flex flex-col">
        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
          Admin Portal
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Decorative Icons / Action Buttons */}
        <div className="hidden sm:flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          <button className="p-2 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-all">
            <Search size={18} />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-slate-800 hidden sm:block mx-2" />

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-slate-800/40 hover:bg-slate-800 border border-slate-700 transition-all">
          <span className="hidden sm:block text-sm font-medium text-slate-300">
            Admin
          </span>
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
            <UserCircle size={20} />
          </div>
        </button>
      </div>
    </header>
  );
}
