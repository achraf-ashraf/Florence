"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Capacity", href: "#capacity" },
  { label: "Services", href: "#services" },
  { label: "Healthcare", href: "#healthcare" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/florence/logo-icon.png"
              alt="Florence Laundry"
              className="h-9 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-serif font-semibold text-base tracking-[0.18em] text-[#F2EEE3] uppercase">
                Florence Laundry
              </span>
              <span className="eyebrow text-[10px] mt-1">
                Doha · Qatar
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#E2DFD7]/80 hover:text-[#C5A35A] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-[#C5A35A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

                    {/* CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/florence-brochure.pdf"
              download
              className="btn-ghost-gold px-5 py-2.5 text-xs font-medium tracking-[0.2em] uppercase rounded-full inline-flex items-center gap-2"
              aria-label="Download corporate profile PDF"
            >
              <Download className="h-3.5 w-3.5" />
              Profile
            </a>
            <a
              href="#contact"
              className="btn-ghost-gold px-5 py-2.5 text-xs font-medium tracking-[0.2em] uppercase rounded-full"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-[#E2DFD7]"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0C0C0E]/80 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm glass-nav z-[70] lg:hidden p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <img
                  src="/florence/logo-icon.png"
                  alt="Florence"
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-[#E2DFD7]"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="font-serif text-2xl font-medium text-[#F2EEE3] py-3 border-b border-[#C5A35A]/15 hover:text-[#C5A35A] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
                            <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-gold mt-8 px-6 py-3 text-xs tracking-[0.2em] uppercase rounded-full text-center"
              >
                Get in Touch
              </a>
              <a
                href="/florence-brochure.pdf"
                download
                onClick={() => setMobileOpen(false)}
                className="btn-ghost-gold mt-3 px-6 py-3 text-xs tracking-[0.2em] uppercase rounded-full text-center inline-flex items-center justify-center gap-2"
                aria-label="Download corporate profile PDF"
              >
                <Download className="h-3.5 w-3.5" />
                Download Profile
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
