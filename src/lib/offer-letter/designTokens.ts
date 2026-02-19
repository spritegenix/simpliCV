import type { OfferLetterDesign } from "./offerLetterDesign";
import type { CSSProperties } from "react";
// ── Base defaults ─────────────────────────────────────────────────────────────
// Fallback values when neither the template nor the user supplies a value.
// Templates never read these directly — always go through resolveOfferLetterTokens().

const BASE_DEFAULTS: {
  accent: string;
  headerText: string;
  bodyText: string;
  mutedText: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  paddingX: number;
  paddingY: number;
  signatureBaseHeight: number;
  signatureScale: number;
  dividerThickness: number;
} = {
  accent: "#1a3a6b",
  headerText: "#ffffff",
  bodyText: "#1f2937", // gray-800
  mutedText: "#6b7280", // gray-500
  fontFamily: "var(--font-inter, Inter, sans-serif)",
  fontSize: 13, // px
  lineHeight: 1.6,
  paddingX: 20, // mm
  paddingY: 18, // mm
  signatureBaseHeight: 56, // px before scale
  signatureScale: 1,
  dividerThickness: 2, // px
};

// ── Per-template defaults ─────────────────────────────────────────────────────
// Resolution order (last write wins):
//   BASE_DEFAULTS  →  templateDefaults  →  design (user-controlled)

export type OfferLetterTemplateDefaults = Partial<typeof BASE_DEFAULTS>;

// ── Resolved token object ─────────────────────────────────────────────────────
// The only object templates should consume. Zero hardcoded values in JSX.

export interface OfferLetterTokens {
  accent: string;
  headerText: string;
  bodyText: string;
  mutedText: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  paddingX: number; // mm
  paddingY: number; // mm
  signatureHeightPx: number;
  dividerThickness: number;
  /**
   * Emit on the root wrapper element so child CSS can also consume these:
   *   <div style={{ ...tokens.cssVars, fontFamily: tokens.fontFamily }}>
   */
  cssVars: React.CSSProperties;
}

// ── Resolver ──────────────────────────────────────────────────────────────────

export function resolveOfferLetterTokens(
  design: OfferLetterDesign | undefined,
  templateDefaults: OfferLetterTemplateDefaults = {},
): OfferLetterTokens {
  const merged = {
    ...BASE_DEFAULTS,
    ...templateDefaults,
    // User color overrides
    ...(design?.colors?.accent ? { accent: design.colors.accent } : {}),
    ...(design?.colors?.headerText
      ? { headerText: design.colors.headerText }
      : {}),
    // User typography overrides
    ...(design?.typography?.fontFamily
      ? { fontFamily: design.typography.fontFamily }
      : {}),
    ...(design?.typography?.fontSize
      ? { fontSize: design.typography.fontSize }
      : {}),
    ...(design?.typography?.lineHeight
      ? { lineHeight: design.typography.lineHeight }
      : {}),
    // User signature override
    ...(design?.signature?.scale != null
      ? { signatureScale: design.signature.scale }
      : {}),
  };

  const signatureHeightPx = Math.round(
    merged.signatureBaseHeight * merged.signatureScale,
  );

  const cssVars: React.CSSProperties = {
    "--ol-accent": merged.accent,
    "--ol-header-text": merged.headerText,
    "--ol-body-text": merged.bodyText,
    "--ol-muted-text": merged.mutedText,
    "--ol-font-family": merged.fontFamily,
    "--ol-font-size": `${merged.fontSize}px`,
    "--ol-line-height": String(merged.lineHeight),
    "--ol-divider-thickness": `${merged.dividerThickness}px`,
    "--ol-signature-height": `${signatureHeightPx}px`,
  } as React.CSSProperties;

  return {
    accent: merged.accent,
    headerText: merged.headerText,
    bodyText: merged.bodyText,
    mutedText: merged.mutedText,
    fontFamily: merged.fontFamily,
    fontSize: merged.fontSize,
    lineHeight: merged.lineHeight,
    paddingX: merged.paddingX,
    paddingY: merged.paddingY,
    signatureHeightPx,
    dividerThickness: merged.dividerThickness,
    cssVars,
  };
}
