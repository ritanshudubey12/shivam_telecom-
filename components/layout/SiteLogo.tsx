import Link from "next/link";
import { TowerIcon } from "@/components/icons/TowerIcon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5 sm:gap-3 shrink-0", className)}
      aria-label={`${siteConfig.businessName} — Home`}
    >
      <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-primary-50/90 shadow-sm transition-transform group-hover:scale-105">
        <TowerIcon className="h-7 w-7 sm:h-7.5 sm:w-7.5" />
      </span>
      <span className="flex flex-col justify-center leading-tight">
        <span
          className={cn(
            "font-display text-[17px] sm:text-[18px] font-extrabold tracking-tight",
            dark ? "text-white" : "text-navy"
          )}
        >
          {siteConfig.businessName}
        </span>
        <span
          className={cn(
            "text-[11px] sm:text-[11.5px] font-medium tracking-tight text-muted-foreground",
            dark && "text-white/70"
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
