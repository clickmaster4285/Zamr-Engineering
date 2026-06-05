import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import engineersImg from "@/assets/about-engineers.jpg";

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function AboutUs() {
  return (
    <section id="about" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto border-t border-border">
      <div className="grid grid-cols-12 gap-8 md:gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="col-span-12 md:col-span-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2.5 h-2.5 accent-dot" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              About Us
            </span>
          </div>
          <h2 className="text-display text-4xl md:text-5xl leading-tight">
            Built on<br />Precision<br />& Reliability.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="col-span-12 md:col-span-7 md:col-start-6"
        >
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8">
            ZAMR Engineering is a Sydney-based civil engineering consultancy delivering
            precision-led infrastructure solutions across New South Wales and beyond. Founded
            on a commitment to technical excellence, we partner with government bodies,
            developers, and industry leaders to engineer infrastructure that endures.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Our approach integrates rigorous engineering methodology with forward-looking
            design thinking — producing outcomes that are structurally sound, environmentally
            considered, and technically innovative. Every project is an opportunity to advance
            what infrastructure can achieve.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden mb-20 group"
      >
        <img
          src={engineersImg}
          alt="Ironforge engineers reviewing plans on site"
          width={1280}
          height={1600}
          loading="lazy"
          className="w-full h-[420px] md:h-[560px] object-cover transition-transform duration-[1500ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <span className="text-xs uppercase tracking-[0.22em] text-accent">
            On every site
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-t border-border">
        {[
          { v: 150, suffix: "+", l: "Projects delivered" },
          { v: 12, suffix: "+", l: "Years of experience" },
          { v: 98, suffix: "%", l: "Compliance rate" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="bg-background p-8 md:p-10"
          >
            <div className="text-display text-5xl md:text-6xl mb-3">
              <Counter to={s.v} suffix={s.suffix} />
            </div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
