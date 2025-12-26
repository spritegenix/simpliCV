"use client";

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
import NameSection from "@/components/customisation/NameSection";
import {
  SECTION_TITLES,
  getSectionTitle,
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";
import type { ResumeValues } from "@/lib/validation";
import DesignTokensSection from "@/components/customisation/DesignTokensSection";

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
      case "workExperiences":
        return (
          Array.isArray(content.workExperiences) &&
          content.workExperiences.length > 0
        );
      case "projectWorks":
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
      case "educations":
        return (
          Array.isArray(content.educations) && content.educations.length > 0
        );
      case "certifications":
        return (
          Array.isArray(content.certifications) &&
          content.certifications.some(
            (c) =>
              isNonEmptyString(c?.title) || isNonEmptyString(c?.description),
          )
        );
      case "others":
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
  const setDateFormat = (value: string) =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        formatting: {
          ...resumeData.design.formatting,
          dateFormat: value,
        },
      },
    });
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
        return "workExperiences";
      case "projects":
        return "projectWorks";
      case "skills":
        return "skills";
      case "education":
        return "educations";
      case "certification":
        return "certifications";
      case "interests":
        return "others";
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

  const setSectionOrder = (sections: { key: string; title: string }[]) =>
    setCustomization({ sectionOrder: sections.map((s) => s.key) });

  const columnLayout: "one" | "two" | "mix" =
    resumeData.design.customization?.layout?.columnLayout ?? "two";
  const setColumnLayout = (value: "one" | "two" | "mix") =>
    setCustomization({
      layout: {
        ...resumeData.design.customization?.layout,
        columnLayout: value,
      },
    });

  const headerPosition: "top" | "left" | "right" =
    resumeData.design.customization?.layout?.headerPosition ?? "top";
  const setHeaderPosition = (value: "top" | "left" | "right") =>
    setCustomization({
      layout: {
        ...resumeData.design.customization?.layout,
        headerPosition: value,
      },
    });

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

  const headingStyle =
    resumeData.design.customization?.sectionHeadings?.headingStyle ?? 1;
  const setHeadingStyle = (value: number) =>
    setCustomization({
      sectionHeadings: {
        ...resumeData.design.customization?.sectionHeadings,
        headingStyle: value,
      },
    });

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

  const detailsAlign: "left" | "center" | "right" =
    resumeData.design.customization?.personalDetails?.detailsAlign ?? "center";
  const setDetailsAlign = (value: "left" | "center" | "right") =>
    setCustomization({
      personalDetails: {
        ...resumeData.design.customization?.personalDetails,
        detailsAlign: value,
      },
    });

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

  const nameSize: "XS" | "S" | "M" | "L" | "XL" = "L";
  const nameBold = true;

  return (
    <div className="w-full space-y-6 overflow-y-auto px-3 pb-5">
      {/* Apply a Design Template */}
      <DesignTemplate resumeData={resumeData} setResumeData={setResumeData} />

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
      />

      {/* Layout */}
      <LayoutSection
        columnLayout={columnLayout}
        setColumnLayout={setColumnLayout}
        headerPosition={headerPosition}
        setHeaderPosition={setHeaderPosition}
      />

      {/* Font */}
      <FontSection
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
      />

      <SectionHeadings
        headingStyle={headingStyle}
        setHeadingStyle={setHeadingStyle}
        headingCapitalization={headingCapitalization}
        setHeadingCapitalization={setHeadingCapitalization}
        headingSize={headingSize}
        setHeadingSize={setHeadingSize}
      />

      {/* Spacing */}
      <SpacingSection
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        spaceBetweenEntries={spaceBetweenEntries}
        setSpaceBetweenEntries={setSpaceBetweenEntries}
      />

      {/* Design tokens */}
      <DesignTokensSection
        headingScale={headingScale}
        setHeadingScale={setHeadingScale}
        borderWidth={borderWidth}
        setBorderWidth={setBorderWidth}
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
        detailsArrangement={detailsArrangement}
        setDetailsArrangement={setDetailsArrangement}
      />

      {/* Name */}
      <NameSection
        nameSize={nameSize}
        setNameSize={noop as any}
        nameBold={nameBold}
        setNameBold={noop}
      />
    </div>
  );
}
