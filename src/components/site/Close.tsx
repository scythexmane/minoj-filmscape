import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { FOOTAGE } from "@/lib/media";
import { LINKS } from "@/lib/site";
import { registerScroll, useFootageGate } from "@/lib/scroll";
import { Footage } from "./Footage";

/**
 * Closing scene. The room returns, this time as the ground the last words
 * sit on. Brass appears exactly once, on the address, and does not glow.
 */
export function Close() {
  const root = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();
  useFootageGate(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerScroll();

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        "[data-room]",
        { yPercent: -12, scale: 1.16 },
        {
          yPercent: 6,
          scale: 1.02,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.7 },
        },
      );

      gsap.fromTo(
        "[data-sign]",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: { trigger: "[data-sign]", start: "top 92%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="stage w-full overflow-hidden">
      <div className="absolute inset-0">
        <div data-room className="h-full w-full will-change-transform">
          <Footage footage={FOOTAGE.interior} alt={t.location.caption} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--ink) 2%, color-mix(in oklab, var(--ink) 72%, transparent) 40%, color-mix(in oklab, var(--ink) 92%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative grid grid-cols-12 gap-y-14 px-5 pb-[8vh] pt-[22vh] sm:px-8 md:pt-[32vh]">
        <div className="col-span-12 md:col-span-5 md:col-start-2">
          <span className="label">{t.location.addressLabel}</span>
          <p className="font-display text-brass mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-tight">
            {t.location.address}
          </p>
          <p className="text-muted-foreground font-text mt-3 max-w-[32ch] text-[0.95rem] font-light italic">
            {t.location.addressNote}
          </p>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4">
            <a
              href={LINKS.map}
              target="_blank"
              rel="noreferrer"
              className="font-display text-bone hover:decoration-bone text-[0.9rem] tracking-[0.1em] uppercase underline decoration-[color:var(--ash)] decoration-1 underline-offset-[0.5rem] transition-colors"
            >
              {t.location.mapCta}
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-display text-bone hover:decoration-bone text-[0.9rem] tracking-[0.1em] uppercase underline decoration-[color:var(--ash)] decoration-1 underline-offset-[0.5rem] transition-colors"
            >
              {t.location.igCta}
            </a>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-9">
          <span className="label">{t.location.hoursLabel}</span>
          <dl className="mt-4">
            {t.location.hours.map(([d, h]) => (
              <div key={d} className="flex items-baseline justify-between py-2">
                <dt className="font-text text-linen text-[1rem] font-light">{d}</dt>
                <dd className="font-display text-bone text-[0.9rem] tabular-nums tracking-tight">
                  {h}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-muted-foreground font-text mt-6 text-[0.9rem] font-light italic">
            {t.location.caption}
          </p>
        </div>

        <div className="col-span-12 mt-[10vh] md:mt-[18vh]">
          <h2 data-sign className="display text-bone text-[13vw] md:text-[7.6vw]">
            {t.footer.line1}
            <br />
            <span className="font-text text-linen/80 font-light italic">{t.footer.line2}</span>
          </h2>
        </div>

        <div className="border-border/60 col-span-12 mt-[6vh] flex flex-wrap items-baseline justify-between gap-4 border-t pt-6">
          <span className="label">{t.footer.rights}</span>
          <span className="label">{t.footer.tag}</span>
          <a
            href={LINKS.taplink}
            target="_blank"
            rel="noreferrer"
            className="label hover:text-bone transition-colors"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
