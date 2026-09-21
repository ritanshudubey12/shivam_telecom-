import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Wrench, CheckCircle2, Phone, ArrowRight, Radio } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { telLink } from "@/lib/utils";

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

          {/* Shivam Telecom Flagship Brand Card */}
          <div className="mt-14 sm:max-w-3xl sm:mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-primary-200/70 bg-gradient-to-b from-white via-white to-primary-50/30 p-8 sm:p-10 shadow-2xl shadow-primary-950/10 backdrop-blur-md transition-all duration-300 hover:border-primary-300">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-600 via-signal to-primary-600" />

              <div className="flex flex-col items-center text-center">
                {/* Dedicated Illuminated Emblem for Logo */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary-400/25 via-primary-300/15 to-signal/25 blur-2xl" />
                  <div className="relative flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-3xl bg-white p-3 shadow-2xl ring-4 ring-primary-100/70 transition-transform duration-300 hover:scale-105">
                    <Image
                      src="/images/products/2.png"
                      alt="Shivam Telecom official mobile network booster service seal"
                      width={240}
                      height={240}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-2xl font-black text-navy sm:text-3xl">
                  {siteConfig.businessName}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600">
                  Engineering Leadership &amp; On-Site Telecom Operations
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-200/60 px-3.5 py-1 text-xs font-semibold text-primary-800 shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary-600" /> Authorized Telecom Partner
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Mumbai, Navi Mumbai &amp; Thane
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/60 px-3.5 py-1 text-xs font-semibold text-amber-800 shadow-sm">
                    <Radio className="h-3.5 w-3.5 text-amber-600" /> Jio • Airtel • Vi • BSNL
                  </span>
                </div>

                <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
                  Under the hands-on leadership of <strong className="font-semibold text-navy">Ravendra Mishra</strong> and{" "}
                  <strong className="font-semibold text-navy">Shivam Mishra</strong>, our specialized field engineers deliver certified, high-gain 4G &amp; 5G mobile signal booster solutions with detailed RF spectrum testing and clean in-building installations.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg hover:scale-105"
                  >
                    Request Free Site Survey <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={telLink(siteConfig.phone)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all hover:bg-muted hover:border-primary-300"
                  >
                    <Phone className="h-4 w-4 text-primary-600" /> Call Directly: {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  );
}
