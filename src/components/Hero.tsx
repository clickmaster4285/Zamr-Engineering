import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-construction.jpg";

const words = ["Redefining", "how", "America", "builds"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.05]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden grid-bg pt-24"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ opacity: imageOpacity, scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Construction site at golden hour"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      </motion.div>

      {/* Floating square accents */}
      {[
        { top: "12%", left: "32%", size: 14, delay: 0.2 },
        { top: "18%", right: "8%", size: 22, delay: 0.4 },
        { bottom: "30%", left: "10%", size: 18, delay: 0.6 },
        { bottom: "20%", right: "20%", size: 80, delay: 0.8 },
        { top: "40%", right: "12%", size: 40, delay: 1.0 },
      ].map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: s.delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute border border-border"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
          }}
        />
      ))}

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col justify-center px-6 md:px-16 max-w-[1600px] mx-auto w-full"
      >
        <h1 className="text-display text-[14vw] md:text-[9.5vw] lg:text-[8vw] leading-[0.9]">
          {words.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8 flex items-end justify-between border-t border-border pt-6 max-w-[1600px] mx-auto"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-3 h-3 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Proud to be America's contractor
          </span>
        </div>
        <motion.a
          href="#sectors"
          className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.22em]"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Explore
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
