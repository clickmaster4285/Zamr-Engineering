import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const services = [
  { num: "01", title: "Civil Engineering", desc: "Precision-engineered civil solutions for transport, urban, and infrastructure projects across NSW.", stop: 0.05, side: "left" },
  { num: "02", title: "Project Verification", desc: "Independent technical assurance — conceptual review, audit, certification, and compliance across the full project lifecycle from design through to delivery.", stop: 0.26, side: "right" },
  { num: "03", title: "Road Infrastructure", desc: "Advanced pavement engineering, geometric road design, and intelligent traffic systems for safer, longer-lasting corridors across NSW.", stop: 0.5, side: "left" },
  { num: "04", title: "Renewable Energy Infrastructure", desc: "Engineering the clean-energy transition — solar farms, wind power, and grid-connection works supporting Australia's renewable future.", stop: 0.74, side: "right" },
  { num: "05", title: "TfNSW Compliance", desc: "Specialist advisory and compliance covering TfNSW standards, approvals, and certification frameworks for road and infrastructure projects.", stop: 0.88, side: "left" },
];

const ROAD_D =
  "M 500 40 C 720 280, 280 520, 500 760 S 720 1240, 500 1480 S 280 1960, 500 2200 S 720 2360, 500 2400";

function Card({
  service,
  index,
  progress,
  topPct,
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
  topPct: number;
}) {
  const window = 0.06;
  const scale = useTransform(
    progress,
    [service.stop - window * 2, service.stop - window, service.stop, service.stop + window, service.stop + window * 2],
    [1, 1.03, 1.1, 1.03, 1],
  );
  const glow = useTransform(progress, [service.stop - window, service.stop, service.stop + window], [0, 1, 0]);
  const borderColor = useTransform(glow, (g) => (g > 0.4 ? "var(--accent)" : "var(--border)"));

  const isLeft = service.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.05 * index }}
      style={{ top: `${topPct}%`, scale, borderColor }}
      className={`absolute ${isLeft ? "left-4 md:left-[4%]" : "right-4 md:right-[4%]"} -translate-y-1/2 w-[78%] md:w-[36%] bg-card/90 backdrop-blur-md border p-6 md:p-8 shadow-2xl`}
    >
      <motion.div style={{ opacity: glow }} className="absolute -inset-px pointer-events-none border border-accent" aria-hidden />
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block w-2 h-2 accent-dot" />
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground tabular-nums">
          {service.num} · Service
        </span>
      </div>
      <h3 className="text-display text-2xl md:text-3xl mb-3 leading-tight">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
    </motion.div>
  );
}

export function WhatWeEngineer() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const progress = useMotionValue(0);
  const [stopYs, setStopYs] = useState<number[]>(() => services.map((s) => s.stop * 2400));
  const [pulse, setPulse] = useState({ xPct: 50, yPct: 1.6 });

  // Reveal length for the drawn path
  const drawLen = useTransform(progress, (p) => pathLen * p);
  const dashOffset = useTransform(progress, (p) => pathLen * (1 - p));

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    setPathLen(len);
    setStopYs(services.map((s) => path.getPointAtLength(s.stop * len).y));

    let frame = 0;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const update = () => {
      frame = 0;
      const section = ref.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
      const clamped = clamp((raw - 0.05) / 1.15);
      const pt = path.getPointAtLength(clamped * len);
      progress.set(clamped);
      setPulse({ xPct: (pt.x / 1000) * 100, yPct: (pt.y / 2400) * 100 });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [progress]);

  return (
    <section ref={ref} id="services" className="relative border-t border-border grid-bg overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-28 pb-16 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our Services</span>
        </div>
        <h2 className="text-display text-5xl md:text-7xl max-w-3xl">What we<br />engineer.</h2>
        <p className="mt-6 max-w-md text-sm md:text-base text-muted-foreground">
          Follow the line — every stop along the way is a discipline we own in-house, from first estimate to final handover.
        </p>
      </div>

      <div className="relative max-w-[1100px] mx-auto" style={{ aspectRatio: "1000 / 2400" }}>
        <svg viewBox="0 0 1000 2400" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <defs>
            <linearGradient id="trace-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* base faint guideline */}
          <path d={ROAD_D} fill="none" stroke="oklch(1 0 0 / 6%)" strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />

          {/* animated revealed trace */}
          <motion.path
            ref={pathRef}
            d={ROAD_D}
            fill="none"
            stroke="url(#trace-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={pathLen || 1}
            style={{ strokeDashoffset: dashOffset }}
            filter="url(#glow)"
          />

          {/* stop nodes */}
          {services.map((s) => {
            if (!pathRef.current || !pathLen) return null;
            const pt = pathRef.current.getPointAtLength(s.stop * pathLen);
            return (
              <g key={s.num}>
                <circle cx={pt.x} cy={pt.y} r="14" fill="var(--accent)" fillOpacity="0.15" />
                <circle cx={pt.x} cy={pt.y} r="6" fill="var(--accent)" stroke="var(--background)" strokeWidth="2" />
              </g>
            );
          })}
        </svg>

        {/* Glowing pulse marker following the path */}
        <motion.div
          className="absolute z-30 pointer-events-none"
          style={{
            left: `${pulse.xPct}%`,
            top: `${pulse.yPct}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            className="relative w-5 h-5 rounded-full bg-accent"
            style={{ boxShadow: "0 0 24px 6px var(--accent)" }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
          </motion.div>
        </motion.div>

        {services.map((s, i) => (
          <Card key={s.num} service={s} index={i} progress={progress} topPct={(stopYs[i] / 2400) * 100} />
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pb-28 pt-8 flex justify-center relative z-10">
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="group inline-flex items-center gap-4 px-8 py-4 border border-foreground text-sm uppercase tracking-[0.28em] hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
        >
          Request a Consultation
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-current transition-transform group-hover:translate-x-1">
            ↗
          </span>
        </motion.a>
      </div>
    </section>
  );
}

