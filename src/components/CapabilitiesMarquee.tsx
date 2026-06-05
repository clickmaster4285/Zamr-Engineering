import { motion } from "framer-motion";

const tags = [
  "Tilt-up Concrete", "Steel Erection", "MEP Coordination", "Site Grading",
  "Foundations", "Curtain Wall", "Seismic Retrofit", "Precast Panels",
  "BIM / VDC", "Mass Timber", "Deep Excavation", "Bridge Decks",
];

const row1 = [...tags, ...tags];
const row2 = [...tags.slice().reverse(), ...tags.slice().reverse()];

export function CapabilitiesMarquee() {
  return (
    <section className="relative border-t border-border overflow-hidden py-24 md:py-28 bg-background">
      <div className="max-w-[1500px] mx-auto px-6 md:px-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Capabilities</span>
        </div>
        <h2 className="text-display text-4xl md:text-6xl max-w-3xl leading-[1.05]">
          A full-stack builder<br />
          <span className="text-accent">from dirt to ribbon-cut.</span>
        </h2>
      </div>

      <div className="space-y-5">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {row1.map((t, i) => (
              <span
                key={i}
                className="shrink-0 px-7 py-4 rounded-full border border-border bg-card text-sm md:text-base text-foreground/90 whitespace-nowrap hover:border-accent transition-colors"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {row2.map((t, i) => (
              <span
                key={i}
                className="shrink-0 px-7 py-4 rounded-full border border-accent/30 bg-accent/5 text-sm md:text-base text-foreground/90 whitespace-nowrap"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
