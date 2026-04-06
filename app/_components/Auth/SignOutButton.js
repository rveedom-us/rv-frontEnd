"use client";

import { signOutAction } from "@/_lib/authSession/authAction";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOutAction()}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98] md:px-2 md:py-2"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 group-hover:bg-red-500/20 transition-colors">
        <LogOut
          size={16}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </div>
      <span>Logout</span>
    </button>
  );
}
