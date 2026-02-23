"use client";

import { signOutAction } from "@/_lib/authSession/authAction";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={signOutAction}
      className="flex gap-2 w-full text-left p-2 rounded-xl hover:bg-slate-900 cursor-pointer"
    >
      <LogOut />
      Logout
    </button>
  );
}
