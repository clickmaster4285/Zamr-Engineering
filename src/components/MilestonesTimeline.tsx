import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "2008", title: "Founded", desc: "Started as a five-engineer estimation studio.", metric: "5", unit: "people" },
  { year: "2013", title: "First Tower", desc: "Topped out our first 40-story mixed-use build.", metric: "40", unit: "stories" },
  { year: "2017", title: "National Reach", desc: "Opened offices across four major regions.", metric: "12", unit: "states" },
  { year: "2021", title: "Net-Zero Mandate", desc: "Committed every new project to a low-carbon path.", metric: "100%", unit: "low-carbon" },
  { year: "2026", title: "Today", desc: "Two thousand engineers, one continent-wide pipeline.", metric: "2.5k", unit: "engineers" },
];

export function MilestonesTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative border-t border-border overflow-hidden py-24 md:py-32 grid-bg">
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Milestones</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <h2 className="text-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
            Eighteen years.<br />
            <span className="text-accent">One steady climb.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-sm">
            From a small estimation studio to a national civil and construction firm — every step earned on the jobsite.
          </p>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical track */}
          <div className="absolute top-0 bottom-0 left-3 md:left-1/2 md:-translate-x-1/2 w-px bg-border" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-3 md:left-1/2 md:-translate-x-1/2 w-px bg-accent shadow-[0_0_12px_var(--accent)]"
          />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 items-center`}
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 + 0.2, type: "spring" }}
                    className="absolute left-3 md:left-1/2 -translate-x-1/2 top-2 z-10"
                  >
                    <div className="relative w-4 h-4 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]">
                      <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className={`pl-10 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-accent mb-2 tabular-nums">{m.year}</div>
                    <h3 className="text-display text-2xl md:text-4xl mb-3 leading-tight">{m.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground max-w-sm md:max-w-none md:inline-block">{m.desc}</p>
                  </div>

                  {/* Metric panel */}
                  <div className={`hidden md:flex ${isLeft ? "md:col-start-2 md:pl-12 justify-start" : "md:col-start-1 md:row-start-1 md:pr-12 justify-end"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="inline-flex flex-col items-start gap-1 border border-border bg-card/80 backdrop-blur-md px-6 py-5 rounded-xl min-w-[180px]"
                    >
                      <div className="text-display text-4xl md:text-5xl leading-none text-foreground">{m.metric}</div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{m.unit}</div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
