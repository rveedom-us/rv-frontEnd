"use client";

import {
  CircleGauge,
  Logs,
  UserCog,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  {
    name: "Dashboard",
    href: "/adminpanel",
    icon: <CircleGauge className="h-5 w-5" />,
  },
  {
    name: "Order",
    href: "/adminpanel/order",
    icon: <Logs className="h-5 w-5" />,
    subLinks: [
      { name: "All Orders", href: "/adminpanel/order/all-order" },
      { name: "Create Order", href: "/adminpanel/order/create-order" },
    ],
  },
  {
    name: "Users",
    href: "/profile",
    icon: <UserCog className="h-5 w-5" />,
    subLinks: [
      { name: "All Users", href: "/profile/all-users" },
      { name: "Create User", href: "/profile/create-user" },
    ],
  },
];

export default function SideNavigation() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 rounded-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Navigation */}
      <nav
        className={`
        fixed lg:relative
        row-span-10 
        bg-slate-900 
        rounded-e-2xl sm:rounded-e-3xl lg:rounded-e-4xl 
        p-4 sm:p-5
        transition-transform duration-300 ease-in-out
        z-50
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        w-64 sm:w-72 lg:w-auto
        h-full
        overflow-y-auto
      `}
      >
        <p className="font-semibold text-2xl sm:text-3xl mb-6 sm:mb-10">
          Admin Panel
        </p>
        <ul className="flex flex-col gap-2 text-base sm:text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.subLinks ? (
                <>
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className={`w-full flex justify-between items-center py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg hover:bg-slate-950 hover:text-slate-100 transition-colors font-semibold ${
                      pathname.startsWith(link.href) ? "bg-slate-950" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {link.icon}
                      <span>{link.name}</span>
                    </div>
                    {openMenus[link.name] ? (
                      <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                      openMenus[link.name]
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="pl-8 sm:pl-12 flex flex-col gap-1 mt-1 list-disc">
                      {link.subLinks.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            className={`py-2 px-3 sm:px-5 rounded-lg hover:bg-slate-950 hover:text-slate-100 transition-colors block ${
                              pathname === sub.href ? "bg-slate-950" : ""
                            }`}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  className={`py-2.5 sm:py-3 px-3 sm:px-5 hover:bg-slate-950 hover:text-slate-100 transition-colors flex items-center gap-3 sm:gap-4 font-semibold rounded-lg ${
                    pathname === link.href ? "bg-slate-950" : ""
                  }`}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              )}
            </li>
          ))}
          <li className="mt-auto pt-4">
            {/* <SignOutButton /> */} Sign Out Button
          </li>
        </ul>
      </nav>
    </>
  );
}
