import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { FOOTAGE } from "@/lib/media";
import { registerScroll, useFootageGate } from "@/lib/scroll";
import { Footage } from "./Footage";

/**
 * Second scene. The fire arrives from under the previous frame and keeps
 * travelling upward while the text holds still — the page becomes a camera
 * panning down a tall image.
 */
export function Room() {
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
        "[data-fire]",
        { yPercent: -14, scale: 1.12 },
        {
          yPercent: 10,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );

      gsap.fromTo(
        "[data-slab]",
        { xPercent: 6 },
        {
          xPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-fact]").forEach((fact, i) => {
        gsap.fromTo(
          fact,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "power2.out",
            duration: 0.9,
            delay: i * 0.08,
            scrollTrigger: { trigger: fact, start: "top 88%" },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="stage bg-ink -mt-[1px] w-full">
      <div className="relative grid grid-cols-12">
        {/* the fire column runs off the right edge, taller than the copy */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[64%] overflow-hidden md:w-[46%]">
          <div data-fire className="h-[118%] w-full will-change-transform">
            <Footage footage={FOOTAGE.grill} alt={t.about.kicker} />
          </div>
          <div className="from-ink absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
        </div>

        <div className="relative z-10 col-span-12 px-5 pb-[16vh] pt-[18vh] sm:px-8 md:col-span-7 md:pb-[24vh] md:pt-[26vh]">
          <span className="label">{t.about.kicker}</span>
          <h2
            data-slab
            className="display text-bone mt-8 text-[13vw] md:mt-12 md:text-[6.4vw] md:leading-[0.88]"
          >
            {t.about.title1}
            <br />
            <span className="font-text text-linen pr-[0.06em] font-light italic">
              {t.about.titleItalic}
            </span>
          </h2>

          <p className="lede mt-10 max-w-[46ch] md:mt-16 md:ml-[14%]">{t.about.body}</p>

          <dl className="mt-16 max-w-[34rem] md:mt-24 md:ml-[14%]">
            {t.about.facts.map(([k, v]) => (
              <div
                key={k}
                data-fact
                className="border-border/70 grid grid-cols-[8rem_1fr] gap-4 border-t py-4"
              >
                <dt className="label pt-1">{k}</dt>
                <dd className="font-text text-linen text-[1.0625rem] font-light">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
