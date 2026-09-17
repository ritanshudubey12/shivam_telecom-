import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, Signal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07122e] py-20 lg:py-28">
      {/* Background Video, clear and high quality */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/videos/Data_streams_moving_through_tunnel_20260916155512.mp4"
            type="video/mp4"
          />
        </video>
        {/* Light overlays that keep the video visible while preserving text contrast */}
        <div className="absolute inset-0 bg-[#07122e]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07122e]/90 via-transparent to-[#07122e]/50" />
      </div>

      {/* Decorative dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Centered Hero Content */}
      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <div className="reveal">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
            <Signal className="h-3.5 w-3.5 text-primary-300" />
            Serving Vashi, Navi Mumbai &amp; Thane
          </div>

          {/* 2-Line Heading in Center */}
          <h1 className="mt-6 text-balance font-display text-[32px] font-extrabold leading-[1.15] text-white sm:text-[42px] md:text-[48px] lg:text-[52px]">
            <span className="block">{siteConfig.businessName}</span>
            <span className="block text-white/95">
              Mobile Network &amp; Signal Booster Installation in Navi Mumbai
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="mx-auto mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-relaxed text-white/80">
            Reliable 4G and 5G mobile signal solutions for homes, offices, commercial
            buildings, warehouses, hotels and industrial spaces across Navi Mumbai, Mumbai and Thane.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto px-7 shadow-lg shadow-primary-500/25">
              <Link href="/contact">
                Get Free Site Survey <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-7 border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            >
              <a href={telLink(siteConfig.phone)}>
                <Phone className="h-4 w-4 mr-1.5" /> Call Now
              </a>
            </Button>
          </div>

          {/* Contact Details row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/80">
            <a
              href={telLink(siteConfig.phone)}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4 text-primary-300" /> {siteConfig.phoneDisplay}
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a
              href={whatsappLink(
                siteConfig.whatsapp,
                "Hi, I'd like a free site survey for a mobile signal booster."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-success" /> Chat on WhatsApp
            </a>
          </div>

          {/* Office Address */}
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-4 inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary-300" />
            <span>
              {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality},{" "}
              {siteConfig.address.addressRegion} – {siteConfig.address.postalCode}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
