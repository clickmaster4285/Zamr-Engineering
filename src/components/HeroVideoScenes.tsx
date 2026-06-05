import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import scene1 from "@/assets/scene1.mp4";
import scene3 from "@/assets/scene3.mp4";
import scene4 from "@/assets/scene4.mp4";

const scenes = [
  {
    video: scene1,
    eyebrow: "",
    title: ["Redefining how", "Australia builds"],
    caption: "",
  },
  {
    video: scene3,
    eyebrow: "",
    title: ["Built to", "last centuries"],
    caption: "",
  },
  {
    video: scene4,
    eyebrow: "",
    title: ["Engineering", "human ambition"],
    caption: "",
  },
];

function Scene({
  scene,
  index,
  total,
  progress,
  isActive,
  videoRef,
}: {
  scene: (typeof scenes)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  // Each scene occupies a slice of total scroll progress.
  // It slides in from below during the previous slice, and slides out (up) during its own slice.
  const sliceStart = index / total;
  const sliceEnd = (index + 1) / total;
  const enterStart = Math.max(0, sliceStart - 1 / total);

  // y: from 100% (below screen) -> 0 (in place) -> -30% (parallax up as next slides over)
  const y = useTransform(
    progress,
    index === 0
      ? [0, sliceEnd]
      : [enterStart, sliceStart, sliceEnd],
    index === 0 ? ["0%", "-20%"] : ["100%", "0%", "-20%"]
  );

  // Slight scale down + dim as it gets pushed up
  const scale = useTransform(
    progress,
    [sliceStart, sliceEnd],
    [1, 0.92]
  );
  const dim = useTransform(
    progress,
    [sliceStart, sliceEnd],
    [0, 0.6]
  );

  return (
    <motion.div
      style={{ y, zIndex: index + 1 }}
      className="absolute inset-0 overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          ref={videoRef}
          src={scene.video}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dim overlay when getting pushed up */}
        <motion.div
          style={{ opacity: dim }}
          className="absolute inset-0 bg-background pointer-events-none"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-[1600px] mx-auto w-full pt-20">
        {scene.eyebrow ? (
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-2.5 h-2.5 accent-dot" />
            <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {scene.eyebrow}
            </span>
          </div>
        ) : null}
        <h2 className="text-display text-[13vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.92]">
          {scene.title.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                initial={false}
                animate={{ y: isActive ? 0 : "110%" }}
                transition={{
                  delay: isActive ? 0.15 + li * 0.1 : 0,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        {scene.caption ? (
          <p className="mt-6 text-sm md:text-base text-muted-foreground tracking-wide max-w-md">
            {scene.caption}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function HeroVideoScenes() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Clamp so the last scene stays active at p === 1
    const idx = Math.min(scenes.length - 1, Math.floor(p * scenes.length + 0.0001));
    if (idx !== active) setActive(idx);
  });

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) v.play().catch(() => {});
      else v.pause();
    });
  }, [active]);

  return (
    <section ref={ref} className="relative" style={{ height: `${scenes.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden grid-bg">
        {scenes.map((s, i) => (
          <Scene
            key={i}
            scene={s}
            index={i}
            total={scenes.length}
            progress={scrollYProgress}
            isActive={active === i}
            videoRef={(el) => {
              videoRefs.current[i] = el;
            }}
          />
        ))}

        {/* Floating accents (sit above all scenes) */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {[
            { top: "14%", right: "10%", size: 22 },
            { bottom: "28%", left: "8%", size: 18 },
            { top: "42%", right: "18%", size: 80 },
          ].map((s, i) => (
            <span
              key={i}
              className="absolute border border-border opacity-40"
              style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, width: s.size, height: s.size }}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8 border-t border-border pt-6 z-40 bg-gradient-to-t from-background/90 to-transparent">
          <div className="max-w-[1600px] mx-auto flex items-end justify-between gap-6">
            <div className="flex gap-3">
              {scenes.map((_, i) => (
                <div key={i} className="relative h-px w-12 md:w-20 bg-border overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-accent origin-left"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.22em]"
            >
              Scroll
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
