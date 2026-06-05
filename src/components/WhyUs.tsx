import { motion } from "framer-motion";

const points = [
  {
    k: "Safety first",
    v: "An EMR consistently below industry average — because every worker goes home.",
  },
  {
    k: "Self-perform strength",
    v: "In-house concrete, steel, and interiors crews give us schedule and quality control others can't match.",
  },
  {
    k: "Built sustainably",
    v: "LEED, WELL, and net-zero expertise woven into every phase of design and construction.",
  },
  {
    k: "Owner-aligned",
    v: "Transparent budgets, open-book contracts, and one team accountable from day one to handover.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="py-32 px-6 md:px-16 border-t border-border bg-card"
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="col-span-12 md:col-span-5"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2.5 h-2.5 accent-dot" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Why ZAMR Engineering
            </span>
          </div>
          <h2 className="text-display text-4xl md:text-6xl leading-tight">
            The difference is in how we build.
          </h2>
        </motion.div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-px bg-border">
          {points.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-card py-8 grid grid-cols-12 gap-4 items-start"
            >
              <h3 className="col-span-12 md:col-span-4 text-display text-xl md:text-2xl">
                {p.k}
              </h3>
              <p className="col-span-12 md:col-span-8 text-base text-muted-foreground leading-relaxed">
                {p.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
