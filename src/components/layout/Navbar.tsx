"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0e0e12]/85 backdrop-blur-md border-b border-[#3c3c50]/50" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#8a9a8a] tracking-tight"
        >
          TN.
        </motion.a>

        {/* Desktop Links */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[#787878] hover:text-[#c8c8c4] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className={`text-sm transition-colors ${
                isBlog ? "text-[#c8c8c4]" : "text-[#787878] hover:text-[#c8c8c4]"
              }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              href="mailto:tasnimbinteynaser@gmail.com"
              className="px-4 py-2 text-sm rounded-full border border-[#506464]/50 text-[#8a9a8a] hover:bg-[#506464]/15 hover:border-[#506464] transition-all"
            >
              Hire Me
            </a>
          </li>
        </motion.ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#787878] hover:text-[#c8c8c4]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0e0e12]/95 border-b border-[#3c3c50]/50"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#787878] hover:text-[#c8c8c4] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  onClick={() => setMenuOpen(false)}
                  className="text-[#787878] hover:text-[#c8c8c4] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
