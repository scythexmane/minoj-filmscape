import grill from "@/assets/grill.mp4.asset.json";
import grillPoster from "@/assets/grill-poster.jpg.asset.json";
import interior from "@/assets/interior.mp4.asset.json";
import interiorPoster from "@/assets/interior-poster.jpg.asset.json";
import plating from "@/assets/plating.mp4.asset.json";
import platingPoster from "@/assets/plating-poster.jpg.asset.json";
import espresso from "@/assets/espresso.mp4.asset.json";
import espressoPoster from "@/assets/espresso-poster.jpg.asset.json";

export type Footage = { src: string; poster: string };

export const FOOTAGE: Record<"grill" | "interior" | "plating" | "espresso", Footage> = {
  grill: { src: grill.url, poster: grillPoster.url },
  interior: { src: interior.url, poster: interiorPoster.url },
  plating: { src: plating.url, poster: platingPoster.url },
  espresso: { src: espresso.url, poster: espressoPoster.url },
};
