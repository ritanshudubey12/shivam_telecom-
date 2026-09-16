import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { siteConfig } from "@/config/site";
import { services } from "@/config/content";
import { locations } from "@/config/locations";
import { telLink } from "@/lib/utils";

const footerLocations = locations.slice(0, 4);

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white/80">
      <div className="container grid grid-cols-2 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        <div className="col-span-2 lg:col-span-2">
          <SiteLogo dark />
          <div className="mt-4 space-y-2 text-sm">
            <a href={telLink(siteConfig.phone)} className="flex items-center gap-2.5 hover:text-white">
              <Phone className="h-4 w-4 text-primary-300" /> {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 hover:text-white">
              <Mail className="h-4 w-4 text-primary-300" /> {siteConfig.email}
            </a>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
              <span>
                {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion} –{" "}
                {siteConfig.address.postalCode}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Services</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-medium text-primary-300 hover:text-white">
                View all →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Areas We Serve</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLocations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="hover:text-white">
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations/mumbai" className="font-medium text-primary-300 hover:text-white">
                View all →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-4 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
