import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import img1Asset from "@/assets/build1.png";
import img2Asset from "@/assets/build2.png";
import img3Asset from "@/assets/build3.png";
import img4Asset from "@/assets/build4.png";
const img1 = img1Asset;
const img2 = img2Asset;
const img3 = img3Asset;
const img4 = img4Asset;

const items = [
  {
    title: "The Future of Smart Road Design in Greater Sydney",
    desc: "A reliable set of standards we've refined over decades of building that informs our approach on every project across the country.",
    image: img1,
  },
  {
    title: "Renewable Energy Integration in Civil Infrastructure Projects",
    desc: "Field-tested tools — from drones and laser scanners to robotic total stations — that bring precision to every phase.",
    image: img2,
  },
  {
    title: "Navigating TfNSW Standards: A Comprehensive Guide for 2024",
    desc: "Real-time dashboards and AI-driven analytics turn job-site data into decisions that protect schedule and budget.",
    image: img3,
  },
  {
    title: "Pavement Rehabilitation Strategies for High-Traffic NSW Corridors",
    desc: "Seasoned superintendents and engineers who have built the most complex projects in their markets — and bring that depth to yours.",
    image: img4,
  },
];

import type { MotionValue } from "framer-motion";

function NavItem({
  title,
  index,
  total,
  active,
  scrollYProgress,
  onClick,
}: {
  title: string;
  index: number;
  total: number;
  active: boolean;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fill = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);
  return (
    <li className="border-b border-border">
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left py-5 flex items-center gap-4 group"
      >
        <span
          className={`inline-block w-2.5 h-2.5 transition-colors duration-300 ${
            active ? "bg-accent" : "bg-muted-foreground/40"
          }`}
        />
        <span
          className={`text-lg md:text-xl transition-colors duration-300 ${
            active
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground/80"
          }`}
        >
          {title}
        </span>
      </button>
      <div className="relative h-px bg-border/40 -mt-px">
        <motion.div
          style={{ width: active ? fill : "0%" }}
          className="absolute left-0 top-0 h-px bg-accent"
        />
      </div>
    </li>
  );
}

export function HowWeBuild() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // progress 0..1 across whole section; each item gets 1/n slice
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(items.length - 1, Math.floor(v * items.length));
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="how-we-build"
      className="relative border-t border-border bg-card"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-[1600px] mx-auto w-full px-6 md:px-16 grid grid-cols-12 gap-8 md:gap-12">
          {/* Left: heading + accordion list */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-2.5 h-2.5 accent-dot" />
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Our Approach
              </span>
            </div>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-10 md:mb-14">
              How we build.
            </h2>

            <ul className="space-y-0">
              {items.map((it, i) => (
                <NavItem
                  key={it.title}
                  title={it.title}
                  index={i}
                  total={items.length}
                  active={i === active}
                  scrollYProgress={scrollYProgress}
                  onClick={() => {
                    const el = sectionRef.current;
                    if (!el) return;
                    const top =
                      el.offsetTop +
                      (el.offsetHeight - window.innerHeight) * (i / items.length) +
                      10;
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                />
              ))}
            </ul>
          </div>

          {/* Right: image + description */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 md:col-start-6 flex flex-col">
            <div className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={items[active].image}
                  src={items[active].image}
                  alt={items[active].title}
                  width={1400}
                  height={1000}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="mt-6 md:mt-8 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={items[active].title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {items[active].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
