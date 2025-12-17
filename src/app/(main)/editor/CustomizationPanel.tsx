"use client";

import { ResumeValues } from "@/lib/validation";
import { useState } from "react";
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

interface CustomizationPanelProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export default function CustomizationPanel({
  resumeData,
  setResumeData,
}: CustomizationPanelProps) {
  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [pageFormat, setPageFormat] = useState("A4");
  const [sectionOrder, setSectionOrder] = useState(
    steps.map((step) => ({ key: step.key, title: step.title })),
  );

  // Layout state
  const [columnLayout, setColumnLayout] = useState<"one" | "two" | "mix">(
    "two",
  );
  const [headerPosition, setHeaderPosition] = useState<
    "top" | "left" | "right"
  >("right");
  const [leftColumnWidth, setLeftColumnWidth] = useState(50);
  const [rightColumnWidth, setRightColumnWidth] = useState(50);

  // Spacing state
  const [fontSize, setFontSize] = useState(10);
  const [lineHeight, setLineHeight] = useState(1.3);
  const [leftRightMargin, setLeftRightMargin] = useState(18);
  const [topBottomMargin, setTopBottomMargin] = useState(16);
  const [spaceBetweenEntries, setSpaceBetweenEntries] = useState(8);

  // Font state
  const [fontCategory, setFontCategory] = useState<"serif" | "sans" | "mono">(
    "serif",
  );
  const [selectedFont, setSelectedFont] = useState("Lora");

  // Section Headings state
  const [headingStyle, setHeadingStyle] = useState(1);
  const [headingCapitalization, setHeadingCapitalization] = useState<
    "capitalize" | "uppercase"
  >("uppercase");
  const [headingSize, setHeadingSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [headingIcons, setHeadingIcons] = useState<
    "none" | "outline" | "filled"
  >("filled");

  // Entry Layout state
  const [titleSubtitleSize, setTitleSubtitleSize] = useState<"S" | "M" | "L">(
    "S",
  );
  const [subtitleStyle, setSubtitleStyle] = useState<
    "normal" | "bold" | "italic"
  >("normal");
  const [subtitlePlacement, setSubtitlePlacement] = useState<
    "same-line" | "next-line"
  >("next-line");
  const [indentBody, setIndentBody] = useState(false);
  const [listStyle, setListStyle] = useState<"bullet" | "hyphen">("bullet");

  // Footer state
  const [showPageNumbers, setShowPageNumbers] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showName, setShowName] = useState(true);

  // Advanced state
  const [linkIcon, setLinkIcon] = useState<"none" | "icon1" | "icon2">("icon1");
  const [reduceDateLocationOpacity, setReduceDateLocationOpacity] =
    useState(false);

  // Personal Details state
  const [detailsAlign, setDetailsAlign] = useState<"left" | "center" | "right">(
    "center",
  );
  const [detailsArrangement, setDetailsArrangement] = useState<
    "icon" | "bullet" | "bar"
  >("icon");
  const [detailsIconStyle, setDetailsIconStyle] = useState(0);

  // Name state
  const [nameSize, setNameSize] = useState<"XS" | "S" | "M" | "L" | "XL">("L");
  const [nameBold, setNameBold] = useState(true);
  const [nameFont, setNameFont] = useState<"body" | "creative">("body");

  return (
    <div className="w-full space-y-6 overflow-y-auto px-3 pb-5">
      {/* Apply a Design Template */}
      <DesignTemplate />

      {/* Language & Region */}
      <LanguageRegion
        language={language}
        setLanguage={setLanguage}
        dateFormat={dateFormat}
        setDateFormat={setDateFormat}
        pageFormat={pageFormat}
        setPageFormat={setPageFormat}
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
        leftColumnWidth={leftColumnWidth}
        setLeftColumnWidth={setLeftColumnWidth}
        rightColumnWidth={rightColumnWidth}
        setRightColumnWidth={setRightColumnWidth}
      />

      {/* Font */}
      <FontSection
        fontCategory={fontCategory}
        setFontCategory={setFontCategory}
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
      />

      {/* Section Headings */}
      <SectionHeadings
        headingStyle={headingStyle}
        setHeadingStyle={setHeadingStyle}
        headingCapitalization={headingCapitalization}
        setHeadingCapitalization={setHeadingCapitalization}
        headingSize={headingSize}
        setHeadingSize={setHeadingSize}
        headingIcons={headingIcons}
        setHeadingIcons={setHeadingIcons}
      />

      {/* Spacing */}
      <SpacingSection
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        leftRightMargin={leftRightMargin}
        setLeftRightMargin={setLeftRightMargin}
        topBottomMargin={topBottomMargin}
        setTopBottomMargin={setTopBottomMargin}
        spaceBetweenEntries={spaceBetweenEntries}
        setSpaceBetweenEntries={setSpaceBetweenEntries}
      />

      {/* Entry Layout */}
      <EntryLayout
        titleSubtitleSize={titleSubtitleSize}
        setTitleSubtitleSize={setTitleSubtitleSize}
        subtitleStyle={subtitleStyle}
        setSubtitleStyle={setSubtitleStyle}
        subtitlePlacement={subtitlePlacement}
        setSubtitlePlacement={setSubtitlePlacement}
        indentBody={indentBody}
        setIndentBody={setIndentBody}
        listStyle={listStyle}
        setListStyle={setListStyle}
      />

      {/* Footer */}
      <FooterSection
        showPageNumbers={showPageNumbers}
        setShowPageNumbers={setShowPageNumbers}
        showEmail={showEmail}
        setShowEmail={setShowEmail}
        showName={showName}
        setShowName={setShowName}
      />

      {/* Advanced */}
      <AdvancedSection
        linkIcon={linkIcon}
        setLinkIcon={setLinkIcon}
        reduceDateLocationOpacity={reduceDateLocationOpacity}
        setReduceDateLocationOpacity={setReduceDateLocationOpacity}
      />

      {/* Personal Details */}
      <PersonalDetails
        detailsAlign={detailsAlign}
        setDetailsAlign={setDetailsAlign}
        detailsArrangement={detailsArrangement}
        setDetailsArrangement={setDetailsArrangement}
        detailsIconStyle={detailsIconStyle}
        setDetailsIconStyle={setDetailsIconStyle}
      />

      {/* Name */}
      <NameSection
        nameSize={nameSize}
        setNameSize={setNameSize}
        nameBold={nameBold}
        setNameBold={setNameBold}
        nameFont={nameFont}
        setNameFont={setNameFont}
      />
    </div>
  );
}
