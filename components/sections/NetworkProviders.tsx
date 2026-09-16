import { SectionHeading } from "./SectionHeading";
import { TowerIcon } from "@/components/icons/TowerIcon";
import { networkProviders } from "@/config/content";

export function NetworkProviders() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="container grid gap-10 lg:grid-cols-[auto,1fr] lg:items-center lg:gap-14">
        <div className="mx-auto flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-primary-50 sm:h-48 sm:w-48">
          <TowerIcon className="h-28 w-28 sm:h-36 sm:w-36" />
        </div>

        <div>
          <SectionHeading
            eyebrow="Network Compatibility"
            title="Solutions for Major Mobile Networks"
            description="Solutions may be available for compatible network bands and local signal conditions across these operators. Compatibility is confirmed during your site survey."
            align="center"
            className="mx-auto lg:mx-0 lg:text-left"
          />

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 lg:mx-0">
            {networkProviders.map((provider) => (
              <div
                key={provider.slug}
                className="flex h-24 items-center justify-center rounded-2xl border border-border bg-muted/40 font-display text-lg font-extrabold text-navy"
              >
                {provider.name}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-muted-foreground lg:mx-0 lg:text-left">
            Logos and trademarks belong to their respective owners. This does not imply
            endorsement or official partnership.
          </p>
        </div>
      </div>
    </section>
  );
}
