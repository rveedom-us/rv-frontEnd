/* eslint-disable @next/next/no-img-element */
"use client";

import { Logs, User, ChevronRight, Settings, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function UserProfile({ session }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Auto-close on click outside for Desktop
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!session?.user) return null;

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      {/* --- DESKTOP VERSION (Avatar Button) --- */}
      <div className="hidden md:block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/50 p-1 pr-3 hover:bg-slate-800 transition-all active:scale-95"
        >
          <img
            className="h-7 w-7 rounded-full border border-white/10 object-cover"
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-semibold text-slate-200">
            {session.user.name.split(" ")[0]}
          </span>
        </button>

        {/* Desktop Dropdown Popover */}
        {open && (
          <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-60">
            <div className="px-3 py-3 border-b border-white/5 mb-1">
              <p className="text-xs font-bold text-white truncate">
                {session.user.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {session.user.email}
              </p>
            </div>

            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-3 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-all"
            >
              <Logs size={16} />
              <span>My Orders</span>
            </Link>

            <div className="mt-1 pt-1">
              <SignOutButton />
            </div>
          </div>
        )}
      </div>

      {/* --- MOBILE VERSION (Embedded Identity Card) --- */}
      {/* This renders inside your HeaderMobile "Smart Card" footer */}
      <div className="flex w-full flex-col gap-3 md:hidden">
        <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 p-3 border border-white/5 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                className="h-12 w-12 rounded-2xl border border-white/10 object-cover"
                src={session.user.image}
                alt={session.user.name}
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-tight">
                {session.user.name}
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                Verified Member
              </span>
            </div>
          </div>

          <Link
            href="/order"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 active:bg-cyan-500/20 active:text-cyan-400 transition-all"
          >
            <Logs size={20} />
          </Link>
        </div>


        <div className="w-full">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
