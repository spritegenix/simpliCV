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
import FooterSection from "@/components/customisation/FooterSection";
import AdvancedSection from "@/components/customisation/AdvancedSection";
import PersonalDetails from "@/components/customisation/PersonalDetails";
import NameSection from "@/components/customisation/NameSection";
import {
  SECTION_TITLES,
  getSectionTitle,
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";
import type { ResumeValues } from "@/lib/validation";

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

  const fontCategory: "serif" | "sans" | "mono" =
    resumeData.design.typography.fontFamily === "inter"
      ? "sans"
      : resumeData.design.typography.fontFamily;

  const setFontCategory = (value: "serif" | "sans" | "mono") =>
    setResumeData({
      ...resumeData,
      design: {
        ...resumeData.design,
        typography: {
          ...resumeData.design.typography,
          fontFamily: value === "sans" ? "inter" : value,
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
  const sectionOrderKeys = normalizeSectionOrder(
    resumeData.content.sectionOrder,
  );
  const visibleSectionOrderKeys = sectionOrderKeys.filter((key) =>
    sectionHasContent(key, resumeData.content),
  );

  const sectionOrder = visibleSectionOrderKeys.map((key) => ({
    key,
    title: getSectionTitle(key, {
      othersTitle: resumeData.content.others?.title,
    }),
  }));

  const setSectionOrder = (sections: { key: string; title: string }[]) => {
    const keys = sections
      .map((s) => s.key)
      .filter((k): k is ResumeSectionKey =>
        (Object.keys(SECTION_TITLES) as string[]).includes(k),
      );

    // Only reorder the currently-visible sections; keep hidden sections stable.
    const visibleSet = new Set(visibleSectionOrderKeys);
    let visibleIndex = 0;
    const mergedFullOrder = sectionOrderKeys.map((key) => {
      if (!visibleSet.has(key)) return key;

      const next = keys[visibleIndex];
      visibleIndex += 1;
      return next ?? key;
    });

    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        sectionOrder: mergedFullOrder,
      },
    });
  };

  const columnLayout: "one" | "two" | "mix" = "two";
  const headerPosition: "top" | "left" | "right" = "right";
  const leftColumnWidth = 50;
  const rightColumnWidth = 50;

  const lineHeight = 1.3;
  const leftRightMargin = 18;
  const topBottomMargin = 16;

  const selectedFont = "Lora";
  const headingStyle = 1;
  const headingCapitalization: "capitalize" | "uppercase" = "uppercase";
  const headingSize: "S" | "M" | "L" | "XL" = "M";
  const headingIcons: "none" | "outline" | "filled" = "filled";

  const titleSubtitleSize: "S" | "M" | "L" = "S";
  const subtitleStyle: "normal" | "bold" | "italic" = "normal";
  const subtitlePlacement: "same-line" | "next-line" = "next-line";
  const indentBody = false;
  const listStyle: "bullet" | "hyphen" = "bullet";

  const showPageNumbers = true;
  const showEmail = true;
  const showName = true;

  const linkIcon: "none" | "icon1" | "icon2" = "icon1";
  const reduceDateLocationOpacity = false;

  const detailsAlign: "left" | "center" | "right" = "center";
  const detailsArrangement: "icon" | "bullet" | "bar" = "icon";
  const detailsIconStyle = 0;

  const nameSize: "XS" | "S" | "M" | "L" | "XL" = "L";
  const nameBold = true;
  const nameFont: "body" | "creative" = "body";

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
        setColumnLayout={noop as any}
        headerPosition={headerPosition}
        setHeaderPosition={noop as any}
        leftColumnWidth={leftColumnWidth}
        setLeftColumnWidth={noop}
        rightColumnWidth={rightColumnWidth}
        setRightColumnWidth={noop}
      />

      {/* Font */}
      <FontSection
        fontCategory={fontCategory}
        setFontCategory={setFontCategory}
        selectedFont={selectedFont}
        setSelectedFont={noop}
      />

      {/* Section Headings */}
      <SectionHeadings
        headingStyle={headingStyle}
        setHeadingStyle={noop}
        headingCapitalization={headingCapitalization}
        setHeadingCapitalization={noop as any}
        headingSize={headingSize}
        setHeadingSize={noop as any}
        headingIcons={headingIcons}
        setHeadingIcons={noop as any}
      />

      {/* Spacing */}
      <SpacingSection
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineHeight={lineHeight}
        setLineHeight={noop}
        leftRightMargin={leftRightMargin}
        setLeftRightMargin={noop}
        topBottomMargin={topBottomMargin}
        setTopBottomMargin={noop}
        spaceBetweenEntries={spaceBetweenEntries}
        setSpaceBetweenEntries={setSpaceBetweenEntries}
      />

      {/* Entry Layout */}
      <EntryLayout
        titleSubtitleSize={titleSubtitleSize}
        setTitleSubtitleSize={noop as any}
        subtitleStyle={subtitleStyle}
        setSubtitleStyle={noop as any}
        subtitlePlacement={subtitlePlacement}
        setSubtitlePlacement={noop as any}
        indentBody={indentBody}
        setIndentBody={noop}
        listStyle={listStyle}
        setListStyle={noop as any}
      />

      {/* Footer */}
      <FooterSection
        showPageNumbers={showPageNumbers}
        setShowPageNumbers={noop}
        showEmail={showEmail}
        setShowEmail={noop}
        showName={showName}
        setShowName={noop}
      />

      {/* Advanced */}
      <AdvancedSection
        linkIcon={linkIcon}
        setLinkIcon={noop as any}
        reduceDateLocationOpacity={reduceDateLocationOpacity}
        setReduceDateLocationOpacity={noop}
      />

      {/* Personal Details */}
      <PersonalDetails
        detailsAlign={detailsAlign}
        setDetailsAlign={noop as any}
        detailsArrangement={detailsArrangement}
        setDetailsArrangement={noop as any}
        detailsIconStyle={detailsIconStyle}
        setDetailsIconStyle={noop}
      />

      {/* Name */}
      <NameSection
        nameSize={nameSize}
        setNameSize={noop as any}
        nameBold={nameBold}
        setNameBold={noop}
        nameFont={nameFont}
        setNameFont={noop as any}
      />
    </div>
  );
}
