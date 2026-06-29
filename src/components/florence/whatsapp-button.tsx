"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

const NUMBERS = [
  {
    label: "Primary Line",
    number: "+974 7017 7703",
    href: "https://wa.me/97470177703",
  },
  {
    label: "Secondary Line",
    number: "+974 3355 5733",
    href: "https://wa.me/97433555733",
  },
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Toggle menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-5 w-[280px] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="eyebrow text-[10px] mb-1">WhatsApp</div>
                <div className="font-serif text-base text-[#F2EEE3] font-medium">
                  Contact Florence
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-[#8A8377] hover:text-[#C5A35A] transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2.5">
              {NUMBERS.map((n, i) => (
                <motion.a
                  key={n.number}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all"
                >
                  <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-white" fill="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-[#A88D4E] mb-0.5">
                      {n.label}
                    </div>
                    <div className="font-serif text-sm text-[#F2EEE3] font-medium tracking-wide">
                      {n.number}
                    </div>
                  </div>
                  <Phone className="h-4 w-4 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#C5A35A]/15 text-center">
              <p className="text-[10px] text-[#8A8377] tracking-wider">
                Available 24 / 7 / 365
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className={`relative h-14 w-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl whatsapp-pulse transition-all ${
          open ? "rotate-90" : "rotate-0"
        }`}
        aria-label="WhatsApp contact"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-7 w-7 text-white" fill="white" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#C5A35A] border-2 border-[#0C0C0E]" />
        )}
      </motion.button>
    </div>
  );
}
