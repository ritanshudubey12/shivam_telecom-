import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { NetworkProviders } from "@/components/sections/NetworkProviders";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { LocalSeoSection } from "@/components/sections/LocalSeoSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { faqs } from "@/config/content";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Network Booster in Mumbai",
  description: siteConfig.seoDefaults.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SolutionSection />
      <ServicesGrid limit={8} />
      <ProductsPreview />
      <NetworkProviders />
      <IndustriesGrid />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <LocalSeoSection />
      <FaqSection items={faqs.slice(0, 6)} />
      <ContactSection source="WEBSITE_HERO_FORM" />
    </>
  );
}
