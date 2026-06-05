import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import p1Asset from "@/assets/project1.png";
import p2Asset from "@/assets/project2.png";
import p3Asset from "@/assets/project3.png";
const p1 = p1Asset;
const p2 = p2Asset;
const p3 = p3Asset;

const projects = [
  { img: p1, name: "Metropolitan Bridge Rehabilitation", sector: "Infrastructure", year: "2025", loc: "Sydney, NSW" },
  { img: p2, name: "Hunter Valley Renewable Energy Hub", sector: "Energy", year: "2024", loc: "Hunter Valley, NSW" },
  { img: p3, name: "Western Sydney Infrastructure Corridor", sector: "Infrastructure", year: "2024", loc: "Western Sydney, NSW" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.article
      ref={ref}
      style={{ y }}
      className={`flex flex-col gap-4 ${index % 2 === 1 ? "md:mt-32" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-card">
        <motion.img
          src={project.img}
          alt={project.name}
          width={1280}
          height={1600}
          loading="lazy"
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-display text-2xl md:text-3xl">{project.name}</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">
            {project.sector} · {project.loc}
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {project.year}
        </span>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-between mb-20 border-b border-border pb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2.5 h-2.5 accent-dot" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Selected work
            </span>
          </div>
          <h2 className="text-display text-5xl md:text-7xl">
            Projects that<br />shape skylines.
          </h2>
        </div>
        <a
          href="#all"
          className="hidden md:inline-block text-xs uppercase tracking-[0.22em] border-b border-border pb-1 hover:border-accent transition-colors"
        >
          View all projects →
        </a>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
