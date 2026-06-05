import { motion } from "framer-motion";

export function CTAFooter() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 border-t border-border grid-bg">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-2.5 h-2.5 accent-dot" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Let's build
            </span>
          </div>
          <h2 className="text-display text-[13vw] md:text-[8vw] leading-[0.9]">
            Start your<br />next project.
          </h2>
          <a
            href="mailto:info@zamreng.com.au"
            className="inline-flex items-center gap-4 mt-12 text-lg md:text-xl border-b border-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
          >
            info@zamreng.com.au
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
