/* eslint-disable @next/next/no-img-element */
"use client";

import { Logs } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function UserProfile({ session }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <img
        className="h-8 w-8 rounded-full cursor-pointer"
        src={session.user.image}
        alt={session.user.name}
        referrerPolicy="no-referrer"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-slate-950 shadow-lg rounded-lg p-2 text-white animate-popIn">
          <Link
            href="/order"
            className="flex gap-2 w-full text-left p-2 rounded-xl hover:bg-slate-900"
          >
            <Logs />
            Orders
          </Link>

          <SignOutButton />
        </div>
      )}
    </div>
  );
}
