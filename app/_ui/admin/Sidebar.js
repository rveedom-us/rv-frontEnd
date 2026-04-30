"use client";

import {
  CircleGauge,
  Logs,
  ChevronDown,
  Menu,
  LayoutDashboard,
  Box,
  PlusCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import SignOutButton from "@/_components/Auth/SignOutButton";
import Logo from "../Logo";

const navLinks = [
  {
    name: "Dashboard",
    href: "/adminpanel",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Orders",
    href: "/adminpanel/order",
    icon: <Box size={20} />,
    subLinks: [
      {
        name: "All Orders",
        href: "/adminpanel/order/all-order",
        icon: <Logs size={16} />,
      },
      {
        name: "Create Order",
        href: "/adminpanel/order/create-order",
        icon: <PlusCircle size={16} />,
      },
    ],
  },
];

export default function SideNavigation() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-open menus if current path is a sub-link
  useEffect(() => {
    navLinks.forEach((link) => {
      if (link.subLinks && pathname.startsWith(link.href)) {
        setOpenMenus((prev) => ({ ...prev, [link.name]: true }));
      }
    });
  }, [pathname]);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md z-40 px-4 flex items-center border-b border-slate-800">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 font-bold text-white tracking-tight">
          Admin Panel
        </span>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity animate-fadeIn"
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed lg:sticky top-0 left-0
          h-screen w-72 
          bg-slate-900 border-r border-slate-800
          transition-transform duration-300 ease-in-out z-60
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Brand/Logo Section */}
        <div className="p-8">
          <Logo />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.subLinks && pathname.startsWith(link.href));
            const isMenuOpen = openMenus[link.name];

            return (
              <div key={link.name} className="flex flex-col">
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleMenu(link.name)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-xl transition-all group
                        ${isActive ? "text-indigo-400" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`${isActive ? "text-indigo-500" : "text-slate-500 group-hover:text-indigo-400"}`}
                        >
                          {link.icon}
                        </span>
                        <span className="font-medium">{link.name}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Sub-menu with vertical line connector */}
                    <div
                      className={`
                      overflow-hidden transition-all duration-300 ml-5 border-l border-slate-800
                      ${isMenuOpen ? "max-h-40 mt-1 opacity-100" : "max-h-0 opacity-0"}
                    `}
                    >
                      {link.subLinks.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              flex items-center gap-3 py-2.5 px-6 text-sm transition-all relative
                              ${
                                isSubActive
                                  ? "text-white font-semibold"
                                  : "text-slate-500 hover:text-slate-300"
                              }
                            `}
                          >
                            {/* Connector dash */}
                            <span
                              className={`absolute left-0 w-3 h-px ${isSubActive ? "bg-indigo-500" : "bg-slate-800"}`}
                            />
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl transition-all group
                      ${
                        isActive
                          ? "bg-indigo-500/10 text-white border border-indigo-500/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                      }
                    `}
                  >
                    <span
                      className={`${isActive ? "text-indigo-500" : "text-slate-500 group-hover:text-indigo-400"}`}
                    >
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer / Sign Out */}
        <div className="p-4 mt-auto border-t border-slate-800 bg-slate-900/50">
          <SignOutButton />
        </div>
      </nav>
    </>
  );
}
