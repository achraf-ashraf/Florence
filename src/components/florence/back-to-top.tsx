"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show button after scrolling past ~1.2 viewports
      setVisible(window.scrollY > window.innerHeight * 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full glass border border-[#C5A35A]/40 flex items-center justify-center group shadow-2xl"
        >
          {/* Gold ring on hover */}
          <span className="absolute inset-0 rounded-full border border-[#C5A35A]/0 group-hover:border-[#C5A35A]/60 transition-colors duration-300" />
          <ArrowUp className="h-5 w-5 text-[#C5A35A] group-hover:text-[#D8B96B] transition-colors" />

          {/* Subtle gold glow on hover */}
          <span className="absolute inset-0 rounded-full bg-[#C5A35A]/0 group-hover:bg-[#C5A35A]/10 transition-colors duration-300 blur-md" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
