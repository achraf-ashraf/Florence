"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Droplets,
  Sparkles,
  Shirt,
  WashingMachine,
  Waves,
  Truck,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/florence/navbar";
import { WhatsAppButton } from "@/components/florence/whatsapp-button";
import { BackToTop } from "@/components/florence/back-to-top";
import {
  Reveal,
  Stagger,
  StaggerItem,
  SectionHeader,
  ParallaxImage,
} from "@/components/florence/reveal";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once on mount — disables heavy parallax on touch devices
  useEffect(() => {
    const check = () =>
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768 ||
      "ontouchstart" in window;
    setIsMobile(check());
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // On mobile: no parallax movement (prevents lag). On desktop: subtle parallax.
  const heroY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.1]);
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#E2DFD7] overflow-x-hidden">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      {/* ======================================================== */}
      {/* HERO — HOME                                              */}
      {/* ======================================================== */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image with parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/florence/interior-marble.jpg"
            alt="Florence Laundry interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0E]/85 via-[#0C0C0E]/70 to-[#0C0C0E]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E]/60 via-transparent to-[#0C0C0E]/60" />
        </motion.div>

        {/* Marble subtle glow */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#C5A35A]/8 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C5A35A]/5 blur-[140px]" />
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center pt-24 pb-36"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <img
              src="/florence/logo.png"
              alt="Florence Laundry"
              className="h-44 md:h-56 w-auto drop-shadow-[0_8px_32px_rgba(197,163,90,0.35)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="eyebrow mb-6"
          >
            Doha · Qatar &nbsp;·&nbsp; Commercial Laundry
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#F2EEE3]"
          >
            Industrial Scale.
            <br />
            <span className="text-gold-gradient italic">Hospital Standards.</span>
            <br />
            Luxury Finish.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-8 text-sm md:text-base text-[#E2DFD7]/80 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            A premium commercial laundry processing over{" "}
            <span className="text-[#C5A35A] font-medium">7.5 tons of linen daily</span>{" "}
            — equating to approximately{" "}
            <span className="text-[#C5A35A] font-medium">135,000 pieces per week</span>{" "}
            — with sterilization protocols trusted by the most demanding clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#about"
              className="btn-gold px-7 py-3.5 text-xs font-medium tracking-[0.2em] uppercase rounded-full inline-flex items-center gap-2"
            >
              Discover Florence
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="btn-ghost-gold px-7 py-3.5 text-xs font-medium tracking-[0.2em] uppercase rounded-full"
            >
              Speak With Us
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-[#8A8377]"
          >
            <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-[#C5A35A] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* ABOUT US                                                 */}
      {/* ======================================================== */}
      <section
        id="about"
        className="relative py-24 md:py-32 px-5 md:px-8 marble-overlay"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: copy */}
            <div>
              <SectionHeader
                eyebrow="01 — About Us"
                title={
                  <>
                    Built for organizations that cannot
                    <span className="text-gold-gradient"> second-guess their linen.</span>
                  </>
                }
              />

              <Reveal delay={0.15}>
                <p className="mt-8 text-[#E2DFD7]/85 text-base leading-[1.85] tracking-wide">
                  Florence Laundry is a commercial laundry built for organizations
                  that cannot afford to second-guess their linen. The requirement is
                  the same across every business we serve: fresh, properly finished
                  linen, delivered on schedule, every single day. We provide that at
                  industrial volume, with the discipline and finishing standard of a
                  much smaller operation.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="mt-5 text-[#E2DFD7]/85 text-base leading-[1.85] tracking-wide">
                  The plant runs three shifts, seven days a week, 365 days a year.
                  A dedicated logistics fleet handles collection and delivery
                  end-to-end, picking up soiled linen from the client&apos;s doorstep
                  and returning fresh stock on the same reliable cycle. The client
                  never has to think about transport; we own it.
                </p>
              </Reveal>

              <Reveal delay={0.35}>
                <p className="mt-5 text-[#E2DFD7]/85 text-base leading-[1.85] tracking-wide">
                  That standard is straightforward:{" "}
                  <span className="text-[#C5A35A] font-medium">
                    every piece is inspected by a person before it ships.
                  </span>{" "}
                  Machines handle volume; people handle judgement.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  {[
                    { value: "24/7", label: "Operation" },
                    { value: "365", label: "Days a Year" },
                    { value: "100%", label: "Hand-Checked" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="luxury-card p-5 rounded-xl text-center"
                    >
                      <div className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient">
                        {s.value}
                      </div>
                      <div className="eyebrow text-[10px] mt-2">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: image */}
            <Reveal delay={0.2} y={40}>
              <div className="relative">
                <ParallaxImage
                  src="/florence/interior-wood.jpg"
                  alt="Florence Laundry plant interior"
                  className="aspect-[4/5] rounded-2xl border border-[#C5A35A]/20"
                />
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 max-w-[220px] hidden md:block">
                  <div className="eyebrow text-[10px] mb-2">The Florence Plant</div>
                  <p className="font-serif italic text-sm text-[#F2EEE3] leading-snug">
                    Marble reception, hand-finishing wing, 24-hour dispatch bay.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCALE & CAPACITY                                         */}
      {/* ======================================================== */}
      <section
        id="capacity"
        className="relative py-24 md:py-32 px-5 md:px-8 bg-[#0A0A0C]"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="02 — Scale & Capacity"
            title={
              <>
                Sized for the worst day,
                <span className="text-gold-gradient"> not the average one.</span>
              </>
            }
            subtitle="Capacity is not a vanity figure. It is the reason a client can run a full operation and still have fresh linen every morning."
          />

          {/* Stats */}
          <Stagger className="mt-16 grid md:grid-cols-2 gap-6">
            <StaggerItem>
              <div className="gold-top-card p-8 md:p-10 rounded-2xl">
                <div className="eyebrow mb-5">Daily Throughput</div>
                <div className="font-serif text-6xl md:text-7xl font-bold text-[#F2EEE3] leading-none">
                  7.5
                  <span className="font-serif italic text-2xl md:text-3xl text-[#C5A35A] ml-2">
                    + tons / day
                  </span>
                </div>
                <p className="mt-5 text-sm text-[#8A8377] leading-relaxed">
                  Continuous three-shift operation, 365 days a year.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="gold-top-card p-8 md:p-10 rounded-2xl">
                <div className="eyebrow mb-5">Pieces Processed</div>
                <div className="font-serif text-6xl md:text-7xl font-bold text-[#F2EEE3] leading-none">
                  135,000
                  <span className="font-serif italic text-2xl md:text-3xl text-[#C5A35A] ml-2">
                    pieces / week
                  </span>
                </div>
                <p className="mt-5 text-sm text-[#8A8377] leading-relaxed">
                  Enough to fully restock multiple large commercial facilities
                  across a single week.
                </p>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Capacity bullets */}
          <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
            {[
              {
                icon: Layers,
                title: "Redundant Wash Aisles",
                desc: "Parallel tunnel and batch systems keep production running during maintenance.",
              },
              {
                icon: Clock,
                title: "Three-Shift Operation",
                desc: "24-hour processing keeps every client on a same-day or next-day cycle.",
              },
              {
                icon: Activity,
                title: "Surge Buffer Reserve",
                desc: "On-site linen pool absorbs 30%+ demand spikes without breaking SLAs.",
              },
              {
                icon: Truck,
                title: "Dedicated Fleet",
                desc: "Route-dense logistics for every client sector, with no cross-load.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="luxury-card p-6 rounded-2xl h-full">
                  <div className="h-11 w-11 rounded-xl bg-[#C5A35A]/10 border border-[#C5A35A]/30 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-[#C5A35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#F2EEE3] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8A8377] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ======================================================== */}
      {/* EQUIPMENT BANNER (parallax strip)                        */}
      {/* ======================================================== */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <ParallaxImage
          src="/florence/equipment.jpg"
          alt="Florence Laundry industrial equipment"
          className="absolute inset-0"
          overlay={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/40 to-[#0C0C0E]/60" />
        <div className="relative z-10 h-full flex items-center justify-center px-5">
          <Reveal>
            <div className="text-center max-w-3xl">
              <div className="eyebrow mb-4 justify-center">Engineering Excellence</div>
              <p className="font-serif italic text-2xl md:text-3xl text-[#F2EEE3] leading-snug">
                High-capacity machines — specified for continuous three-shift duty,
                calibrated for fabric-safe precision, maintained on a preventative
                schedule that keeps them running when our clients need them most.
              </p>
              <p className="mt-6 text-xs text-[#A88D4E] tracking-[0.2em] uppercase">
                GHIDINI · GIRBAU · DOMUS · THERMOPATCH · UNIMAC · IPSO
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SPECIALIZED SERVICES                                     */}
      {/* ======================================================== */}
      <section
        id="services"
        className="relative py-24 md:py-32 px-5 md:px-8 marble-overlay"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            eyebrow="03 — Specialized Services"
            title={
              <>
                Four workflows.
                <span className="text-gold-gradient"> One exit standard.</span>
              </>
            }
            subtitle="Every piece that enters the plant is routed through one of four workflows — each staffed separately, audited separately, finished to the same standard."
          />

          <Stagger className="mt-16 grid md:grid-cols-2 gap-6" stagger={0.1}>
            {[
              {
                num: "i",
                icon: Droplets,
                title: "Flawless Washing",
                desc: "Deep, fabric-safe cleaning using weight-calibrated wash programs, softened water, and pH-balanced detergent. Whites stay white, colours stay true, linens hold their hand feel wash after wash.",
              },
              {
                num: "ii",
                icon: Sparkles,
                title: "Advanced Stain Removal",
                desc: "A dedicated stain bench handles oil, ink, cosmetics, tannin, and protein using targeted solvents, enzymatic pre-treatments, and controlled-temperature protocols. Fabric first, chemical second.",
              },
              {
                num: "iii",
                icon: Waves,
                title: "Expert Ironing & Finishing",
                desc: "Steam-controlled flatwork ironers, form-finished shirt presses, and hand-inspection stations deliver a crisp, wrinkle-free result. Bed linen gains the sheen guests expect. Uniforms hold their crease.",
              },
              {
                num: "iv",
                icon: Shirt,
                title: "Delicate & Premium Care",
                desc: "A separate wing handles silks, satins, designer garments, and fine wools with hand-washing, low-moisture protocols, and air-drying. These pieces get the attention a tailor would give them.",
              },
            ].map((svc) => (
              <StaggerItem key={svc.num}>
                <div className="luxury-card p-7 md:p-8 rounded-2xl h-full group">
                  <div className="flex items-start justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#C5A35A]/10 border border-[#C5A35A]/30 flex items-center justify-center">
                      <svc.icon className="h-6 w-6 text-[#C5A35A]" />
                    </div>
                    <span className="font-serif italic text-3xl text-[#C5A35A]/30">
                      {svc.num}
                    </span>
                  </div>
                  <div className="eyebrow text-[10px] mb-2">
                    Workflow {svc.num.toUpperCase()}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F2EEE3] mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[#E2DFD7]/75 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ======================================================== */}
      {/* HEALTHCARE DIVISION                                      */}
      {/* ======================================================== */}
      <section
        id="healthcare"
        className="relative py-24 md:py-32 px-5 md:px-8 bg-[#0A0A0C]"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="04 — Healthcare Division"
            title={
              <>
                High-stakes linen,
                <span className="text-gold-gradient"> zero tolerance for error.</span>
              </>
            }
          />

          <Reveal delay={0.15}>
            <div className="mt-10 glass rounded-2xl p-7 md:p-9 border-l-2 border-[#C5A35A]">
              <div className="eyebrow mb-3">Clinical-Grade Discipline</div>
              <p className="font-serif italic text-lg md:text-xl text-[#F2EEE3] leading-snug">
                Linen is not a category of laundry — it is a category of public health.
                Florence Laundry runs a segregated division, built to hospital
                sterilization standards and audited for the most demanding clinical
                environments.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-8 grid md:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                num: "i",
                icon: ShieldCheck,
                title: "Strict Sterilization Standards",
                desc: "Thermal disinfection cycles on validated time-temperature curves, paired with chemical disinfection using healthcare-grade agents. Kills vegetative bacteria, viruses, and fungal pathogens — verified by independent laboratory swab testing.",
                tags: ["Thermal", "Chemical", "Lab-Verified"],
              },
              {
                num: "ii",
                icon: Droplets,
                title: "Surgical Stain Treatment",
                desc: "A specialist bench removes blood, iodine, surgical prep, contrast dyes, and chemical stains from surgical drapes, gowns, and staff apparel. Enzymatic pre-soaks and controlled peroxide protocols under trained supervision.",
                tags: ["Blood", "Iodine", "Dyes", "Chemicals"],
              },
              {
                num: "iii",
                icon: Layers,
                title: "Zero Cross-Contamination",
                desc: "Complete physical segregation from collection to delivery: dedicated bins, sealed transport, isolated wash aisles, separate drying and folding rooms, dedicated vehicles. Soiled linen never shares air, surface, or personnel.",
                tags: ["Segregated", "Isolated", "Dedicated"],
              },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="gold-top-card p-7 rounded-2xl h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-serif italic text-4xl text-[#C5A35A]">
                      {item.num}
                    </span>
                    <div className="h-px flex-1 bg-[#C5A35A]/25" />
                    <item.icon className="h-6 w-6 text-[#C5A35A]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F2EEE3] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#E2DFD7]/75 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] tracking-[0.2em] uppercase text-[#A88D4E] px-2.5 py-1 border border-[#C5A35A]/25 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <p className="font-serif italic text-sm text-[#A88D4E]">
                — Trusted by hospitals, surgical centres &amp; long-term care —
              </p>
              <p className="eyebrow text-[10px] mt-3">
                Division · Certified Protocols
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================================== */}
      {/* THE FLORENCE EDGE                                        */}
      {/* ======================================================== */}
      <section className="relative py-24 md:py-32 px-5 md:px-8 marble-overlay">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            eyebrow="05 — The Florence Edge"
            title={
              <>
                Three commitments,
                <span className="text-gold-gradient"> held at once.</span>
              </>
            }
          />

          <Reveal delay={0.1}>
            <p className="mt-8 text-base text-[#E2DFD7]/85 leading-[1.85] max-w-3xl mx-auto text-center">
              Any one of these on its own is table stakes. What sets Florence apart
              is holding all three at once — machine precision checked by human
              judgement, scalability engineered into the plant, and logistics that
              never close.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid md:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                roman: "I.",
                icon: Activity,
                title: "Technology & Human Precision",
                body: "Computerized wash dosing, IoT-monitored tunnels, moisture-controlled finishing — paired with trained inspectors at every exit point. Machines deliver repeatability; people deliver judgement. We do not automate the final yes.",
                stats: [
                  ["Inspection", "100% hand-checked"],
                  ["Dosing", "Computerized · traceable"],
                  ["Quality gate", "Dual sign-off"],
                ],
              },
              {
                roman: "II.",
                icon: Layers,
                title: "Strategic Scalability",
                body: "Our infrastructure and operational model were built for rapid expansion. We can onboard large-scale institutional clients and major corporations without disrupting existing service — adding routes, capacity, and dedicated workflows as needed.",
                stats: [
                  ["Onboarding", "30-day enterprise ready"],
                  ["Surge buffer", "30%+ headroom"],
                  ["Expansion", "Multi-site ready"],
                ],
              },
              {
                roman: "III.",
                icon: Truck,
                title: "Round-the-Clock Logistics",
                body: "A dedicated fleet, route-density planning, and a 24/7 dispatch desk mean linen arrives when promised — not when convenient. Night-time deliveries, dawn restocks, and same-day emergency response are all on the table.",
                stats: [
                  ["Operation", "24 / 7 / 365"],
                  ["Fleet", "Dedicated & tracked"],
                  ["Response", "Same-day SLA"],
                ],
              },
            ].map((pillar) => (
              <StaggerItem key={pillar.roman}>
                <div className="gold-top-card p-7 rounded-2xl h-full flex flex-col">
                  <div className="font-serif italic text-lg text-[#C5A35A] mb-2">
                    {pillar.roman}
                  </div>
                  <div className="h-11 w-11 rounded-xl bg-[#C5A35A]/10 border border-[#C5A35A]/30 flex items-center justify-center mb-4">
                    <pillar.icon className="h-5 w-5 text-[#C5A35A]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F2EEE3] mb-3 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#E2DFD7]/75 leading-relaxed mb-5 flex-1">
                    {pillar.body}
                  </p>
                  <ul className="space-y-2 pt-4 border-t border-[#C5A35A]/15">
                    {pillar.stats.map(([k, v]) => (
                      <li
                        key={k}
                        className="flex justify-between items-center text-xs"
                      >
                        <span className="text-[#8A8377] tracking-[0.18em] uppercase">
                          {k}
                        </span>
                        <span className="font-serif italic text-sm text-[#C5A35A]">
                          {v}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CONTACT                                                  */}
      {/* ======================================================== */}
      <section
        id="contact"
        className="relative py-24 md:py-32 px-5 md:px-8 bg-[#0A0A0C] overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C5A35A]/5 blur-[180px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader
            eyebrow="06 — Connect With Us"
            title={
              <>
                Reach the
                <span className="text-gold-gradient"> Florence standard.</span>
              </>
            }
            subtitle="Our client desk responds within the same business day for all commercial enquiries."
            align="center"
          />

          {/* Phone block — prominent */}
          <Reveal delay={0.15}>
            <div className="mt-14 gold-top-card rounded-2xl p-8 md:p-10">
              <div className="eyebrow text-center mb-8">
                Direct Lines · Speak With Us Now
              </div>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                {[
                  { label: "Primary Line", number: "+974 7017 7703", href: "tel:+97470177703" },
                  { label: "Secondary Line", number: "+974 3355 5733", href: "tel:+97433555733" },
                ].map((p) => (
                  <a
                    key={p.number}
                    href={p.href}
                    className="group block p-6 rounded-xl border border-[#C5A35A]/20 hover:border-[#C5A35A]/50 hover:bg-[#C5A35A]/5 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-[#C5A35A]/15 border border-[#C5A35A]/40 flex items-center justify-center group-hover:bg-[#C5A35A]/25 transition-colors">
                        <Phone className="h-4 w-4 text-[#C5A35A]" />
                      </div>
                      <span className="eyebrow text-[10px]">{p.label}</span>
                    </div>
                    <div className="font-serif text-2xl md:text-3xl font-bold text-[#F2EEE3] tracking-wide">
                      <span className="font-serif italic text-base text-[#C5A35A] mr-2">
                        +974
                      </span>
                      {p.number.replace("+974 ", "")}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Other channels */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Reveal delay={0.2}>
              <div className="luxury-card rounded-2xl p-7 h-full">
                <div className="eyebrow mb-3">Management & Operations</div>
                <h3 className="font-serif text-xl font-bold text-[#F2EEE3] mb-4">
                  Florence Laundry — Head Office
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-[#E2DFD7]/80">
                    <MapPin className="h-4 w-4 text-[#C5A35A] mt-0.5 flex-shrink-0" />
                    <span>P.O. Box 23145, Doha — Qatar</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-[#E2DFD7]/80">
                    <Clock className="h-4 w-4 text-[#C5A35A] mt-0.5 flex-shrink-0" />
                    <span>Operating 24 / 7 / 365</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="luxury-card rounded-2xl p-7 h-full">
                <div className="eyebrow mb-3">Additional Channels</div>
                <h3 className="font-serif text-xl font-bold text-[#F2EEE3] mb-4">
                  Reach the Office
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:Info@florence.qa"
                    className="flex items-start gap-3 text-sm text-[#E2DFD7]/80 hover:text-[#C5A35A] transition-colors group"
                  >
                    <Mail className="h-4 w-4 text-[#C5A35A] mt-0.5 flex-shrink-0" />
                    <span className="group-hover:underline">Info@florence.qa</span>
                    <ChevronRight className="h-4 w-4 text-[#C5A35A] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </a>
                  <div className="flex items-start gap-3 text-sm text-[#E2DFD7]/80">
                    <Clock className="h-4 w-4 text-[#C5A35A] mt-0.5 flex-shrink-0" />
                    <span>By Appointment · Same-Day Response</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sign-off */}
          <Reveal delay={0.25}>
            <div className="mt-16 text-center">
              <div className="gold-rule mx-auto mb-6" />
              <p className="font-serif italic text-lg md:text-xl text-[#C5A35A]">
                — Florence Laundry · Industrial scale, hospital standards, luxury finish —
              </p>
              <p className="eyebrow text-[10px] mt-5">Corporate Profile</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FOOTER                                                   */}
      {/* ======================================================== */}
      <footer className="bg-[#08080A] border-t border-[#C5A35A]/15 py-10 px-5 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/florence/logo-icon.png"
              alt="Florence Laundry"
              className="h-8 w-auto"
            />
            <span className="font-serif font-semibold text-sm tracking-[0.18em] text-[#F2EEE3] uppercase">
              Florence Laundry
            </span>
          </div>
          <p className="text-xs text-[#8A8377] tracking-wider text-center">
            P.O. Box 23145, Doha — Qatar &nbsp;·&nbsp; +974 7017 7703 &nbsp;·&nbsp; 24 / 7 / 365
          </p>
          <p className="text-[10px] text-[#8A8377] tracking-[0.3em] uppercase">
            Commercial &amp; Laundry
          </p>
        </div>
      </footer>
    </div>
  );
}
