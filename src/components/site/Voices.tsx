import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { FOOTAGE } from "@/lib/media";
import { registerScroll, useFootageGate } from "@/lib/scroll";
import { Footage } from "./Footage";

/**
 * Fifth scene: almost nothing on screen. Three voices, each set at a
 * different place in the frame, over footage that is barely there.
 */
export function Voices() {
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
        "[data-ghost]",
        { yPercent: 8, scale: 1.1 },
        {
          yPercent: -8,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.9 },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-quote]").forEach((quote) => {
        gsap.fromTo(
          quote,
          { clipPath: "inset(0 0 100% 0)", yPercent: 6 },
          {
            clipPath: "inset(0 0 0% 0)",
            yPercent: 0,
            ease: "power3.out",
            duration: 1.1,
            scrollTrigger: { trigger: quote, start: "top 85%" },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const positions = [
    "md:col-span-7 md:col-start-2",
    "md:col-span-6 md:col-start-6 md:mt-[22vh]",
    "md:col-span-5 md:col-start-3 md:mt-[24vh]",
  ];

  return (
    <section ref={root} className="stage bg-ink w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-[-8%] w-[52%] opacity-[0.16] md:w-[34%]">
        <div data-ghost className="h-full w-full will-change-transform">
          <Footage footage={FOOTAGE.espresso} alt="" />
        </div>
        <div className="from-ink absolute inset-0 bg-gradient-to-l to-transparent" />
      </div>

      <div className="relative grid grid-cols-12 px-5 pb-[18vh] pt-[16vh] sm:px-8 md:pb-[26vh] md:pt-[24vh]">
        <span className="label col-span-12 md:col-span-2">{t.reviews.kicker}</span>

        {t.reviews.quotes.map((quote, i) => (
          <blockquote
            key={quote.author}
            data-quote
            className={`col-span-12 mt-12 md:mt-0 ${positions[i]}`}
          >
            <p className="font-text text-bone text-[clamp(1.5rem,3.4vw,2.75rem)] font-light leading-[1.24]">
              {quote.text}
            </p>
            <footer className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-brass text-[0.8125rem] tracking-[0.14em] uppercase">
                {quote.author}
              </span>
              <span className="bg-ash h-px w-8" />
              <span className="text-muted-foreground font-text text-[0.9rem] font-light italic">
                {quote.meta}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
