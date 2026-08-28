import type { Footage as FootageAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Footage is never framed, never rounded, never carded — only cropped. */
export function Footage({
  footage,
  className,
  alt,
}: {
  footage: FootageAsset;
  className?: string;
  alt?: string;
}) {
  return (
    <video
      className={cn("grade h-full w-full object-cover", className)}
      src={footage.src}
      poster={footage.poster}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
