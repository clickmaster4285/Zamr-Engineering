import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Pre-Construction",
    desc: "Feasibility studies, cost modeling, site analysis, and constructibility reviews to set every project up for success.",
  },
  {
    num: "02",
    title: "General Contracting",
    desc: "End-to-end project delivery with rigorous safety, scheduling, and quality control across every trade.",
  },
  {
    num: "03",
    title: "Design-Build",
    desc: "Integrated architecture, engineering, and construction under one accountable team — faster, leaner, smarter.",
  },
  {
    num: "04",
    title: "Construction Management",
    desc: "Owner-side oversight, risk mitigation, and transparent reporting from groundbreaking to ribbon cutting.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="mb-20 max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Services
          </span>
        </div>
        <h2 className="text-display text-5xl md:text-7xl">
          What we deliver.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {services.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="bg-background p-10 md:p-12 group hover:bg-card transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {s.num}
              </span>
              <span className="text-xl text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-500">
                →
              </span>
            </div>
            <h3 className="text-display text-3xl md:text-4xl mb-4">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
