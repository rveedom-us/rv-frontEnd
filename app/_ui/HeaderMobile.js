"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight } from "lucide-react"; // Added Chevron
import Link from "next/link";
import CallButton from "./CallButton";
import BookFlexButton from "./BookFlexButton";
import SignInWithGoogle from "@/_components/Auth/SigninWithGoogleButton";
import UserProfile from "@/_components/Auth/UserProfile";

export default function HeaderMobile({ links, session }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu logic
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handler = () => closeMenu();
    window.addEventListener("hashchange", handler);

    // Close when clicking outside of the menuRef wrapper
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("hashchange", handler);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* FULL WIDTH DROPDOWN CONTAINER */}
      <div
        className={`absolute left-0 top-full z-50 w-full transition-all duration-300 ease-in-out ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mx-auto max-w-7xl sm:px-6 h-screen">
          {/* BEAUTIFUL BOX DESIGN WITH BACKDROP BLUR */}
          <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-3 shadow-2xl animate-in fade-in-0 slide-in-from-top-1 duration-300 h-screen">
            {/* Links Section with Staggered Reveal */}
            <div className="flex flex-col gap-1.5 pt-1">
              {links.map((l, index) => (
                <Link
                  key={index}
                  href={l.href}
                  onClick={closeMenu}
                  // Added a staggered delay for the animation
                  className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-base text-white/90 hover:bg-white/5 hover:text-white transition-all animate-in fade-in-0 slide-in-from-top-1"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <span className="font-medium tracking-tight">{l.label}</span>
                  <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>

            {/* Actions Section */}
            <div className="mt-3 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-4">
              {/* Wrapped buttons to catch click and close menu */}
              <div
                onClick={closeMenu}
                className="contents items-center justify-center pt-1"
              >
                <CallButton />
              </div>
              <div
                onClick={closeMenu}
                className="contents items-center justify-center pt-1"
              >
                <BookFlexButton />
              </div>

              <div className="border-t border-white/5 mt-1 pt-2">
                {session ? (
                  <UserProfile session={session} />
                ) : (
                  <div
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center py-1 active:scale-[0.98] transition-transform"
                  >
                    <SignInWithGoogle />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
