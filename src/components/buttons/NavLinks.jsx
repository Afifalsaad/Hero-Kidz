"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ href, children }) => {
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={`${path.startsWith(href) && "text-primary"} font-medium`}>
        {children}
      </Link>
    </li>
  );
};

export default NavLinks;
