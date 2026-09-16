"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TowerIcon } from "@/components/icons/TowerIcon";
import { siteConfig } from "@/config/site";
import { cn, telLink, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/components/seo/AnalyticsScripts";

const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type QuoteInput = z.infer<typeof quoteSchema>;

export function QuotePopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) });

  const onSubmit = async (data: QuoteInput) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          city: "Mumbai",
          area: data.address || undefined,
          message: data.message || undefined,
          requirementType: "OTHER",
          source: "WEBSITE_HERO_FORM",
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("form_submit", { form: "quote_popup", source: "WEBSITE_HERO_FORM" });
      setStatus("success");
      reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setStatus("idle");
      }}
    >
      <DialogContent className="p-0 border-0 shadow-2xl overflow-hidden rounded-3xl">
        {/* Header with elegant deep navy gradient & authentic brand icon */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#07122e] via-[#0a1c4a] to-[#0e276b] px-6 pb-6 pt-7 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-inner backdrop-blur-md">
            <TowerIcon className="h-7 w-7" />
          </div>
          <DialogTitle className="relative mt-3 font-display text-2xl font-extrabold text-white tracking-tight">
            Get a Free Quotation
          </DialogTitle>
          <DialogDescription className="relative mt-1 text-xs sm:text-sm text-white/75 font-medium">
            {siteConfig.businessName} — free site survey &amp; instant callback
          </DialogDescription>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
            <CheckCircle2 className="h-11 w-11 text-success" />
            <h3 className="font-display text-lg font-bold text-navy">
              Thank you! Your request has been received.
            </h3>
            <p className="text-sm text-muted-foreground">
              Our team will call you back shortly to confirm your free site survey.
            </p>
          </div>
        ) : (
          <div className="bg-white px-6 pb-6 pt-5">
            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappLink(
                  siteConfig.whatsapp,
                  `Hi ${siteConfig.businessName}, I'd like a free quotation for a mobile signal booster.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={telLink(siteConfig.phone)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0b1e4d] hover:bg-[#122a6b] px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-3">
              <div>
                <Input
                  placeholder="Your name"
                  hasError={!!errors.name}
                  className="bg-slate-50/80 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Mobile number"
                  inputMode="numeric"
                  hasError={!!errors.phone}
                  className="bg-slate-50/80 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <Input
                placeholder="Address / area"
                className="bg-slate-50/80 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
                {...register("address")}
              />
              <Textarea
                placeholder="Message (optional)"
                rows={3}
                className="bg-slate-50/80 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
                {...register("message")}
              />

              {serverError && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 active:bg-primary-700 px-4 py-3.5 text-[15px] font-bold text-white shadow-md shadow-primary-600/25 transition-all hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
                )}
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                Get Free Quote
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
