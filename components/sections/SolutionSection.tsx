import Image from "next/image";
import { Radio, Cable, Zap, Wifi, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { icon: Radio, label: "Outdoor Antenna", description: "Captures existing mobile signal from nearby towers." },
  { icon: Cable, label: "Signal Cable", description: "Low-loss cable carries the signal to the amplifier." },
  { icon: Zap, label: "Booster / Amplifier", description: "Amplifies the captured signal for indoor distribution." },
  { icon: Wifi, label: "Indoor Antenna", description: "Broadcasts the boosted signal inside your space." },
  { icon: CheckCircle2, label: "Improved Coverage", description: "More consistent indoor calls and data across the covered area." },
];

export function SolutionSection() {
  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="The Solution"
          title="Professional Mobile Signal Booster Solutions"
          description="A booster system works in five straightforward stages, engineered around your building's actual signal conditions."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
          <div className="relative h-36 w-full sm:h-44 md:h-52">
            <Image
              src="/images/system-diagram.svg"
              alt="Diagram showing a mobile signal booster system: outdoor antenna, cable, amplifier, indoor antenna, and improved indoor coverage"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="group rounded-xl border border-border bg-white p-3.5 text-center transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md sm:text-left"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white sm:mx-0">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="mt-2.5 block font-display text-[11px] font-extrabold tracking-wide text-primary-600">
                  STEP 0{i + 1}
                </span>
                <p className="mt-0.5 text-sm font-semibold text-navy">{step.label}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] text-muted-foreground">
          Actual performance depends on outdoor signal availability, building construction and
          operator network conditions. A site survey confirms feasibility for your property.
        </p>
      </div>
    </section>
  );
}
