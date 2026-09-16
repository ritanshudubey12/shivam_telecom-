import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.businessName}, a Mumbai-based mobile network booster installation service for homes, offices and industrial spaces.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <PageHero
        eyebrow="About Us"
        title={`About ${siteConfig.businessName}`}
        description="We help Mumbai homes and businesses get reliable indoor mobile coverage through assessment-led, professionally installed signal booster systems."
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container max-w-3xl space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
          <p>
            {siteConfig.businessName} provides mobile network and signal booster installation
            services across Mumbai, Navi Mumbai and Thane. We work with homes, offices,
            commercial buildings, factories, warehouses, hotels and hospitals — anywhere indoor
            mobile coverage falls short of what&apos;s available outdoors.
          </p>
          <p>
            Our approach starts with understanding a property before recommending anything.
            Building material, floor level, distance from the nearest tower and existing outdoor
            signal all affect what a booster system can realistically achieve indoors — which is
            why a site survey comes before any quotation.
          </p>
          <p>
            We install and configure systems for single network or multi-network coverage where
            feasible, and provide ongoing troubleshooting and maintenance support after
            installation. If a booster system isn&apos;t the right fit for a particular space, we
            say so rather than recommending an oversized or unsuitable setup.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 via-muted/30 to-background py-16 lg:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-signal/10 blur-[100px]" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Our Team"
            title="Team Leader"
            description="The person behind every site survey, installation and support call."
            align="center"
            className="mx-auto"
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:max-w-3xl sm:mx-auto">
            <figure className="group relative overflow-hidden rounded-3xl shadow-xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/about-team-1.jpg"
                  alt={`${siteConfig.businessName} — Team Leader`}
                  fill
                  sizes="(min-width: 640px) 420px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/25">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  Team Leader
                </span>
                <p className="mt-2 font-display text-xl font-bold text-white">Ravendra Mishra</p>
                <p className="text-[13px] text-white/70">Every site survey &amp; support call</p>
              </figcaption>
            </figure>

            <figure className="group relative overflow-hidden rounded-3xl shadow-xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/about-team-2.jpg"
                  alt={`${siteConfig.businessName} — on-site installation`}
                  fill
                  sizes="(min-width: 640px) 420px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/25">
                <Wrench className="h-4.5 w-4.5" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  Team Leader
                </span>
                <p className="mt-2 font-display text-xl font-bold text-white">Shivam Mishra</p>
                <p className="text-[13px] text-white/70">Hands-on setup &amp; site surveys</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  );
}
