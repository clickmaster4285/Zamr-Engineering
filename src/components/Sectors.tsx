import { motion } from "framer-motion";
import { useState } from "react";

const sectors = [
  { num: "01", name: "Commercial", desc: "High-rise towers, mixed-use developments, corporate HQs." },
  { num: "02", name: "Healthcare", desc: "Hospitals, research labs, specialty care facilities." },
  { num: "03", name: "Education", desc: "Universities, K-12 campuses, science buildings." },
  { num: "04", name: "Science & Tech", desc: "Data centers, semiconductor fabs, cleanrooms." },
  { num: "05", name: "Residential", desc: "Multi-family, luxury condominiums, affordable housing." },
  { num: "06", name: "Aviation", desc: "Terminals, concourses, runway infrastructure." },
];

export function Sectors() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="sectors" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Sectors
          </span>
        </div>
        <h2 className="text-display text-5xl md:text-7xl max-w-4xl">
          Six sectors.<br />One standard of excellence.
        </h2>
      </motion.div>

      <div className="border-t border-border">
        {sectors.map((s, i) => (
          <motion.a
            key={s.num}
            href="#"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="group block border-b border-border py-8 md:py-10 relative overflow-hidden"
          >
            <motion.div
              animate={{ x: hovered === i ? 20 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-4 items-baseline"
            >
              <span className="col-span-2 md:col-span-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {s.num}
              </span>
              <h3 className="col-span-10 md:col-span-5 text-display text-4xl md:text-6xl">
                {s.name}
              </h3>
              <p className="hidden md:block col-span-5 text-sm text-muted-foreground max-w-md">
                {s.desc}
              </p>
              <span className="hidden md:block col-span-1 text-right text-2xl">→</span>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
