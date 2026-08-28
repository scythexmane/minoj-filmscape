import { LANGS, LANG_LABEL, useI18n } from "@/lib/i18n";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-1 border border-gold/25 px-1 py-1 backdrop-blur-sm ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`label px-2 py-1 transition-colors duration-300 ${
            lang === l ? "bg-gold text-graphite-deep" : "text-bone/60 hover:text-gold"
          }`}
        >
          {LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
