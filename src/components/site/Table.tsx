import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { FOOTAGE } from "@/lib/media";
import { registerScroll, useFootageGate } from "@/lib/scroll";
import { Footage } from "./Footage";

/**
 * Third scene: near-monochrome. The plate is held on the left edge, the
 * list travels past it. No cards, no boxes — a printed page with a window.
 */
export function Table() {
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
        "[data-plate-inner]",
        { scale: 1.18, yPercent: -6 },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: { trigger: row, start: "top 92%" },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="stage bg-smoke w-full">
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 md:col-span-5">
          <div className="sticky top-0 h-[52vh] overflow-hidden md:h-svh">
            <div data-plate-inner className="h-full w-full will-change-transform">
              <Footage footage={FOOTAGE.plating} alt={t.menu.kicker} />
            </div>
            <div className="from-smoke absolute inset-0 bg-gradient-to-b via-transparent to-transparent md:bg-gradient-to-l" />
          </div>
        </div>

        <div className="col-span-12 px-5 pb-[14vh] pt-[12vh] sm:px-8 md:col-span-6 md:col-start-7 md:pb-[22vh] md:pt-[22vh]">
          <span className="label">{t.menu.kicker}</span>
          <h2 className="display text-bone mt-7 text-[11vw] md:text-[4.6vw]">
            {t.menu.title}{" "}
            <span className="font-text text-linen font-light italic">{t.menu.titleItalic}</span>
          </h2>

          <div className="mt-16 md:mt-24">
            {t.menu.groups.map((group, gi) => (
              <div key={group.title} className={gi === 0 ? "" : "mt-16 md:mt-24"}>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-display text-bone text-[1.35rem] font-medium tracking-tight">
                    {group.title}
                  </h3>
                  <span className="bg-border h-px flex-1" />
                  <span className="label">{group.sub}</span>
                </div>

                <ul className="mt-6">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      data-row
                      className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4"
                    >
                      <span className="font-text text-bone text-[1.15rem] font-normal">
                        {item.name}
                      </span>
                      <span className="font-display text-linen/80 text-[0.9rem] tabular-nums tracking-tight">
                        {item.price}
                      </span>
                      <span className="text-muted-foreground font-text col-span-2 text-[0.95rem] font-light italic">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground font-text mt-16 max-w-[42ch] text-[0.95rem] font-light md:mt-24">
            {t.menu.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
