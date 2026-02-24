"use client";

import { useEffect } from "react";

import { ResumeDocument } from "@/types/resumeDocument";
import { steps } from "./steps";
import LanguageRegion from "@/components/customisation/LanguageRegion";
import DesignTemplate from "@/components/customisation/DesignTemplate";
import SectionOrder from "@/components/customisation/SectionOrder";
import LayoutSection from "@/components/customisation/LayoutSection";
import FontSection from "@/components/customisation/FontSection";
import SectionHeadings from "@/components/customisation/SectionHeadings";
import SpacingSection from "@/components/customisation/SpacingSection";
import EntryLayout from "@/components/customisation/EntryLayout";
import PersonalDetails from "@/components/customisation/PersonalDetails";
import type { ResumeValues } from "@/lib/validation";
import DesignTokensSection from "@/components/customisation/DesignTokensSection";
import { RESUME_CUSTOMIZATION_TOKENS_BY_ID } from "@/lib/resumeCustomizationTokens";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/components/ResumeStyles/sectionOrder";

function PanelGroup({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

interface CustomizationPanelProps {
  resumeData: ResumeDocument;
  setResumeData: (data: ResumeDocument) => void;
}

export default function CustomizationPanel({
  resumeData,
  setResumeData,
}: CustomizationPanelProps) {
  const noop = () => {};

  const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

  const sectionHasContent = (key: ResumeSectionKey, content: ResumeValues) => {
    switch (key) {
      case "summary":
        return isNonEmptyString(content.summary);
      case "work-experience":
        return (
          Array.isArray(content.workExperiences) &&
          content.workExperiences.some(
            (w) =>
              isNonEmptyString(w?.position) ||
              isNonEmptyString(w?.company) ||
              isNonEmptyString(w?.description) ||
              isNonEmptyString(w?.startDate) ||
              isNonEmptyString(w?.endDate),
          )
        );
      case "projects":
        return (
          Array.isArray(content.projectWorks) && content.projectWorks.length > 0
        );
      case "skills":
        return (
          Array.isArray(content.skills) &&
          content.skills.some(
            (s) =>
              isNonEmptyString(s?.title) ||
              (Array.isArray(s?.skillName) && s.skillName.length > 0),
          )
        );
      case "education":
        return (
          Array.isArray(content.educations) &&
          content.educations.some(
            (e) =>
              isNonEmptyString(e?.degree) ||
              isNonEmptyString(e?.school) ||
              isNonEmptyString(e?.stream) ||
              isNonEmptyString(e?.description),
          )
        );
      case "certification":
        return (
          Array.isArray(content.certifications) &&
          content.certifications.some(
            (c) =>
              isNonEmptyString(c?.title) || isNonEmptyString(c?.description),
          )
        );
      case "interests":
        return (
          isNonEmptyString(content.others?.title) ||
          isNonEmptyString(content.others?.description)
        );
      default:
        return false;
    }
  };

  const setCustomization = (
    patch: NonNullable<ResumeDocument["design"]["customization"]>,
  ) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        customization: {
          ...resumeData.design.customization,
          ...patch,
        },
      },
    });

  // Phase 2: ONLY these are wired (ATS-safe)
  const fontSize = resumeData.design.typography.baseFontSize;
  const setFontSize = (value: number) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        typography: {
          ...resumeData.design.typography,
          baseFontSize: value,
        },
      },
    });

  const spaceBetweenEntries = resumeData.design.spacing.sectionGap;
  const setSpaceBetweenEntries = (value: number) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        spacing: {
          ...resumeData.design.spacing,
          sectionGap: value,
        },
      },
    });

  const headingScale = resumeData.design.typography.headingScale ?? 1.15;
  const setHeadingScale = (value: number) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        typography: {
          ...resumeData.design.typography,
          headingScale: value,
        },
      },
    });

  const borderWidth = resumeData.design.decorations.borderWidth ?? 1;
  const setBorderWidth = (value: number) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        decorations: {
          ...resumeData.design.decorations,
          borderWidth: value,
        },
      },
    });

  // Everything else is intentionally frozen in Phase 2
  const language = "English";
  const dateFormat = resumeData.design.formatting?.dateFormat ?? "MMM yyyy";

  const coerceMonthYearDateFormat = (value: string): string => {
    const v = (value || "").trim();
    switch (v) {
      case "MM/dd/yyyy":
      case "dd/MM/yyyy":
      case "MM/DD/YYYY":
        return "MM/yyyy";
      case "yyyy-MM-dd":
        return "yyyy-MM";
      case "dd.MM.yyyy":
        return "MM.yyyy";
      default:
        break;
    }

    if (/[dD]/.test(v)) return "MMM yyyy";
    return v.length > 0 ? v : "MMM yyyy";
  };

  const normalizedDateFormat = coerceMonthYearDateFormat(dateFormat);
  const setDateFormat = (value: string) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        formatting: {
          ...resumeData.design.formatting,
          dateFormat: coerceMonthYearDateFormat(value),
        },
      },
    });

  useEffect(() => {
    if (dateFormat === normalizedDateFormat) return;
    setDateFormat(normalizedDateFormat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFormat, normalizedDateFormat]);
  const pageFormat = "A4";
  const orderableSteps = steps.filter(
    (step) => step.key !== "general-info" && step.key !== "personal-info",
  );

  // Map step keys to ResumeValues content fields
  const stepKeyToContentKey = (stepKey: string): ResumeSectionKey | null => {
    switch (stepKey) {
      case "summary":
        return "summary";
      case "work-experience":
        return "work-experience";
      case "projects":
        return "projects";
      case "skills":
        return "skills";
      case "education":
        return "education";
      case "certification":
        return "certification";
      case "interests":
        return "interests";
      default:
        return null;
    }
  };

  // Only show sections that have content in the resume
  const sectionsWithContent = orderableSteps
    .map((step) => ({
      key: step.key,
      title: step.title,
      contentKey: stepKeyToContentKey(step.key),
    }))
    .filter(
      (step) =>
        step.contentKey &&
        sectionHasContent(step.contentKey, resumeData.content),
    );

  // Get current section order
  const currentSectionOrder =
    resumeData.design.customization?.sectionOrder ?? [];

  // Include sections that are either in the current order OR have content
  const allRelevantSectionKeys = new Set([
    ...currentSectionOrder,
    ...sectionsWithContent.map((s) => s.key),
  ]);

  const sectionOrder = Array.from(allRelevantSectionKeys)
    .map((key) => {
      const step = orderableSteps.find((s) => s.key === key);
      const contentKey = stepKeyToContentKey(key);

      // Only include if it has content
      if (contentKey && sectionHasContent(contentKey, resumeData.content)) {
        return {
          key,
          title: step?.title ?? key,
        };
      }
      return null;
    })
    .filter((item): item is { key: string; title: string } => item !== null)
    // Sort by current order preference
    .sort((a, b) => {
      const aIndex = currentSectionOrder.indexOf(a.key);
      const bIndex = currentSectionOrder.indexOf(b.key);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

  const setSectionOrder = (sections: { key: string; title: string }[]) => {
    const nextEligibleKeys = sections.map((s) => s.key) as ResumeSectionKey[];
    const nextIter = nextEligibleKeys[Symbol.iterator]();

    const normalized = normalizeSectionOrder(
      resumeData.design.customization?.sectionOrder,
    );

    const merged = normalized.map((key) => {
      if (!sectionHasContent(key, resumeData.content)) return key;
      const next = nextIter.next();
      return (next.done ? key : next.value) as ResumeSectionKey;
    });

    setCustomization({ sectionOrder: merged });
  };

  const columnLayout: "one" | "two" | "mix" =
    resumeData.design.customization?.layout?.columnLayout ?? "two";
  const setColumnLayout = (value: "one" | "two" | "mix") =>
    setCustomization({
      layout: {
        ...resumeData.design.customization?.layout,
        columnLayout: value,
      },
    });

  const isModern4 = resumeData.styleId === "modern4";

  const rawHeaderPosition: "top" | "left" | "right" =
    resumeData.design.customization?.layout?.headerPosition ?? "top";
  const headerPosition: "top" | "left" | "right" =
    isModern4 && (rawHeaderPosition === "top" || rawHeaderPosition === "right")
      ? "left"
      : rawHeaderPosition;
  const setHeaderPosition = (value: "top" | "left" | "right") => {
    if (isModern4 && (value === "top" || value === "right")) return;
    setCustomization({
      layout: {
        ...resumeData.design.customization?.layout,
        headerPosition: value,
      },
    });
  };

  const lineHeight =
    resumeData.design.customization?.spacing?.lineHeight ?? 1.3;
  const setLineHeight = (value: number) =>
    setCustomization({
      spacing: {
        ...resumeData.design.customization?.spacing,
        lineHeight: value,
      },
    });

  const selectedFont =
    resumeData.design.customization?.font?.selectedFont ?? "Lora";
  const setSelectedFont = (value: string) =>
    setCustomization({
      font: {
        ...resumeData.design.customization?.font,
        selectedFont: value,
      },
    });

  const rawHeadingStyle =
    resumeData.design.customization?.sectionHeadings?.headingStyle ?? 1;
  const headingStyle = isModern4 && rawHeadingStyle === 5 ? 1 : rawHeadingStyle;
  const setHeadingStyle = (value: number) => {
    if (isModern4 && value === 5) return;
    setCustomization({
      sectionHeadings: {
        ...resumeData.design.customization?.sectionHeadings,
        headingStyle: value,
      },
    });
  };

  const headingCapitalization: "capitalize" | "uppercase" =
    resumeData.design.customization?.sectionHeadings?.headingCapitalization ??
    "uppercase";
  const setHeadingCapitalization = (value: "capitalize" | "uppercase") =>
    setCustomization({
      sectionHeadings: {
        ...resumeData.design.customization?.sectionHeadings,
        headingCapitalization: value,
      },
    });

  const headingSize: "S" | "M" | "L" | "XL" =
    resumeData.design.customization?.sectionHeadings?.headingSize ?? "S";
  const setHeadingSize = (value: "S" | "M" | "L" | "XL") =>
    setCustomization({
      sectionHeadings: {
        ...resumeData.design.customization?.sectionHeadings,
        headingSize: value,
      },
    });

  const titleSubtitleSize: "S" | "M" | "L" =
    resumeData.design.customization?.entryLayout?.titleSubtitleSize ?? "S";
  const setTitleSubtitleSize = (value: "S" | "M" | "L") =>
    setCustomization({
      entryLayout: {
        ...resumeData.design.customization?.entryLayout,
        titleSubtitleSize: value,
      },
    });

  const subtitleStyle: "normal" | "bold" | "italic" =
    resumeData.design.customization?.entryLayout?.subtitleStyle ?? "normal";
  const setSubtitleStyle = (value: "normal" | "bold" | "italic") =>
    setCustomization({
      entryLayout: {
        ...resumeData.design.customization?.entryLayout,
        subtitleStyle: value,
      },
    });

  const subtitlePlacement: "same-line" | "next-line" =
    resumeData.design.customization?.entryLayout?.subtitlePlacement ??
    "next-line";
  const setSubtitlePlacement = (value: "same-line" | "next-line") =>
    setCustomization({
      entryLayout: {
        ...resumeData.design.customization?.entryLayout,
        subtitlePlacement: value,
      },
    });

  const listStyle: "bullet" | "hyphen" =
    resumeData.design.customization?.entryLayout?.listStyle ?? "bullet";
  const setListStyle = (value: "bullet" | "hyphen") =>
    setCustomization({
      entryLayout: {
        ...resumeData.design.customization?.entryLayout,
        listStyle: value,
      },
    });

  const linkIcon: "none" | "icon1" | "icon2" = "icon1";
  const reduceDateLocationOpacity = false;

  const isAts5 = resumeData.styleId === "ats5";
  const isAts8 = resumeData.styleId === "ats8";
  const isAts10 = resumeData.styleId === "ats10";
  const isAts14 = resumeData.styleId === "ats14";
  const isAts15 = resumeData.styleId === "ats15";
  const detailsAlign: "left" | "center" | "right" = isAts5
    ? "left"
    : isAts10
      ? "left"
      : isAts14
        ? "center"
        : isAts15
          ? "center"
          : (resumeData.design.customization?.personalDetails?.detailsAlign ??
            "center");
  const setDetailsAlign = (value: "left" | "center" | "right") => {
    if (isAts5 && (value === "center" || value === "right")) return; // Prevent setting to center or right for ats5
    if (isAts10 && (value === "center" || value === "right")) return; // Prevent setting to center or right for ats10
    if (isAts14 && (value === "left" || value === "right")) return; // Prevent setting to left or right for ats14
    if (isAts15 && (value === "left" || value === "right")) return; // Prevent setting to left or right for ats15
    setCustomization({
      personalDetails: {
        ...resumeData.design.customization?.personalDetails,
        detailsAlign: value,
      },
    });
  };

  const rawDetailsLayout = resumeData.design.customization?.personalDetails
    ?.detailsLayout as string | undefined;
  const isAts1 = resumeData.styleId === "ats1";
  const isAts2 = resumeData.styleId === "ats2";
  const isAts4 = resumeData.styleId === "ats4";
  const isAts6 = resumeData.styleId === "ats6";
  const isAts7 = resumeData.styleId === "ats7";
  const isModern5 = resumeData.styleId === "modern5";
  const detailsLayout: "stacked" | "compact" =
    isAts1 || isAts2
      ? rawDetailsLayout === "stacked"
        ? "stacked"
        : "compact"
      : isAts4
        ? "stacked"
        : isAts5
          ? "stacked"
          : isAts6
            ? "stacked"
            : isAts7
              ? "stacked"
              : isAts8
                ? rawDetailsLayout === "stacked"
                  ? "stacked"
                  : "compact"
                : isAts10
                  ? rawDetailsLayout === "stacked"
                    ? "stacked"
                    : "compact"
                  : isAts14
                    ? rawDetailsLayout === "stacked"
                      ? "stacked"
                      : "compact"
                    : isAts15
                      ? rawDetailsLayout === "stacked"
                        ? "stacked"
                        : "compact"
                      : isModern5
                        ? rawDetailsLayout === "stacked"
                          ? "stacked"
                          : "compact"
                        : isModern4
                          ? "stacked"
                          : rawDetailsLayout === "compact"
                            ? "compact"
                            : "stacked";
  const setDetailsLayout = (value: "stacked" | "compact") => {
    if ((isAts4 || isAts5 || isAts6 || isAts7) && value === "compact") return; // Prevent setting to compact for ats4, ats5, ats6, ats7
    if (
      (isAts8 || isAts10 || isAts14 || isAts15 || isModern5) &&
      value === "stacked"
    )
      return; // Prevent setting to stacked for ats8, ats10, ats14, ats15, and modern5
    if (isModern4 && value === "compact") return; // Prevent compact for modern4
    setCustomization({
      personalDetails: {
        ...resumeData.design.customization?.personalDetails,
        detailsLayout: value,
      },
    });
  };

  const detailsArrangement: "icon" | "bullet" | "bar" =
    resumeData.design.customization?.personalDetails?.detailsArrangement ??
    "icon";
  const setDetailsArrangement = (value: "icon" | "bullet" | "bar") =>
    setCustomization({
      personalDetails: {
        ...resumeData.design.customization?.personalDetails,
        detailsArrangement: value,
      },
    });

  const nameSize: "XS" | "S" | "M" | "L" | "XL" =
    resumeData.design.customization?.name?.nameSize ?? "L";
  const setNameSize = (value: "XS" | "S" | "M" | "L" | "XL") =>
    setCustomization({
      name: {
        ...resumeData.design.customization?.name,
        nameSize: value,
      },
    });

  const nameBold: boolean =
    resumeData.design.customization?.name?.nameBold ?? true;
  const setNameBold = (value: boolean) =>
    setCustomization({
      name: {
        ...resumeData.design.customization?.name,
        nameBold: value,
      },
    });

  // Source of truth for classification lives in src/lib/resumeCustomizationTokens.ts.
  // These IDs reflect which token-backed controls are present in this panel.
  const bestEffortTokenIds = [
    "data.headerPosition",
    "data.detailsAlign",
    "data.detailsArrangement",
    "data.sectionHeadingStyle",
    "data.sectionHeadingCap",
    "data.sectionHeadingSize",
    "data.sectionHeadingIcons",
    "data.entryTitleSize",
    "data.entrySubtitleStyle",
    "data.entrySubtitlePlacement",
    "data.entryListStyle",
  ] as const;

  const hasBestEffortControls = bestEffortTokenIds.some(
    (id) =>
      RESUME_CUSTOMIZATION_TOKENS_BY_ID.get(id)?.category === "best-effort",
  );

  return (
    <div className="w-full space-y-6 overflow-y-auto px-3 pb-5">
      {/* Apply a Design Template */}
      <DesignTemplate resumeData={resumeData} setResumeData={setResumeData} />

      <PanelGroup title="Basic (Global)">
        {/* Font */}
        <FontSection
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
        />

        {/* Spacing */}
        <SpacingSection
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          spaceBetweenEntries={spaceBetweenEntries}
          setSpaceBetweenEntries={setSpaceBetweenEntries}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
          disableSpaceBetweenEntries={resumeData.styleId?.startsWith("ats")}
        />

        {/* Design tokens */}
        <DesignTokensSection
          headingScale={headingScale}
          setHeadingScale={setHeadingScale}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
        />
      </PanelGroup>

      <PanelGroup
        title="Layout & Style (Template-dependent)"
        description={
          hasBestEffortControls
            ? "These options rely on template structure and runtime tagging; results can vary between templates and some settings may not apply everywhere."
            : undefined
        }
      >
        {/* Layout */}
        <LayoutSection
          columnLayout={columnLayout}
          setColumnLayout={setColumnLayout}
          headerPosition={headerPosition}
          setHeaderPosition={setHeaderPosition}
          styleId={resumeData.styleId}
        />

        <SectionHeadings
          headingStyle={headingStyle}
          setHeadingStyle={setHeadingStyle}
          headingCapitalization={headingCapitalization}
          setHeadingCapitalization={setHeadingCapitalization}
          headingSize={headingSize}
          setHeadingSize={setHeadingSize}
          styleId={resumeData.styleId}
        />

        {/* Entry Layout */}
        <EntryLayout
          titleSubtitleSize={titleSubtitleSize}
          setTitleSubtitleSize={setTitleSubtitleSize}
          subtitleStyle={subtitleStyle}
          setSubtitleStyle={setSubtitleStyle}
          subtitlePlacement={subtitlePlacement}
          setSubtitlePlacement={setSubtitlePlacement}
          listStyle={listStyle}
          setListStyle={setListStyle}
        />

        {/* Personal Details */}
        <PersonalDetails
          detailsAlign={detailsAlign}
          setDetailsAlign={setDetailsAlign}
          detailsLayout={detailsLayout}
          setDetailsLayout={setDetailsLayout}
          detailsArrangement={detailsArrangement}
          setDetailsArrangement={setDetailsArrangement}
          nameSize={nameSize}
          setNameSize={setNameSize}
          nameBold={nameBold}
          setNameBold={setNameBold}
          styleId={resumeData.styleId}
        />
      </PanelGroup>

      <PanelGroup
        title="Content & Region"
        description="These options affect formatting and ordering, not the template’s visual token contract."
      >
        {/* Language & Region */}
        <LanguageRegion
          language={language}
          setLanguage={noop}
          dateFormat={dateFormat}
          setDateFormat={setDateFormat}
          pageFormat={pageFormat}
          setPageFormat={noop}
        />

        {/* Change Section Order */}
        <SectionOrder
          sectionOrder={sectionOrder}
          setSectionOrder={setSectionOrder}
          styleId={resumeData.styleId}
        />
      </PanelGroup>
    </div>
  );
}
