import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import zamrLogo from "@/assets/zamr-logo.png";

const quickLinks = ["About", "Projects", "Case Studies", "Insights", "Careers", "Contact"];
const services = [
  "Planning & Design",
  "Project Management",
  "Project Verification",
  "Buildings Services",
  "Other Services",
];

export function SiteFooter() {
  return (
    <footer className="relative py-20 px-6 md:px-16 border-t border-border bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1600px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <img src={zamrLogo} alt="ZAMR Engineering" className="h-16 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Specialist civil engineering consultancy delivering precision and competence
              in infrastructure projects across Australia.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-border hover:bg-accent hover:border-accent transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] mb-6 text-foreground">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#sectors" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] mb-6 text-foreground">Contact Info</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Sydney, New South Wales, Australia</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:info@zamreng.com.au" className="hover:text-accent transition-colors">
                  info@zamreng.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="tel:+61234067899" className="hover:text-accent transition-colors">
                  +61 2 3406 7899
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>© {new Date().getFullYear()} ZAMR Engineering. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
