import type { ComponentType } from "react";
import {
  Radio,
  Cpu,
  AlertTriangle,
  SignalHigh,
  Zap,
  Home,
  Briefcase,
  Factory,
  ArrowDownCircle,
  Wrench,
  Wifi,
  Building2,
  Smartphone,
  BarChart3,
  Layers,
  Compass,
  Activity,
  Sliders,
  CheckSquare,
  ShoppingBag,
} from "lucide-react";

export interface BlogVisualConfig {
  icon: ComponentType<{ className?: string }>;
  label: string;
  gradient: string;
  iconBg: string;
  glowColor: string;
}

const slugVisualMap: Record<string, BlogVisualConfig> = {
  "mobile-network-booster-guide": {
    icon: Radio,
    label: "COMPLETE BOOSTER GUIDE",
    gradient: "from-[#0a1338] via-[#102a6b] to-[#1f47dd]",
    iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    glowColor: "rgba(31, 71, 221, 0.35)",
  },
  "how-mobile-signal-booster-works": {
    icon: Cpu,
    label: "RF AMPLIFICATION CYCLE",
    gradient: "from-[#0a1338] via-[#1e1b4b] to-[#4338ca]",
    iconBg: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
    glowColor: "rgba(67, 56, 202, 0.35)",
  },
  "why-mobile-signal-is-weak-indoors": {
    icon: AlertTriangle,
    label: "INDOOR DEAD ZONES & RCC",
    gradient: "from-[#0a1338] via-[#2e1030] to-[#701a75]",
    iconBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40",
    glowColor: "rgba(112, 26, 117, 0.35)",
  },
  "4g-signal-booster-guide": {
    icon: SignalHigh,
    label: "4G LTE & VOLTE BANDS",
    gradient: "from-[#0a1338] via-[#0c2f42] to-[#0284c7]",
    iconBg: "bg-sky-500/20 text-sky-300 border-sky-400/40",
    glowColor: "rgba(2, 132, 199, 0.35)",
  },
  "5g-signal-booster-guide": {
    icon: Zap,
    label: "5G N78 & N28 SPECTRUM",
    gradient: "from-[#0a1338] via-[#24133b] to-[#7c3aed]",
    iconBg: "bg-violet-500/20 text-violet-300 border-violet-400/40",
    glowColor: "rgba(124, 58, 237, 0.35)",
  },
  "mobile-signal-booster-for-home": {
    icon: Home,
    label: "APARTMENTS & VILLAS",
    gradient: "from-[#0a1338] via-[#0a3328] to-[#0d9488]",
    iconBg: "bg-teal-500/20 text-teal-300 border-teal-400/40",
    glowColor: "rgba(13, 148, 136, 0.35)",
  },
  "mobile-signal-booster-for-office": {
    icon: Briefcase,
    label: "CORPORATE WORKSPACES",
    gradient: "from-[#0a1338] via-[#172554] to-[#2563eb]",
    iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    glowColor: "rgba(37, 99, 235, 0.35)",
  },
  "mobile-signal-solution-factories-warehouses": {
    icon: Factory,
    label: "FACTORIES & MIDC UNITS",
    gradient: "from-[#0a1338] via-[#2e1d10] to-[#b45309]",
    iconBg: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    glowColor: "rgba(180, 83, 9, 0.35)",
  },
  "improve-mobile-signal-in-basement": {
    icon: ArrowDownCircle,
    label: "SUB-LEVEL & PARKING BAYS",
    gradient: "from-[#0a1338] via-[#1e293b] to-[#475569]",
    iconBg: "bg-slate-500/20 text-slate-300 border-slate-400/40",
    glowColor: "rgba(71, 85, 105, 0.35)",
  },
  "mobile-signal-booster-installation-guide": {
    icon: Wrench,
    label: "INSTALLATION BLUEPRINT",
    gradient: "from-[#0a1338] via-[#14234b] to-[#1d4ed8]",
    iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    glowColor: "rgba(29, 78, 216, 0.35)",
  },
  "mobile-signal-booster-vs-wifi-calling": {
    icon: Wifi,
    label: "VOWIFI VS CELLULAR",
    gradient: "from-[#0a1338] via-[#083344] to-[#0891b2]",
    iconBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    glowColor: "rgba(8, 145, 178, 0.35)",
  },
  "poor-office-mobile-signal-solutions": {
    icon: Building2,
    label: "BOARDROOM & CALL DROPS",
    gradient: "from-[#0a1338] via-[#1e1e48] to-[#3730a3]",
    iconBg: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
    glowColor: "rgba(55, 48, 163, 0.35)",
  },
  "how-to-check-mobile-signal-strength": {
    icon: Smartphone,
    label: "FIELD TEST & DBM CHECK",
    gradient: "from-[#0a1338] via-[#311129] to-[#be185d]",
    iconBg: "bg-pink-500/20 text-pink-300 border-pink-400/40",
    glowColor: "rgba(190, 24, 93, 0.35)",
  },
  "what-is-dbm-mobile-networks": {
    icon: BarChart3,
    label: "DBM PHYSICS & METRICS",
    gradient: "from-[#0a1338] via-[#063321] to-[#059669]",
    iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    glowColor: "rgba(5, 150, 105, 0.35)",
  },
  "mobile-booster-multi-floor-high-rise": {
    icon: Layers,
    label: "HIGH-RISE SKYSCRAPERS",
    gradient: "from-[#0a1338] via-[#132857] to-[#1e40af]",
    iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    glowColor: "rgba(30, 64, 175, 0.35)",
  },
  "mobile-network-booster-mumbai-guide": {
    icon: Compass,
    label: "MUMBAI, THANE & NAVI MUMBAI",
    gradient: "from-[#0a1338] via-[#0c394c] to-[#0284c7]",
    iconBg: "bg-sky-500/20 text-sky-300 border-sky-400/40",
    glowColor: "rgba(2, 132, 199, 0.35)",
  },
  "commercial-building-signal-solutions-mumbai": {
    icon: Activity,
    label: "COMMERCIAL REAL ESTATE IBS",
    gradient: "from-[#0a1338] via-[#211840] to-[#5b21b6]",
    iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    glowColor: "rgba(91, 33, 182, 0.35)",
  },
  "how-to-fix-weak-signal-inside-building": {
    icon: Sliders,
    label: "TROUBLESHOOTING CHECKLIST",
    gradient: "from-[#0a1338] via-[#31170d] to-[#c2410c]",
    iconBg: "bg-orange-500/20 text-orange-300 border-orange-400/40",
    glowColor: "rgba(194, 65, 12, 0.35)",
  },
  "do-you-need-a-mobile-signal-booster": {
    icon: CheckSquare,
    label: "6-POINT QUALIFICATION",
    gradient: "from-[#0a1338] via-[#092e1f] to-[#15803d]",
    iconBg: "bg-green-500/20 text-green-300 border-green-400/40",
    glowColor: "rgba(21, 128, 61, 0.35)",
  },
  "mobile-signal-booster-buying-guide": {
    icon: ShoppingBag,
    label: "BUYER'S FREQUENCY GUIDE",
    gradient: "from-[#0a1338] via-[#331c0e] to-[#ea580c]",
    iconBg: "bg-orange-500/20 text-orange-300 border-orange-400/40",
    glowColor: "rgba(234, 88, 12, 0.35)",
  },
};

const defaultVisual: BlogVisualConfig = {
  icon: Radio,
  label: "SHIVAM TELECOM GUIDE",
  gradient: "from-[#0a1338] via-[#102a6b] to-[#1f47dd]",
  iconBg: "bg-primary-500/20 text-primary-300 border-primary-400/40",
  glowColor: "rgba(31, 71, 221, 0.35)",
};

export function getBlogVisual(slug: string): BlogVisualConfig {
  return slugVisualMap[slug] || defaultVisual;
}

export function BlogCardHeaderVisual({
  slug,
  size = "md",
}: {
  slug: string;
  size?: "md" | "lg";
}) {
  const config = getBlogVisual(slug);
  const Icon = config.icon;

  const heightClass = size === "lg" ? "h-64 sm:h-72" : "h-48";
  const iconBoxSize = size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const iconSize = size === "lg" ? "h-8 w-8" : "h-6 w-6";

  return (
    <div
      className={`relative flex ${heightClass} w-full items-center justify-center overflow-hidden bg-gradient-to-br ${config.gradient} text-white`}
    >
      {/* Subtle decorative concentric radar circles */}
      <div
        className="pointer-events-none absolute -inset-6 flex items-center justify-center opacity-30"
        aria-hidden="true"
      >
        <div className="h-44 w-44 rounded-full border border-white/20 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute h-64 w-64 rounded-full border border-white/15" />
        <div className="absolute h-84 w-84 rounded-full border border-white/10" />
      </div>

      {/* Center glowing focal point */}
      <div
        className="pointer-events-none absolute h-28 w-28 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-80"
        style={{ backgroundColor: config.glowColor }}
        aria-hidden="true"
      />

      {/* Main icon and topic badge */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
        <span
          className={`flex ${iconBoxSize} items-center justify-center rounded-2xl border ${config.iconBg} backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={iconSize} />
        </span>
        <span className="mt-3 rounded-full bg-black/25 px-3 py-0.5 text-[10.5px] font-bold tracking-wider text-white/90 backdrop-blur-sm border border-white/10">
          {config.label}
        </span>
      </div>
    </div>
  );
}

