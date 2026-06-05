import { motion } from "framer-motion";

const steps = [
  { num: "Step 01", title: "Discover", desc: "We listen, study the site, and align on vision, budget, and timeline." },
  { num: "Step 02", title: "Design", desc: "Architects and engineers shape a buildable, beautiful solution." },
  { num: "Step 03", title: "Build", desc: "Self-perform crews and trusted trades execute with precision daily." },
  { num: "Step 04", title: "Deliver", desc: "We commission, train, and stand behind the work for the long haul." },
];

export function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Our Process
          </span>
        </div>
        <h2 className="text-display text-5xl md:text-7xl max-w-4xl">
          A disciplined<br />path from idea<br />to ribbon cutting.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="relative"
          >
            <div className="border-t border-border pt-6">
              <div className="text-xs uppercase tracking-[0.22em] text-accent mb-6">
                {s.num}
              </div>
              <h3 className="text-display text-3xl md:text-4xl mb-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
