import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { siteConfig } from "@/config/site";
import { services } from "@/config/content";
import { locations } from "@/config/locations";
import { telLink, whatsappLink } from "@/lib/utils";

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
          {(siteConfig.social.facebook || siteConfig.social.instagram || siteConfig.whatsapp) && (
            <div className="mt-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Follow us on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition-all duration-200 hover:scale-110 hover:brightness-110"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Follow us on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md transition-all duration-200 hover:scale-110 hover:brightness-110"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {siteConfig.whatsapp && (
                  <a
                    href={whatsappLink(
                      siteConfig.whatsapp,
                      "Hi Shivam Telecom, I would like to enquire about your mobile signal booster installation services."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="Chat with us on WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-all duration-200 hover:scale-110 hover:brightness-110"
                  >
                    <svg
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
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
              <Link href="/locations" className="font-medium text-primary-300 hover:text-white">
                View all areas →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Company &amp; Guides</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
            <li><Link href="/resources" className="hover:text-white">Resources &amp; Guides</Link></li>
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
