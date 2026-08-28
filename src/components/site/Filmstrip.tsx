import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { FOOTAGE, type Footage as FootageAsset } from "@/lib/media";
import { registerScroll, useFootageGate } from "@/lib/scroll";
import { Footage } from "./Footage";

const STRIP: { footage: FootageAsset; w: string; h: string; align: string }[] = [
  { footage: FOOTAGE.grill, w: "min-w-[78vw] md:min-w-[44vw]", h: "h-[76vh]", align: "self-end" },
  {
    footage: FOOTAGE.plating,
    w: "min-w-[86vw] md:min-w-[30vw]",
    h: "h-[54vh]",
    align: "self-start",
  },
  {
    footage: FOOTAGE.interior,
    w: "min-w-[92vw] md:min-w-[52vw]",
    h: "h-[88vh]",
    align: "self-center",
  },
  {
    footage: FOOTAGE.espresso,
    w: "min-w-[74vw] md:min-w-[26vw]",
    h: "h-[62vh]",
    align: "self-end",
  },
];

/** Fourth scene: the viewport turns sideways and travels along a filmstrip. */
export function Filmstrip() {
  const root = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();
  useFootageGate(root);

  useEffect(() => {
    const el = root.current;
    const rail = track.current;
    if (!el || !rail) return;
    registerScroll();

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const distance = () => rail.scrollWidth - window.innerWidth;

      gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.to("[data-strip-title]", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "+=100%", scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="stage bg-ink h-svh w-full overflow-hidden">
      <div className="absolute left-5 top-[9vh] z-20 sm:left-8">
        <span className="label">{t.reels.kicker}</span>
        <h2
          data-strip-title
          className="display text-bone/90 mt-4 text-[9vw] md:text-[3.4vw]"
        >
          {t.reels.title}{" "}
          <span className="font-text text-linen font-light italic">{t.reels.titleItalic}</span>
        </h2>
      </div>

      <div
        ref={track}
        className="absolute inset-0 flex h-full items-center gap-[6vw] pl-5 pr-[18vw] will-change-transform sm:pl-8"
      >
        {STRIP.map((frame, i) => (
          <figure key={i} className={`${frame.w} ${frame.h} ${frame.align} relative shrink-0`}>
            <Footage footage={frame.footage} alt={t.reels.captions[i]?.caption} />
            <figcaption className="absolute -bottom-7 left-0 flex w-full items-baseline justify-between">
              <span className="label">{t.reels.captions[i]?.caption}</span>
              <span className="font-display text-muted-foreground text-[0.6875rem] tabular-nums tracking-[0.18em]">
                {t.reels.captions[i]?.time}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="absolute bottom-[5vh] right-5 z-20 sm:right-8">
        <span className="label">{t.reels.note}</span>
      </div>
    </div>
  );
}
