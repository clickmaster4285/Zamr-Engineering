import { motion } from "framer-motion";

const insights = [
  { title: "Crane Lifts", metric: "1.2M", unit: "tons / yr", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop", from: { x: -80, y: -40 }, span: "md:row-span-2" },
  { title: "Live Sites", metric: "84", unit: "active builds", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop", from: { x: 80, y: -60 }, span: "" },
  { title: "Engineers", metric: "2,500", unit: "in-house", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80&auto=format&fit=crop", from: { x: -60, y: 60 }, span: "" },
  { title: "Concrete", metric: "320k", unit: "m³ / yr", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop", from: { x: 60, y: 60 }, span: "" },
  { title: "Skyline", metric: "120+", unit: "towers shaped", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80&auto=format&fit=crop", from: { x: -90, y: 20 }, span: "md:row-span-2" },
  { title: "Safety", metric: "0.04", unit: "incident rate", img: "https://images.unsplash.com/photo-1590725140246-20acdee442be?w=800&q=80&auto=format&fit=crop", from: { x: 90, y: -20 }, span: "" },
  { title: "On Budget", metric: "98%", unit: "delivery", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop", from: { x: -40, y: 80 }, span: "" },
  { title: "Structures", metric: "1,000+", unit: "delivered", img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80&auto=format&fit=crop", from: { x: 50, y: 80 }, span: "" },
];

export function InsightsCards() {
  return (
    <section className="relative border-t border-border overflow-hidden py-24 md:py-32 grid-bg">
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2.5 h-2.5 accent-dot" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Insights</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <h2 className="text-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
            The numbers behind<br />
            <span className="text-accent">every build.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-sm">
            A snapshot of what flows through our sites every single day — from tonnage moved to towers topped out.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {insights.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: c.from.x, y: c.from.y, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05, type: "spring", stiffness: 90, damping: 16 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card ${c.span}`}
            >
              <div
                className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url(${c.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />

              <div className="relative h-full w-full p-5 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">{c.title}</span>
                </div>
                <div>
                  <div className="text-display text-3xl md:text-4xl leading-none text-foreground">{c.metric}</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{c.unit}</div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
