import { useEffect, useRef, useState } from "react";
import { LANGS, LANG_LABEL, useI18n } from "@/lib/i18n";
import { LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The only persistent UI: a name, a language, a reservation. It stays out of
 * the composition and only darkens its own text once the room is behind it.
 */
export function Chrome() {
  const { lang, setLang, t } = useI18n();
  const [lifted, setLifted] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setLifted(window.scrollY > window.innerHeight * 0.7));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-5 sm:px-8">
      <a
        href="#top"
        className={cn(
          "font-display pointer-events-auto text-[0.8125rem] tracking-[0.34em] uppercase transition-opacity duration-700",
          lifted ? "text-bone opacity-100" : "text-bone/70 opacity-0",
        )}
      >
        Minoj
      </a>

      <div className="pointer-events-auto flex items-baseline gap-6">
        <nav className="flex items-baseline gap-2" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn(
                "font-display text-[0.6875rem] tracking-[0.2em] uppercase transition-colors",
                l === lang ? "text-bone" : "text-muted-foreground hover:text-linen",
              )}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </nav>
        <a
          href={LINKS.taplink}
          target="_blank"
          rel="noreferrer"
          className="font-display text-bone hover:decoration-bone text-[0.6875rem] tracking-[0.2em] uppercase underline decoration-[color:var(--ash)] decoration-1 underline-offset-[0.4rem] transition-colors"
        >
          {t.hero.cta}
        </a>
      </div>
    </header>
  );
}
