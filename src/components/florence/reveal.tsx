"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ============================================================
   Reveal — fades + slides children into view on scroll
   ============================================================ */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Stagger — children reveal in sequence
   ============================================================ */
export function Stagger({
  children,
  className = "",
  stagger = 0.12,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   StaggerItem — child of Stagger
   ============================================================ */
export function StaggerItem({
  children,
  className = "",
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

/* ============================================================
   SectionHeader — eyebrow + title + gold rule
   ============================================================ */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "text-center" : "text-left"}>
        <div
          className={`eyebrow mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          {eyebrow}
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-cream leading-[1.1] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="font-serif italic text-base md:text-lg text-[#A88D4E] mt-3 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div
          className={`gold-rule mt-6 ${align === "center" ? "mx-auto" : ""}`}
        />
      </div>
    </Reveal>
  );
}

/* ============================================================
   ParallaxImage — subtle parallax on scroll
   ============================================================ */
export function ParallaxImage({
  src,
  alt,
  className = "",
  overlay = true,
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const center = rect.top + rect.height / 2 - windowH / 2;
      setOffset(center * 0.12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[120%] object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/30 to-transparent" />
      )}
    </div>
  );
}
