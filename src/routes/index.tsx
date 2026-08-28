import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { I18nProvider } from "@/lib/i18n";
import { useSmoothScroll } from "@/lib/scroll";
import { Chrome } from "@/components/site/Chrome";
import { Overture } from "@/components/site/Overture";
import { Room } from "@/components/site/Room";
import { Table } from "@/components/site/Table";
import { Filmstrip } from "@/components/site/Filmstrip";
import { Voices } from "@/components/site/Voices";
import { Close } from "@/components/site/Close";

const title = "MINOJ by Rumayso — ресторан в Ташкенте";
const description =
  "Minoj by Rumayso — ресторан в Ташкенте: открытый огонь, авторская кухня и вечерний свет. Меню, часы работы, адрес и Instagram.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Film() {
  useSmoothScroll();

  // Any late-loading footage changes layout height; keep the choreography honest.
  useEffect(() => {
    let cancelled = false;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      const refresh = () => ScrollTrigger.refresh();
      const t = window.setTimeout(refresh, 600);
      window.addEventListener("load", refresh);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("load", refresh);
      };
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="top">
      <Chrome />
      <main>
        <Overture />
        <Room />
        <Table />
        <Filmstrip />
        <Voices />
        <Close />
      </main>
    </div>
  );
}

function Index() {
  return (
    <I18nProvider>
      <Film />
    </I18nProvider>
  );
}
