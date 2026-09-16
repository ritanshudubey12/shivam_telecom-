import type { ComponentType } from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils";
import type { LeadFormInput } from "@/lib/validation";

export function ContactSection({
  source = "WEBSITE_CONTACT_FORM",
  defaultCity,
  defaultRequirementType,
}: {
  source?: LeadFormInput["source"];
  defaultCity?: string;
  defaultRequirementType?: LeadFormInput["requirementType"];
}) {
  return (
    <section className="bg-background py-14 lg:py-20" id="contact">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Improve Your Mobile Connectivity"
          description="Share a few details and our team will reach out to schedule a site assessment."
          align="center"
          className="mx-auto"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          <Card className="reveal relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-2">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-signal to-primary-500 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
            <div className="space-y-4">
              <ContactItem icon={Phone} label="Call Us" value={siteConfig.phoneDisplay} href={telLink(siteConfig.phone)} />
              <ContactItem
                icon={MessageCircle}
                label="WhatsApp"
                value="Chat with our team"
                href={whatsappLink(siteConfig.whatsapp, "Hi, I'd like to enquire about mobile signal booster installation.")}
                external
              />
              <ContactItem icon={Mail} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <ContactItem
                icon={MapPin}
                label="Office Address"
                value={`${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} – ${siteConfig.address.postalCode}`}
                href={siteConfig.googleMapsUrl}
                external
              />
            </div>
          </Card>

          <Card className="reveal [animation-delay:150ms] p-5 transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary-100 hover:shadow-lg lg:col-span-3">
            <LeadForm source={source} defaultCity={defaultCity} defaultRequirementType={defaultRequirementType} />
          </Card>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors duration-200 hover:bg-primary-50/60">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-all duration-200 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-md">
        <Icon className="h-4 w-4" />
      </span>
      <div className="transition-transform duration-200 group-hover:translate-x-0.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-[14.5px] font-semibold text-navy">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {content}
    </a>
  );
}
