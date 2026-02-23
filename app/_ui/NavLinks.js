"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ links }) => {
  const pathname = usePathname();

  const handleClick = (e, link) => {
    if (link.sectionId && pathname === "/") {
      e.preventDefault();
      const section = document.getElementById(link.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
      {links.map((l, index) => (
        <Link
          key={index}
          href={l.href}
          className="hover:text-white"
          onClick={(e) => handleClick(e, l)}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
