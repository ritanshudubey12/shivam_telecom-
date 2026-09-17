import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { QuotePopup } from "@/components/popups/QuotePopup";
import { GoogleMapEmbed } from "@/components/sections/GoogleMapEmbed";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-16 lg:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <div className="container mx-auto px-4 py-8">
        <GoogleMapEmbed />
      </div>
      <Footer />
      <MobileStickyBar />
      <WhatsAppFloat />
      <QuotePopup />
    </div>
  );
}
