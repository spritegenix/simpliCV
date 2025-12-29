"use client";

import React, { ComponentType, useEffect, useMemo, useRef } from "react";
import { ResumeDocument } from "@/types/resumeDocument";
import { ResumeValues } from "@/lib/validation";
import { toLegacyResumeValues } from "@/lib/resumeDocument";
import { deriveResumeScopeFromStyleId, RESUME_SCOPES } from "@/lib/resumeScope";
import { normalizeSectionOrder } from "./sectionOrder";

import {
  Ats1,
  Ats10,
  Ats12,
  Ats13,
  Ats14,
  Ats15,
  Ats16,
  Ats2,
  Ats3,
  Ats4,
  Ats5,
  Ats6,
  Ats7,
  Ats8,
  Ats9,
  Modern1,
  Modern2,
  Modern3,
  Modern4,
  Modern5,
  Modern6,
  Modern7,
  Modern8,
  Modern9,
  Stylish1,
  Stylish2,
  Stylish3,
} from "./index";

import { resumeStyles as resumeStyleMetas, ResumeStyle } from "./Styles";

interface ResumePreviewProps {
  resumeData: ResumeDocument;
  className?: string;
}

interface LegacyResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  sectionOrder?: string[];
  dateFormat?: string;
}

function fontFamilyToCss(
  fontFamily: ResumeDocument["design"]["typography"]["fontFamily"],
) {
  switch (fontFamily) {
    case "serif":
      return "serif";
    case "mono":
      return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    case "inter":
    default:
      return '"Inter", sans-serif';
  }
}

function adaptLegacyTemplateComponent(
  styleId: string,
  LegacyComponent: ComponentType<LegacyResumePreviewProps>,
): ComponentType<ResumePreviewProps> {
  function Wrapped({ resumeData, className }: ResumePreviewProps) {
    const hostRef = useRef<HTMLDivElement>(null);
    const legacy = toLegacyResumeValues(resumeData);
    const isAts = styleId.startsWith("ats");
    const isModern = styleId.startsWith("modern");
    const resumeScope = deriveResumeScopeFromStyleId(styleId);
    const isModern4 = styleId === "modern4";

    // Hide photo for ATS templates that don't support images
    const photoRestrictedAtsTemplates = [
      "ats1",
      "ats4",
      "ats5",
      "ats6",
      "ats8",
      "ats11",
      "ats12",
      "ats13",
      "ats14",
      "ats15",
    ];
    const shouldHidePhoto = photoRestrictedAtsTemplates.includes(styleId);
    if (shouldHidePhoto && legacy.photo) {
      legacy.photo = null;
    }

    const selectedFontLabel =
      resumeData.design.customization?.font?.selectedFont?.trim() ?? "";

    const customFontFamilyByLabel: Record<string, string> = {
      Lora: "var(--font-lora)",
      "Source Serif Pro": "var(--font-source-serif)",
      "Zilla Slab": "var(--font-zilla-slab)",
      "PT Serif": "var(--font-pt-serif)",
      Literata: "var(--font-literata)",
      "EB Garamond": "var(--font-eb-garamond)",
      // UI label uses 'Lato Modern' but the actual font is Lato.
      "Lato Modern": "var(--font-lato)",
      Aleo: "var(--font-aleo)",
      "Crimson Pro": "var(--font-crimson-pro)",
      "Cormorant Garamond": "var(--font-cormorant-garamond)",
      Vollkorn: "var(--font-vollkorn)",
      Amiri: "var(--font-amiri)",
      "Crimson Text": "var(--font-crimson-text)",
      Alegreya: "var(--font-alegreya)",
    };

    const resumeFontFamily =
      (selectedFontLabel && customFontFamilyByLabel[selectedFontLabel]) ||
      fontFamilyToCss(resumeData.design.typography.fontFamily);

    const rawHeaderPosition =
      resumeData.design.customization?.layout?.headerPosition ?? "top";
    const headerPosition: "top" | "left" | "right" = isModern4
      ? "left"
      : rawHeaderPosition;
    const detailsAlign =
      resumeData.design.customization?.personalDetails?.detailsAlign ??
      "center";
    const rawDetailsLayout = resumeData.design.customization?.personalDetails
      ?.detailsLayout as string | undefined;
    const detailsLayout: "stacked" | "compact" = isModern4
      ? "stacked"
      : rawDetailsLayout === "compact"
        ? "compact"
        : "stacked";
    const detailsArrangement =
      resumeData.design.customization?.personalDetails?.detailsArrangement ??
      "icon";
    const detailsIconStyle =
      resumeData.design.customization?.personalDetails?.detailsIconStyle ?? 0;

    const rawSectionHeadingStyle =
      resumeData.design.customization?.sectionHeadings?.headingStyle ?? 1;
    const normalizedSectionHeadingStyle =
      rawSectionHeadingStyle === 6 ? 5 : rawSectionHeadingStyle;
    const sectionHeadingStyle =
      isModern4 && normalizedSectionHeadingStyle === 5
        ? 1
        : normalizedSectionHeadingStyle;
    const sectionHeadingCapitalization =
      resumeData.design.customization?.sectionHeadings?.headingCapitalization ??
      "uppercase";
    const sectionHeadingSize =
      resumeData.design.customization?.sectionHeadings?.headingSize ?? "S";
    const sectionHeadingIcons =
      resumeData.design.customization?.sectionHeadings?.headingIcons ??
      "filled";

    const entryTitleSubtitleSize =
      resumeData.design.customization?.entryLayout?.titleSubtitleSize ?? "S";
    const entrySubtitleStyle =
      resumeData.design.customization?.entryLayout?.subtitleStyle ?? "normal";
    const entrySubtitlePlacement =
      resumeData.design.customization?.entryLayout?.subtitlePlacement ??
      "next-line";
    const entryIndentBody =
      resumeData.design.customization?.entryLayout?.indentBody ?? false;
    const entryListStyle =
      resumeData.design.customization?.entryLayout?.listStyle ?? "bullet";

    const nameSize = resumeData.design.customization?.name?.nameSize ?? "L";
    const nameBold = resumeData.design.customization?.name?.nameBold ?? true;

    const lineHeight =
      resumeData.design.customization?.spacing?.lineHeight ?? 1.3;

    const dateFormat = resumeData.design.formatting?.dateFormat ?? "MMM yyyy";

    const headingScale = resumeData.design.typography.headingScale ?? 1.15;
    const borderWidth = resumeData.design.decorations.borderWidth ?? 1;
    const density = resumeData.design.spacing.density ?? "normal";
    const densityMultiplier =
      density === "compact" ? 0.85 : density === "relaxed" ? 1.15 : 1;

    // Normalize to keep default visuals unchanged:
    // - headingScale defaults to 1.15 but should behave as a no-op at defaults
    // - sectionGap stays raw; density is applied by templates where appropriate
    const headingScaleNormalized = headingScale / 1.15;

    const nameSizeMap: Record<string, string> = {
      XS: "0.9em",
      S: "1.1em",
      M: "1.3em",
      L: "1.5em",
      XL: "1.8em",
    };
    const nameFontSize = nameSizeMap[nameSize] || nameSizeMap["L"];

    const scopedSharedVarsCss = RESUME_SCOPES.map((scope) => {
      return (
        `[data-resume-scope=\"${scope}\"] {\n` +
        `  --base-font: ${resumeData.design.typography.baseFontSize}px;\n` +
        `  --text: ${resumeData.design.color.text};\n` +
        `  --accent: ${resumeData.design.color.accent};\n` +
        `  --resume-font-family: ${resumeFontFamily};\n` +
        `  --resume-line-height: ${lineHeight};\n` +
        `  --heading-scale: ${headingScaleNormalized};\n` +
        `  --resume-border-width: ${borderWidth}px;\n` +
        `  --density-multiplier: ${densityMultiplier};\n` +
        `  --section-gap: ${resumeData.design.spacing.sectionGap}px;\n` +
        `  --resume-border-style: ${resumeData.design.decorations.borderStyle};\n` +
        `  --details-icon-size: ${
          detailsIconStyle <= 1
            ? 12
            : detailsIconStyle <= 3
              ? 14
              : detailsIconStyle <= 5
                ? 16
                : 18
        }px;\n` +
        `  --name-font-size: ${nameFontSize};\n` +
        `  --name-font-weight: ${nameBold ? "bold" : "normal"};\n` +
        `}`
      );
    }).join("\n\n");

    const scopedLineHeightCss =
      isAts || isModern
        ? `\n\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent {\n` +
          `  line-height: var(--resume-line-height) !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent * {\n` +
          `  line-height: inherit !important;\n` +
          `}`
        : "";

    const scopedFontCss =
      isAts || isModern
        ? `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent {\n` +
          `  font-family: var(--resume-font-family) !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent * {\n` +
          `  font-family: inherit !important;\n` +
          `}`
        : "";

    // ATS + Modern font sizing standards
    const atsTypographyCss =
      isAts || isModern
        ? `\n` +
          `/* ATS + Modern Font Size Standards */\n` +
          // Name: respects name size and name bold settings
          `[data-resume-scope="${resumeScope}"] [data-resume-header] > p:first-child,\n` +
          `[data-resume-scope="${resumeScope}"] [data-resume-header] > h1 {\n` +
          `  font-size: calc(${nameFontSize} * var(--heading-scale)) !important;\n` +
          `  font-weight: var(--name-font-weight) !important;\n` +
          `}\n` +
          // Job Title/Role: respects name size but NOT name bold (always medium weight)
          `[data-resume-scope="${resumeScope}"] [data-resume-header] > p:nth-child(2),\n` +
          `[data-resume-scope="${resumeScope}"] [data-resume-header] > h2,\n` +
          `[data-resume-scope="${resumeScope}"] [data-resume-header] p:has(+ [data-resume-personal-details]) {\n` +
          `  font-size: calc(${nameFontSize} * 0.7 * var(--heading-scale)) !important;\n` +
          `  font-weight: 500 !important;\n` +
          `}\n` +
          // Demographics: relative size, scales with base font
          `[data-resume-scope="${resumeScope}"] [data-resume-personal-details],\n` +
          `[data-resume-scope="${resumeScope}"] [data-resume-personal-details] * {\n` +
          `  font-size: 0.85em !important; /* Scales with base font */\n` +
          `  font-weight: 400 !important;\n` +
          `}\n`
        : "";

    const scopedPanelCss =
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-header-position=\"left\"] [data-resume-header] { text-align: left; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-header-position=\"right\"] [data-resume-header] { text-align: right; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-header-position=\"top\"] [data-resume-header] { text-align: center; }\n` +
      `\n` +
      // Align should affect the top personal-details block as a group when possible.
      // This is also responsible for name + role alignment.
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"left\"] [data-resume-header] { text-align: left !important; justify-content: flex-start; justify-items: start; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"center\"] [data-resume-header] { text-align: center !important; justify-content: center; justify-items: center; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"right\"] [data-resume-header] { text-align: right !important; justify-content: flex-end; justify-items: end; }\n` +
      // Ats2 (and any template that opts-in) can tag the name/role row for true group alignment.
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent [data-resume-header-title-row] { width: 100%; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"left\"] [data-resume-header-title-row] { justify-content: flex-start !important; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"center\"] [data-resume-header-title-row] { justify-content: center !important; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"right\"] [data-resume-header-title-row] { justify-content: flex-end !important; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"left\"] [data-resume-personal-details] { text-align: left; justify-content: flex-start; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"center\"] [data-resume-personal-details] { text-align: center; justify-content: center; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"right\"] [data-resume-personal-details] { text-align: right; justify-content: flex-end; }\n` +
      // Some templates position the details block with ml-auto / grid self alignment.
      // Override that so the control actually takes effect.
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"left\"] [data-resume-personal-details] { margin-left: 0 !important; margin-right: auto !important; justify-self: start; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"center\"] [data-resume-personal-details] { margin-left: auto !important; margin-right: auto !important; justify-self: center; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-align=\"right\"] [data-resume-personal-details] { margin-left: auto !important; margin-right: 0 !important; justify-self: end; }\n` +
      // For grid-based layouts, justify-items controls horizontal alignment of children.
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"stacked\"][data-details-align=\"left\"] [data-resume-personal-details] { justify-items: start; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"stacked\"][data-details-align=\"center\"] [data-resume-personal-details] { justify-items: center; }\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"stacked\"][data-details-align=\"right\"] [data-resume-personal-details] { justify-items: end; }\n` +
      `\n` +
      // Arrangement (Layout) — best-effort across ATS/Modern.
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"stacked\"] [data-resume-personal-details] {\n` +
      `  display: grid !important;\n` +
      `  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr)) !important;\n` +
      `  gap: 0.25em 0.8em;\n` +
      `}\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"compact\"] [data-resume-personal-details] {\n` +
      `  display: inline-flex !important;\n` +
      `  flex-wrap: wrap;\n` +
      `  align-items: center;\n` +
      `  row-gap: 0.15em;\n` +
      `  column-gap: 0.5em;\n` +
      `}\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-has-photo=\"true\"][data-details-layout=\"stacked\"] [data-resume-personal-details] {\n` +
      `  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr)) !important;\n` +
      `}\n` +
      `\n` +
      // Separator style (Icon/Bullet/Bar) should not override the chosen layout.
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-arrangement=\"bullet\"] [data-resume-personal-details] > *,\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-arrangement=\"bar\"] [data-resume-personal-details] > * {\n` +
      `  display: inline-flex !important;\n` +
      `  align-items: center;\n` +
      `}\n` +
      // Stacked layout: apply bullet/bar to ALL items (including first child)\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"stacked\"][data-details-arrangement=\"bullet\"] [data-resume-personal-details] > *::before {\n` +
      `  content: \"•\";\n` +
      `  margin-right: 0.35em;\n` +
      `}\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"stacked\"][data-details-arrangement=\"bar\"] [data-resume-personal-details] > *::before {\n` +
      `  content: \"|\";\n` +
      `  margin-right: 0.35em;\n` +
      `}\n` +
      // Compact layout: use bullet/bar as separator between items (not before first)\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"compact\"][data-details-arrangement=\"bullet\"] [data-resume-personal-details] > *:not(:first-child)::before {\n` +
      `  content: \"•\";\n` +
      `  margin: 0 0.35em;\n` +
      `}\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-layout=\"compact\"][data-details-arrangement=\"bar\"] [data-resume-personal-details] > *:not(:first-child)::before {\n` +
      `  content: \"|\";\n` +
      `  margin: 0 0.35em;\n` +
      `}\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-arrangement=\"bullet\"] [data-resume-personal-details] svg,\n` +
      `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-details-arrangement=\"bar\"] [data-resume-personal-details] svg {\n` +
      `  display: none;\n` +
      `}\n` +
      `[data-resume-scope=\"${resumeScope}\"] [data-resume-personal-details] svg {\n` +
      `  width: var(--details-icon-size) !important;\n` +
      `  height: var(--details-icon-size) !important;\n` +
      `}\n` +
      `\n` +
      // Name and role font size - apply to both name and job title
      `[data-resume-scope="${resumeScope}"] #resumePreviewContent [data-resume-header] div:not([data-resume-personal-details]) p,\n` +
      `[data-resume-scope="${resumeScope}"] #resumePreviewContent [data-resume-header] a:not([data-resume-personal-details] a) p {\n` +
      `  font-size: var(--name-font-size) !important;\n` +
      `}\n` +
      // Name bold - apply only to the first p tag (name, not role)
      `[data-resume-scope="${resumeScope}"] #resumePreviewContent [data-resume-header] div:not([data-resume-personal-details]) p:first-of-type,\n` +
      `[data-resume-scope="${resumeScope}"] #resumePreviewContent [data-resume-header] a:not([data-resume-personal-details] a) p:first-of-type {\n` +
      `  font-weight: var(--name-font-weight) !important;\n` +
      `}`;

    const scopedSectionHeadingsCss =
      isAts || isModern
        ? `\n\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent [data-resume-section-heading] {\n` +
          `  text-transform: inherit;\n` +
          `  position: relative;\n` +
          `}\n` +
          // Capitalization
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-cap=\"uppercase\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-cap=\"uppercase\"] [data-resume-section-heading] * {\n` +
          `  text-transform: uppercase !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-cap=\"capitalize\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-cap=\"capitalize\"] [data-resume-section-heading] * {\n` +
          `  text-transform: capitalize !important;\n` +
          `}\n` +
          // Size
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"S\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"S\"] [data-resume-section-heading] * {\n` +
          `  font-size: 1em !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"M\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"M\"] [data-resume-section-heading] * {\n` +
          `  font-size: 1.1em !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"L\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"L\"] [data-resume-section-heading] * {\n` +
          `  font-size: 1.25em !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"XL\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-size=\"XL\"] [data-resume-section-heading] * {\n` +
          `  font-size: 1.4em !important;\n` +
          `}\n` +
          // Icons (if a template uses SVGs inside headings)
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-icons=\"none\"] [data-resume-section-heading] svg {\n` +
          `  display: none !important;\n` +
          `}\n` +
          // Reset built-in template heading decorations so custom styles don't stack
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"0\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"2\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"3\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"4\"] [data-resume-section-heading],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"5\"] [data-resume-section-heading] {\n` +
          `  border-bottom: 0 !important;\n` +
          `  border-bottom-width: 0 !important;\n` +
          `  border-bottom-style: none !important;\n` +
          `  background: transparent !important;\n` +
          `  box-shadow: none !important;\n` +
          `}\n` +
          +(
            // Default style (1): provide a consistent, customizable look for ATS templates
            // without relying on template-hardcoded borders/lines.
            (isAts
              ? `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"1\"] [data-resume-section-heading] {\n` +
                `  padding-bottom: 0.25em;\n` +
                `}\n` +
                `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"1\"] [data-resume-section-heading]::after {\n` +
                `  content: \"\";\n` +
                `  position: absolute;\n` +
                `  left: 0;\n` +
                `  right: 0;\n` +
                `  bottom: 0;\n` +
                `  border-bottom: calc(var(--resume-border-width) * 1) solid currentColor;\n` +
                `  opacity: 0.5;\n` +
                `}\n`
              : "")
          ) +
          // Style decorations via pseudo-elements
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"2\"] [data-resume-section-heading] {\n` +
          `  padding-bottom: 0.25em;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"2\"] [data-resume-section-heading]::after {\n` +
          `  content: \"\";\n` +
          `  position: absolute;\n` +
          `  left: 0;\n` +
          `  right: 0;\n` +
          `  bottom: 0;\n` +
          `  border-bottom: calc(var(--resume-border-width) * 2) solid currentColor;\n` +
          `  opacity: 0.35;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"3\"] [data-resume-section-heading] {\n` +
          `  padding-bottom: 0.25em;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"3\"] [data-resume-section-heading]::after {\n` +
          `  content: \"\";\n` +
          `  position: absolute;\n` +
          `  left: 0;\n` +
          `  right: 0;\n` +
          `  bottom: 0;\n` +
          `  border-bottom: calc(var(--resume-border-width) * 2) dotted currentColor;\n` +
          `  opacity: 0.35;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"4\"] [data-resume-section-heading]::after {\n` +
          `  content: \"\";\n` +
          `  position: absolute;\n` +
          `  left: 0;\n` +
          `  bottom: -0.15em;\n` +
          `  width: 50%;\n` +
          `  border-bottom: calc(var(--resume-border-width) * 2) solid currentColor;\n` +
          `  opacity: 0.35;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"5\"] [data-resume-section-heading]::before,\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"5\"] [data-resume-section-heading]::after {\n` +
          `  content: \"\";\n` +
          `  position: absolute;\n` +
          `  bottom: -0.15em;\n` +
          `  width: 22%;\n` +
          `  border-bottom: calc(var(--resume-border-width) * 2) solid currentColor;\n` +
          `  opacity: 0.35;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"5\"] [data-resume-section-heading]::before { left: 0; }\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-section-heading-style=\"5\"] [data-resume-section-heading]::after { left: 28%; }\n` +
          ``
        : "";

    const scopedEntryLayoutCss =
      isAts || isModern
        ? `\n\n` +
          // Title & subtitle size
          // Only change the subtitle size; keep title + body text unchanged.
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-title-size=\"S\"] [data-resume-entry-subtitle] {\n` +
          `  font-size: 0.93em !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-title-size=\"M\"] [data-resume-entry-subtitle] {\n` +
          `  font-size: 1em !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-title-size=\"L\"] [data-resume-entry-subtitle] {\n` +
          `  font-size: 1.06em !important;\n` +
          `}\n` +
          // Subtitle style
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-style=\"normal\"] [data-resume-entry-subtitle] {\n` +
          `  font-style: normal !important;\n` +
          `  font-weight: inherit !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-style=\"bold\"] [data-resume-entry-subtitle] {\n` +
          `  font-style: normal !important;\n` +
          `  font-weight: 700 !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-style=\"italic\"] [data-resume-entry-subtitle] {\n` +
          `  font-style: italic !important;\n` +
          `}\n` +
          // Subtitle placement (only affects cases where title/subtitle share a parent)
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"same-line\"] [data-resume-entry-title],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"same-line\"] [data-resume-entry-subtitle] {\n` +
          `  display: inline !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"same-line\"] [data-resume-entry-subtitle] {\n` +
          `  margin-left: 0 !important;\n` +
          `}\n` +
          // ATS1 uses two subtitle slots (inline vs newline) to preserve original layout.
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"same-line\"] [data-entry-subtitle-slot=\"newline\"] {\n` +
          `  display: none !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"same-line\"] [data-entry-subtitle-slot=\"inline\"] {\n` +
          `  display: inline !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"same-line\"] [data-entry-subtitle-slot=\"inline\"]::before {\n` +
          `  content: ", " !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"next-line\"] [data-resume-entry-title],\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"next-line\"] [data-resume-entry-subtitle] {\n` +
          `  display: block !important;\n` +
          `  margin-left: 0 !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"next-line\"] [data-entry-subtitle-slot=\"inline\"] {\n` +
          `  display: none !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-subtitle-placement=\"next-line\"] [data-entry-subtitle-slot=\"newline\"] {\n` +
          `  display: block !important;\n` +
          `}\n` +
          // Description indentation (targets rich text descriptions used by most templates)
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-indent-body=\"true\"] .break-inside-avoid .richTextEditorStyle {\n` +
          `  padding-left: 1.25em !important;\n` +
          `}\n` +
          // List style (targets rich text descriptions)
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-list-style=\"bullet\"] .richTextEditorStyle ul {\n` +
          `  list-style: disc !important;\n` +
          `  padding-left: 1.25em !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-list-style=\"bullet\"] .richTextEditorStyle ul li::before {\n` +
          `  content: none !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-list-style=\"hyphen\"] .richTextEditorStyle ul {\n` +
          `  list-style: none !important;\n` +
          `  padding-left: 0 !important;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-list-style=\"hyphen\"] .richTextEditorStyle ul li {\n` +
          `  position: relative;\n` +
          `  padding-left: 1.1em;\n` +
          `}\n` +
          `[data-resume-scope=\"${resumeScope}\"] #resumePreviewContent[data-entry-list-style=\"hyphen\"] .richTextEditorStyle ul li::before {\n` +
          `  content: "−";\n` +
          `  position: absolute;\n` +
          `  left: 0;\n` +
          `}\n`
        : "";

    const atsVars = isAts
      ? {
          "--resume-base-font-size": `${resumeData.design.typography.baseFontSize}px`,
          "--resume-font-family": resumeFontFamily,
          "--resume-text-color": resumeData.design.color.text,
          "--resume-accent-color": resumeData.design.color.accent,
          "--resume-section-gap": `calc(${resumeData.design.spacing.sectionGap}px * ${densityMultiplier})`,
        }
      : {};

    const sectionOrder = resumeData.design.customization?.sectionOrder;

    const sectionOrderIndex = useMemo(() => {
      const normalized = normalizeSectionOrder(sectionOrder);
      const map = new Map<string, number>(normalized.map((k, i) => [k, i]));
      return (key: string) => map.get(key) ?? normalized.length;
    }, [sectionOrder]);

    useEffect(() => {
      // Only apply to ATS + Modern; leave Stylish untouched.
      if (!isAts && !isModern) return;

      const host = hostRef.current;
      if (!host) return;

      const otherTitle = legacy.others?.title?.trim();

      const keyFromHeadingText = (raw: string | null | undefined) => {
        const text = (raw ?? "").trim().toLowerCase();
        if (!text) return null;

        if (text.includes("professional summary") || text === "summary") {
          return "summary";
        }

        if (
          text.includes("professional experience") ||
          text === "experience" ||
          text.includes("work experience") ||
          text.includes("employment") ||
          text.includes("work history")
        ) {
          return "work-experience";
        }

        if (text.includes("project")) return "projects";
        if (text.includes("skills")) return "skills";
        if (text.includes("academ") || text.includes("education"))
          return "education";
        if (text.includes("certif")) return "certification";

        if (otherTitle && text.includes(otherTitle.toLowerCase())) {
          return "interests";
        }

        if (
          text.includes("interest") ||
          text.includes("hobbies") ||
          text.includes("awards")
        ) {
          return "interests";
        }

        return null;
      };

      const firstHeadingTextIn = (node: Element) => {
        const heading = node.querySelector(
          "h1,h2,h3,[data-resume-heading]",
        ) as HTMLElement | null;
        return heading?.textContent ?? null;
      };

      let isApplying = false;

      const applyOrder = () => {
        if (isApplying) return;

        const root = host.querySelector<HTMLElement>("#resumePreviewContent");
        if (!root) return;

        // Apply header + personal-details hooks (so CSS selectors work reliably).
        root.dataset.headerPosition = headerPosition;
        root.dataset.detailsAlign = detailsAlign;
        root.dataset.detailsLayout = detailsLayout;
        root.dataset.detailsArrangement = detailsArrangement;
        root.dataset.hasPhoto = legacy.photo ? "true" : "false";

        // Apply section heading hooks (ATS + Modern only).
        root.dataset.sectionHeadingStyle = String(sectionHeadingStyle);
        root.dataset.sectionHeadingCap = sectionHeadingCapitalization;
        root.dataset.sectionHeadingSize = sectionHeadingSize;
        root.dataset.sectionHeadingIcons = sectionHeadingIcons;

        // Apply entry layout hooks (ATS + Modern only).
        root.dataset.entryTitleSize = entryTitleSubtitleSize;
        root.dataset.entrySubtitleStyle = entrySubtitleStyle;
        root.dataset.entrySubtitlePlacement = entrySubtitlePlacement;
        root.dataset.entryIndentBody = entryIndentBody ? "true" : "false";
        root.dataset.entryListStyle = entryListStyle;

        // Apply name styling hooks (ATS + Modern only).
        root.dataset.nameSize = nameSize;
        root.dataset.nameBold = nameBold ? "true" : "false";

        const ensureHeaderTagged = () => {
          if (root.querySelector("[data-resume-header]")) return;

          const firstName = (legacy.firstName ?? "").trim().toLowerCase();
          const lastName = (legacy.lastName ?? "").trim().toLowerCase();
          if (!firstName && !lastName) return;

          const candidates = Array.from(
            root.querySelectorAll<HTMLElement>("h1,h2,h3,p,div,section,header"),
          );

          const match = candidates.find((el) => {
            const text = (el.textContent ?? "").toLowerCase();
            if (!text) return false;
            if (firstName && !text.includes(firstName)) return false;
            if (lastName && !text.includes(lastName)) return false;
            return true;
          });

          if (!match) return;
          const container =
            (match.closest("section") as HTMLElement | null) ??
            (match.closest("header") as HTMLElement | null) ??
            (match.closest("div") as HTMLElement | null) ??
            match;
          container.setAttribute("data-resume-header", "true");
        };

        const ensurePersonalDetailsTagged = () => {
          if (root.querySelector("[data-resume-personal-details]")) return;

          const anchors = Array.from(
            root.querySelectorAll<HTMLAnchorElement>(
              'a[href^="mailto:"],a[href^="tel:"],a[href^="http"],a[href^="https"]',
            ),
          );

          const email = (legacy.email ?? "").trim().toLowerCase();
          const phone = (legacy.phone ?? "").trim().toLowerCase();

          const relevant = anchors.filter((a) => {
            const href = (a.getAttribute("href") ?? "").toLowerCase();
            const text = (a.textContent ?? "").trim().toLowerCase();
            if (href.startsWith("mailto:") || href.startsWith("tel:"))
              return true;
            if (email && (href.includes(email) || text.includes(email)))
              return true;
            if (phone && (href.includes(phone) || text.includes(phone)))
              return true;
            return false;
          });

          const hits = relevant.length ? relevant : anchors;
          if (!hits.length) return;

          const score = new Map<HTMLElement, number>();
          for (const a of hits) {
            const parents: (HTMLElement | null)[] = [
              a.parentElement,
              a.parentElement?.parentElement ?? null,
            ];
            for (const p of parents) {
              if (!p || p === root) continue;
              if (p.children.length < 2) continue;
              score.set(p, (score.get(p) ?? 0) + 1);
            }
          }

          const best = [...score.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
          if (!best) return;
          best.setAttribute("data-resume-personal-details", "true");
        };

        ensureHeaderTagged();
        ensurePersonalDetailsTagged();

        const ensureEntryTagged = () => {
          // Only tag likely "entry" blocks where a rich text description exists.
          // This keeps the heuristics narrow and avoids tagging section headings.
          const entryContainers = Array.from(
            root.querySelectorAll<HTMLElement>(".break-inside-avoid"),
          ).filter((el) => !!el.querySelector(".richTextEditorStyle"));

          const isUsableText = (el: HTMLElement | null) => {
            if (!el) return false;
            const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
            return text.length >= 2;
          };

          const pickFirstTexty = (container: HTMLElement) => {
            const candidate = container.querySelector<HTMLElement>(
              "a,h3,h4,span.font-semibold,span.font-medium,span.italic,em,i,strong,b,p,span",
            );
            if (candidate && isUsableText(candidate)) return candidate;
            return isUsableText(container) ? container : null;
          };

          for (const entry of entryContainers) {
            if (entry.querySelector("[data-resume-entry-title]")) continue;

            const children = Array.from(entry.children) as HTMLElement[];
            const lines = children.filter(
              (ch) => !ch.classList.contains("richTextEditorStyle"),
            );

            const firstLine = lines[0];
            if (!firstLine) continue;
            const secondLine = lines[1] ?? null;

            const titleEl = pickFirstTexty(firstLine);
            const subtitleEl = secondLine ? pickFirstTexty(secondLine) : null;

            if (titleEl)
              titleEl.setAttribute("data-resume-entry-title", "true");
            if (subtitleEl)
              subtitleEl.setAttribute("data-resume-entry-subtitle", "true");
          }
        };

        ensureEntryTagged();

        const getDepth = (el: Element) => {
          let depth = 0;
          let cur: Element | null = el;
          while (cur && cur !== root) {
            depth += 1;
            cur = cur.parentElement;
          }
          return depth;
        };

        const keyFromChild = (child: Element) =>
          keyFromHeadingText(firstHeadingTextIn(child));

        const tagSectionHeadingIn = (child: Element) => {
          const heading = child.querySelector(
            "h1,h2,h3,[data-resume-heading]",
          ) as HTMLElement | null;
          const key = keyFromHeadingText(heading?.textContent);
          if (!heading || !key) return;
          heading.setAttribute("data-resume-section-heading", "true");
          heading.setAttribute("data-resume-section-key", key);
        };

        const isCandidateContainer = (el: HTMLElement) => {
          const kids = Array.from(el.children);
          if (kids.length < 3) return false;
          let sectionStartCount = 0;
          for (const child of kids) {
            if (keyFromChild(child)) sectionStartCount += 1;
            if (sectionStartCount >= 2) return true;
          }
          return false;
        };

        const applyWithin = (container: HTMLElement) => {
          const children = Array.from(container.children) as HTMLElement[];
          if (children.length < 3) return;

          // Group direct children into sections based on recognized heading text within the child.
          const groups: { nodes: HTMLElement[]; key: string | null }[] = [];
          let currentNodes: HTMLElement[] = [];
          let currentKey: string | null = null;

          const flush = () => {
            if (currentNodes.length) {
              groups.push({ nodes: currentNodes, key: currentKey });
            }
            currentNodes = [];
            currentKey = null;
          };

          for (const child of children) {
            const key = keyFromChild(child);
            if (key) {
              tagSectionHeadingIn(child);
              flush();
              currentKey = key;
              currentNodes.push(child);
            } else {
              currentNodes.push(child);
            }
          }
          flush();

          const keyed = groups.filter((g) => !!g.key);
          if (keyed.length < 2) return;

          const sortedKeyed = [...keyed].sort(
            (a, b) => sectionOrderIndex(a.key!) - sectionOrderIndex(b.key!),
          );

          // Replace keyed group slots, leaving unkeyed groups anchored.
          const sortedIter = sortedKeyed[Symbol.iterator]();
          const rebuilt: HTMLElement[] = [];
          for (const group of groups) {
            if (!group.key) {
              rebuilt.push(...group.nodes);
              continue;
            }
            const next = sortedIter.next().value;
            rebuilt.push(...(next?.nodes ?? group.nodes));
          }

          // Idempotency guard: if order already matches, skip.
          const same =
            rebuilt.length === children.length &&
            rebuilt.every((node, i) => node === children[i]);
          if (same) return;

          for (const node of children) {
            container.removeChild(node);
          }
          for (const node of rebuilt) {
            container.appendChild(node);
          }
        };

        isApplying = true;
        try {
          // Apply deepest-first so nested Modern columns are handled.
          const containers = [
            root,
            ...Array.from(root.querySelectorAll<HTMLElement>("*")),
          ]
            .filter(isCandidateContainer)
            .sort((a, b) => getDepth(b) - getDepth(a));

          for (const container of containers) {
            applyWithin(container);
          }
        } finally {
          isApplying = false;
        }
      };

      // Apply once after paint, then keep applying on DOM changes.
      const raf = requestAnimationFrame(applyOrder);

      const observer = new MutationObserver(() => {
        // React re-renders (e.g. width/zoom updates) can restore original order.
        // Re-apply on the next frame to keep preview consistent.
        requestAnimationFrame(applyOrder);
      });

      observer.observe(host, { childList: true, subtree: true });

      return () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
      };
    }, [
      isAts,
      isModern,
      legacy.firstName,
      legacy.lastName,
      legacy.email,
      legacy.phone,
      legacy.others?.title,
      sectionOrderIndex,
      headerPosition,
      detailsAlign,
      detailsLayout,
      detailsArrangement,
      detailsIconStyle,
      sectionHeadingStyle,
      sectionHeadingCapitalization,
      sectionHeadingSize,
      sectionHeadingIcons,
      entryTitleSubtitleSize,
      entrySubtitleStyle,
      entrySubtitlePlacement,
      entryIndentBody,
      entryListStyle,
      lineHeight,
    ]);

    return (
      <div
        data-resume-scope={resumeScope}
        data-resume-design-scope={isAts ? "ats" : undefined}
        style={atsVars as React.CSSProperties}
        ref={hostRef}
      >
        <style>
          {scopedSharedVarsCss}
          {"\n\n"}
          {scopedPanelCss}
          {scopedSectionHeadingsCss}
          {scopedEntryLayoutCss}
          {scopedLineHeightCss}
          {scopedFontCss ? "\n\n" : ""}
          {scopedFontCss}
          {atsTypographyCss ? "\n\n" : ""}
          {atsTypographyCss}
        </style>
        <LegacyComponent
          resumeData={legacy}
          className={className}
          sectionOrder={sectionOrder}
          dateFormat={dateFormat}
        />
      </div>
    );
  }

  Wrapped.displayName = `AdaptedLegacyResumeTemplate(${LegacyComponent.displayName || LegacyComponent.name || "Anonymous"})`;
  return Wrapped;
}

export type ResumeStyleWithComponent = ResumeStyle & {
  component: ComponentType<ResumePreviewProps>;
};

const legacyComponentById: Record<
  string,
  ComponentType<LegacyResumePreviewProps>
> = {
  ats1: Ats1,
  ats2: Ats2,
  ats3: Ats3,
  ats4: Ats4,
  ats5: Ats5,
  ats6: Ats6,
  ats7: Ats7,
  ats8: Ats8,
  ats9: Ats9,
  ats10: Ats10,
  ats12: Ats12,
  ats13: Ats13,
  ats14: Ats14,
  ats15: Ats15,
  ats16: Ats16,

  modern1: Modern1,
  modern2: Modern2,
  modern3: Modern3,
  modern4: Modern4,
  modern5: Modern5,
  modern6: Modern6,
  modern7: Modern7,
  modern8: Modern8,
  modern9: Modern9,

  stylish1: Stylish1,
  stylish2: Stylish2,
  stylish3: Stylish3,
};

export const resumeStyles: ResumeStyleWithComponent[] = resumeStyleMetas.map(
  (style) => {
    const LegacyComponent = legacyComponentById[style.id];
    if (!LegacyComponent) {
      throw new Error(
        `Missing resume template component for styleId: ${style.id}`,
      );
    }

    return {
      ...style,
      component: adaptLegacyTemplateComponent(style.id, LegacyComponent),
    };
  },
);
