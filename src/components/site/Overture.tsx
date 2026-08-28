import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { FOOTAGE } from "@/lib/media";
import { registerScroll, useFootageGate } from "@/lib/scroll";
import { Footage } from "./Footage";

/**
 * Opening scene. Not a hero: a room at dusk, held for a beat, the camera
 * closing on it while the name arrives from under the bottom edge.
 */
export function Overture() {
  const root = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();
  useFootageGate(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerScroll();

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.7,
        },
      });

      tl.fromTo(
        "[data-film]",
        { scale: 1.24, yPercent: -3 },
        { scale: 1.04, yPercent: 0, ease: "none" },
        0,
      )
        .fromTo("[data-veil]", { opacity: 0.68 }, { opacity: 0.24, ease: "none" }, 0)
        .fromTo(
          "[data-mark]",
          { clipPath: "inset(0 0 100% 0)", yPercent: 14 },
          { clipPath: "inset(0 0 0% 0)", yPercent: 0, ease: "power2.out", duration: 0.55 },
          0.06,
        )
        .fromTo(
          "[data-aside]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", ease: "power2.out", duration: 0.4 },
          0.4,
        )
        .to("[data-mark]", { yPercent: -9, ease: "none", duration: 0.45 }, 0.55)
        .to("[data-aside]", { yPercent: -22, ease: "none", duration: 0.45 }, 0.55)
        .to(
          "[data-film]",
          { clipPath: "inset(0% 0% 46% 0%)", scale: 1.14, ease: "none", duration: 0.45 },
          0.55,
        )
        .to("[data-hint]", { opacity: 0, duration: 0.15 }, 0.1);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="stage h-svh w-full overflow-hidden bg-ink">
      <div
        data-film
        className="absolute inset-0 will-change-transform"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <Footage footage={FOOTAGE.interior} alt={t.hero.eyebrow} />
        <div
          data-veil
          className="absolute inset-0 bg-ink"
          style={{
            backgroundImage:
              "linear-gradient(to top, var(--ink) 4%, color-mix(in oklab, var(--burgundy) 40%, var(--ink)) 55%, color-mix(in oklab, var(--ink) 70%, transparent) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 grid grid-cols-12 items-end px-5 pb-[7vh] sm:px-8 md:pb-[9vh]">
        <div className="col-span-12 md:col-span-8">
          <div className="overflow-hidden">
            <h1
              data-mark
              className="display text-bone text-[24vw] leading-[0.78] md:text-[15.5vw]"
            >
              Minoj
            </h1>
          </div>
        </div>

        <div
          data-aside
          className="col-span-12 mt-6 max-w-[34ch] md:col-span-3 md:col-start-10 md:mb-[3.2vw] md:mt-0"
        >
          <p className="lede text-balance">{t.hero.lead}</p>
        </div>
      </div>

      <div className="absolute left-5 top-[46vh] hidden md:block sm:left-8">
        <p className="font-text text-linen/85 text-[clamp(1.25rem,2vw,1.9rem)] font-light italic leading-tight">
          {t.hero.line1} {t.hero.line2} <span className="not-italic">{t.hero.italic}</span>
        </p>
      </div>

      <div
        data-hint
        className="absolute bottom-[3vh] right-5 flex items-center gap-3 sm:right-8"
      >
        <span className="label">{t.hero.scroll}</span>
        <span className="bg-ash h-px w-10" />
      </div>
    </div>
  );
}
