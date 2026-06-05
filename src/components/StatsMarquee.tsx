import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "40+", label: "Years building" },
  { value: "$5B", label: "Annual revenue" },
  { value: "2,500", label: "Team members" },
  { value: "1,000+", label: "Projects delivered" },
];

export function StatsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section ref={ref} className="py-32 overflow-hidden border-y border-border">
      <motion.div style={{ x }} className="flex gap-16 whitespace-nowrap">
        {[...stats, ...stats].map((s, i) => (
          <div key={i} className="flex items-baseline gap-6 shrink-0">
            <span className="text-display text-[10vw] md:text-[8vw] leading-none">
              {s.value}
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {s.label}
            </span>
            <span className="inline-block w-2 h-2 accent-dot mx-8" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
