import Image from "next/image";
import { MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils";

export function GoogleMapEmbed() {
  return (
    <section className="my-10 space-y-8" id="location-map">
      {/* Dual Logo Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border border-primary-200/70 bg-gradient-to-b from-white via-white to-primary-50/40 p-6 sm:p-8 md:p-10 shadow-xl shadow-primary-950/5">
        {/* Shimmer top accent line */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-600 via-signal to-primary-600" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 border border-primary-200/60">
            <MapPin className="h-3.5 w-3.5 text-primary-600" /> Store &amp; Engineering Center
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-navy">
            Visit Shivam Telecom Headquarters
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Experience live 4G &amp; 5G mobile signal booster demonstrations and consult with our technical specialists in person.
          </p>
        </div>

        {/* Dual Logo Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Logo 1: Vertical Official Seal (2.png) */}
          <div className="group relative flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary-400/20 to-signal/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-2xl bg-white p-3 shadow-md ring-2 ring-primary-100/70 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/products/2.png"
                  alt="Shivam Telecom Official Seal"
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <h3 className="mt-5 font-display text-lg font-bold text-navy">
              Official Telecom Brand Seal
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Certified Booster Specialists
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 font-medium text-primary-700">
                <ShieldCheck className="h-3.5 w-3.5 text-primary-600" /> 100% Tested Gear
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Multi-Operator
              </span>
            </div>
          </div>

          {/* Logo 2: Horizontal Landscape Brand (3.png) */}
          <div className="group relative flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative flex items-center justify-center w-full">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-sky-400/20 to-primary-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-36 w-full max-w-[280px] sm:h-44 sm:max-w-[320px] items-center justify-center rounded-2xl bg-white p-3 shadow-md ring-2 ring-primary-100/70 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/products/3.png"
                  alt="Shivam Telecom Landscape Brand"
                  width={280}
                  height={200}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <h3 className="mt-5 font-display text-lg font-bold text-navy">
              Navi Mumbai Service &amp; Support Hub
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Serving Mumbai, Thane &amp; Navi Mumbai
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 font-medium text-slate-700">
                <Clock className="h-3.5 w-3.5 text-primary-600" /> Mon – Sat: 9:30 AM – 7:30 PM
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 font-medium text-sky-700">
                <MapPin className="h-3.5 w-3.5 text-sky-600" /> Turbhe Naka, Vashi
              </span>
            </div>
          </div>
        </div>

        {/* Address & Quick Connect Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary-100 bg-primary-50/40 p-4 sm:p-5">
          <div className="flex items-start gap-3 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-800">
                Official Address
              </p>
              <p className="text-sm font-semibold text-navy leading-snug">
                {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion} – {siteConfig.address.postalCode}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow"
            >
              Open in Maps <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={telLink(siteConfig.phone)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs sm:text-sm font-bold text-navy shadow-sm transition-all hover:bg-muted hover:border-primary-300"
            >
              <Phone className="h-3.5 w-3.5 text-primary-600" /> Call Directly
            </a>
            <a
              href={whatsappLink(siteConfig.whatsapp, "Hi, I would like to visit Shivam Telecom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Google Maps Embed Container */}
      <div className="relative overflow-hidden rounded-3xl border border-primary-200/60 shadow-xl">
        <div className="absolute right-4 top-4 z-10 hidden sm:block">
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-navy shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
          >
            Open in Google Maps <ExternalLink className="h-3.5 w-3.5 text-primary-600" />
          </a>
        </div>
        <iframe
          title={`${siteConfig.businessName} service area map`}
          src={siteConfig.googleMapsEmbedSrc}
          width="100%"
          height="380"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
      </div>
    </section>
  );
}
