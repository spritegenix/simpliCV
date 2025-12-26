export type CustomizationTokenCategory = "guaranteed" | "best-effort" | "semantic";

export type CustomizationTokenKind = "css-var" | "data-attr";

export type ResumeDesignScope = "ats" | "modern" | "stylish" | "all";

export type CustomizationTokenSource =
  | "design.color"
  | "design.typography"
  | "design.spacing"
  | "design.decorations"
  | "design.customization";

export interface CustomizationTokenDefinition {
  /** Stable ID for internal use (unique within this list). */
  id: string;

  /** Token delivery mechanism. */
  kind: CustomizationTokenKind;

  /**
   * Classification:
    * - guaranteed: basic visual customization tokens that templates can rely on.
    * - best-effort: tokens applied via DOM heuristics (may not always latch).
    * - semantic: non-visual/content tokens (reserved; only use for non-visual meaning).
   */
  category: CustomizationTokenCategory;

  /** Token name if kind is css-var, e.g. "--text". */
  cssVar?: `--${string}`;

  /** Attribute name if kind is data-attr, e.g. "data-header-position". */
  dataAttr?: `data-${string}`;

  /** Where the value ultimately comes from in ResumeDesign. */
  source: CustomizationTokenSource;

  /** Which template scopes are expected to support this token. */
  scopes: ResumeDesignScope[];

  /** Short user-facing meaning (not for UI unless explicitly wired). */
  description: string;
}

/**
 * Customization tokens currently emitted by the resume renderer.
 *
 * Source of truth:
 * - CSS vars and dataset attributes are set in src/components/ResumeStyles/Styles.client.tsx
 * - ATS-only CSS overrides consume some `--resume-*` vars in src/app/globals.css
 */
export const RESUME_CUSTOMIZATION_TOKENS: CustomizationTokenDefinition[] = [
  // --- Guaranteed basic visual tokens ---
  {
    id: "css.text",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--text",
    source: "design.color",
    scopes: ["all"],
    description: "Primary text color used by templates.",
  },
  {
    id: "css.accent",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--accent",
    source: "design.color",
    scopes: ["all"],
    description: "Accent/brand color used for highlights and dividers.",
  },
  {
    id: "css.baseFont",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--base-font",
    source: "design.typography",
    scopes: ["all"],
    description: "Base font size for templates that scale typography.",
  },
  {
    id: "css.sectionGap",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--section-gap",
    source: "design.spacing",
    scopes: ["all"],
    description: "Base section spacing.",
  },

  // --- Guaranteed CSS variables (renderer-provided) ---
  {
    id: "css.resumeFontFamily",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-font-family",
    source: "design.typography",
    scopes: ["all"],
    description: "Resolved font-family (preset or selected custom font).",
  },
  {
    id: "css.resumeLineHeight",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-line-height",
    source: "design.customization",
    scopes: ["all"],
    description: "Line-height multiplier applied (ATS/Modern enforced).",
  },
  {
    id: "css.headingScale",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--heading-scale",
    source: "design.typography",
    scopes: ["all"],
    description: "Heading scale factor (normalized so defaults are a no-op).",
  },
  {
    id: "css.resumeBorderWidth",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-border-width",
    source: "design.decorations",
    scopes: ["all"],
    description: "Base border width used by templates for dividers and frames.",
  },
  {
    id: "css.resumeBorderStyle",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-border-style",
    source: "design.decorations",
    scopes: ["all"],
    description: "Border style (e.g. solid/none) used by templates.",
  },
  {
    id: "css.densityMultiplier",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--density-multiplier",
    source: "design.spacing",
    scopes: ["all"],
    description: "Multiplier derived from spacing density preset.",
  },
  {
    id: "css.detailsIconSize",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--details-icon-size",
    source: "design.customization",
    scopes: ["all"],
    description: "Computed icon size for personal-details icons.",
  },

  // --- ATS-only CSS variables consumed by global overrides ---
  // These are still classified as guaranteed *within the ATS scope*, even though the
  // mechanism is a shim (globals.css). The product-level guarantee is about the
  // customization surface, not the implementation detail.
  {
    id: "css.ats.resumeBaseFontSize",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-base-font-size",
    source: "design.typography",
    scopes: ["ats"],
    description:
      "ATS shim: base font size enforced via globals.css on #resumePreviewContent.",
  },
  {
    id: "css.ats.resumeTextColor",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-text-color",
    source: "design.color",
    scopes: ["ats"],
    description:
      "ATS shim: text color enforced via globals.css on #resumePreviewContent.",
  },
  {
    id: "css.ats.resumeAccentColor",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-accent-color",
    source: "design.color",
    scopes: ["ats"],
    description:
      "ATS shim: accent color provided for ATS templates (not all use it).",
  },
  {
    id: "css.ats.resumeSectionGap",
    kind: "css-var",
    category: "guaranteed",
    cssVar: "--resume-section-gap",
    source: "design.spacing",
    scopes: ["ats"],
    description:
      "ATS shim: section spacing enforced via globals.css on #resumePreviewContent.",
  },

  // --- Best-effort dataset tokens (depend on DOM tagging heuristics) ---
  {
    id: "data.headerPosition",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-header-position",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Header alignment; relies on runtime tagging [data-resume-header].",
  },
  {
    id: "data.detailsAlign",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-details-align",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Personal-details alignment; relies on runtime tagging [data-resume-personal-details].",
  },
  {
    id: "data.detailsLayout",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-details-layout",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Personal-details layout (stacked/columns/compact); best-effort based on header/details tagging.",
  },
  {
    id: "data.detailsArrangement",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-details-arrangement",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Personal-details separator style (icon/bullet/bar); depends on tagging heuristics.",
  },
  {
    id: "data.sectionHeadingStyle",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-section-heading-style",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Section heading decoration style; requires runtime tagging [data-resume-section-heading].",
  },
  {
    id: "data.sectionHeadingCap",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-section-heading-cap",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description: "Section heading capitalization override (uppercase/capitalize).",
  },
  {
    id: "data.sectionHeadingSize",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-section-heading-size",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description: "Section heading size override (S/M/L/XL).",
  },
  {
    id: "data.sectionHeadingIcons",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-section-heading-icons",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description: "Section heading icon style (none/outline/filled).",
  },
  {
    id: "data.entryTitleSize",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-entry-title-size",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Entry title/subtitle sizing; depends on runtime tagging [data-resume-entry-title/subtitle].",
  },
  {
    id: "data.entrySubtitleStyle",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-entry-subtitle-style",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description: "Entry subtitle emphasis (normal/bold/italic).",
  },
  {
    id: "data.entrySubtitlePlacement",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-entry-subtitle-placement",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description: "Entry subtitle placement (same-line/next-line).",
  },
  {
    id: "data.entryIndentBody",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-entry-indent-body",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description: "Indent entry body; behavior depends on template structure.",
  },
  {
    id: "data.entryListStyle",
    kind: "data-attr",
    category: "best-effort",
    dataAttr: "data-entry-list-style",
    source: "design.customization",
    scopes: ["ats", "modern"],
    description:
      "Bullet vs hyphen list styling for rich text descriptions (.richTextEditorStyle).",
  },
];

export const RESUME_CUSTOMIZATION_TOKENS_BY_ID = new Map(
  RESUME_CUSTOMIZATION_TOKENS.map((t) => [t.id, t] as const),
);
