"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50); // trigger after 50px scroll
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(0px)" }}
      animate={{
        backgroundColor: scrolled
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logos/logo.png"
            alt="Hero-X Logo"
            className="h-10 w-10 object-contain hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Navigation */}
        <ul className="flex gap-8 text-white font-medium">
          {["Search", "Versus"].map((item) => (
            <li key={item} className="relative group">
              <Link
                href={`/${item.toLowerCase()}`}
                className="transition-colors duration-300 group-hover:text-blue-400"
              >
                {item}
              </Link>

              {/* Underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
