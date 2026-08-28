import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerScroll() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Lenis-driven inertial scrolling, wired into ScrollTrigger's ticker. */
export function useSmoothScroll() {
  useEffect(() => {
    registerScroll();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void; on: Function } | null = null;
    let killed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (killed) return;
      const instance = new Lenis({
        duration: 1.35,
        lerp: 0.085,
        wheelMultiplier: 0.95,
        smoothWheel: true,
      });
      lenis = instance as never;
      instance.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (instance as unknown as { _gsapRaf?: typeof raf })._gsapRaf = raf;
    });

    return () => {
      killed = true;
      const inst = lenis as unknown as { _gsapRaf?: (t: number) => void; destroy?: () => void };
      if (inst?._gsapRaf) gsap.ticker.remove(inst._gsapRaf);
      inst?.destroy?.();
    };
  }, []);
}

/** Plays footage only while it is on camera; keeps many videos cheap. */
export function useFootageGate(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const videos = Array.from(el.querySelectorAll("video"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { rootMargin: "10% 0px", threshold: 0.05 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [root]);
}
