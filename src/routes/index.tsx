import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { HeroVideoScenes } from "@/components/HeroVideoScenes";
import { AboutUs } from "@/components/AboutUs";
import { WhatWeEngineer } from "@/components/WhatWeEngineer";


import { HowWeBuild } from "@/components/HowWeBuild";
import { PinnedReveal } from "@/components/PinnedReveal";
import { Sectors } from "@/components/Sectors";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { WhyUs } from "@/components/WhyUs";
import { CTAFooter } from "@/components/CTAFooter";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAMR Engineering — Redefining how Australia builds" },
      {
        name: "description",
        content:
          "ZAMR Engineering is a civil engineering and construction firm building landmark infrastructure projects across Australia.",
      },
      { property: "og:title", content: "ZAMR Engineering — Redefining how Australia builds" },
      {
        property: "og:description",
        content: "National civil engineering and construction firm.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <SiteNav />
      <HeroVideoScenes />
      <AboutUs />
      <WhatWeEngineer />


      <HowWeBuild />
      <PinnedReveal />
      <Sectors />
      <Process />
      <Projects />
      <WhyUs />
      <CTAFooter />
      <SiteFooter />
    </main>
  );
}
