import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import teamImg from "@/assets/team-1.jpg";

export function PinnedReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.9, 0.3]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative w-[90vw] h-[80vh] overflow-hidden"
        >
          <img
            src={teamImg}
            alt="Engineer reviewing blueprints"
            width={1600}
            height={1000}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-background"
          />
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
              Our Craft
            </span>
            <h2 className="text-display text-5xl md:text-7xl lg:text-8xl max-w-5xl">
              Engineering precision.<br />
              Built by people.
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
