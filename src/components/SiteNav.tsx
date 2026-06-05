import { motion } from "framer-motion";
import zamrLogo from "@/assets/zamr-logo.png";

const links = ["About", "Services", "Projects", "Case Studies", "Careers"];

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-3 backdrop-blur-md bg-background/40 border-b border-border"
    >
      <nav className="flex items-center justify-between max-w-[1600px] mx-auto">
        <a href="/" className="flex items-center gap-2">
          <img src={zamrLogo} alt="ZAMR Engineering" className="h-10 md:h-12 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.18em] border border-border px-4 py-2 hover:bg-accent hover:border-accent transition-all duration-300"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
