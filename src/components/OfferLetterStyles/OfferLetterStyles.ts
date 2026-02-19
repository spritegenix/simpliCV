import { StaticImageData } from "next/image";
import type { OfferLetterDesign } from "@/lib/offer-letter/offerLetterDesign";
import { corporateWaveThumbnail } from "@/assets/offer-letter-styles";

// ── Categories ────────────────────────────────────────────────────────────────

export const offerLetterCategories = [
  "All",
  "Corporate",
  "Modern",
  "Minimal",
  "Creative",
] as const;

export type OfferLetterCategory = (typeof offerLetterCategories)[number];

// ── Style metadata interface ───────────────────────────────────────────────────

export interface OfferLetterStyle {
  /**
   * Stable DB slug — plain kebab-case, no prefix.
   * Naming rule: describe the visual style, e.g. "default", "corporate-wave".
   * Must match:
   *   - the key in offerLetterTemplateMap (index.ts)
   *   - the folder name under templates/ (PascalCase equivalent)
   *   - the folder name under assets/offer-letter-styles/
   */
  id: string;
  name: string;
  desc?: string;
  /** Thumbnail image shown in the template picker card (assets/offer-letter-styles/template-thumbnails/) */
  thumbnail?: StaticImageData;
  category?: OfferLetterCategory[];
  price?: "FREE" | "PREMIUM";
  /** Sort order in the picker — lower numbers appear first */
  priority: number;
  /**
   * Design tokens applied automatically when the user selects this template.
   * Merges into the document design, user overrides always win afterwards.
   * Eliminates the need for per-template if-chains in the picker.
   */
  defaultDesign?: Partial<OfferLetterDesign>;
  /** Optional page background color override (for templates using a coloured page) */
  pageBackgroundColor?: string;
}

// ── Registry ──────────────────────────────────────────────────────────────────
// Naming convention:
//   id            → kebab-case  ("corporate-wave")
//   folder        → PascalCase  (templates/CorporateWave/index.tsx)
//   asset folder  → kebab-case  (assets/offer-letter-styles/corporate-wave/)

export const offerLetterStyles: OfferLetterStyle[] = [
  {
    id: "default",
    name: "Default",
    desc: "Clean, professional layout with no background graphics.",
    category: ["All", "Minimal"],
    price: "FREE",
    priority: 0,
    defaultDesign: {
      colors: { accent: "#1a3a6b" },
      typography: { fontFamily: "Inter", fontSize: 13 },
      signature: { scale: 1 },
    },
  },
  {
    id: "corporate-wave",
    name: "Corporate Wave",
    desc: "Professional blue wave design with branded company header and divider.",
    thumbnail: corporateWaveThumbnail,
    category: ["All", "Corporate"],
    price: "FREE",
    priority: 1,
    defaultDesign: {
      colors: { accent: "#0d47a1" },
      typography: { fontFamily: "Inter", fontSize: 13 },
      signature: { scale: 1 },
    },
    pageBackgroundColor: "#ffffff",
  },
];
