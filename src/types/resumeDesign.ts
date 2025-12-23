export type ResumeDesign = {
  formatting: {
    /** date-fns format string (e.g. "MMM yyyy", "MM/dd/yyyy") */
    dateFormat: string;
  };
  color: {
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: "inter" | "serif" | "mono";
    baseFontSize: number;
    headingWeight: number;
    headingScale?: number;
  };
  spacing: {
    sectionGap: number;
    itemGap: number;
    density?: "compact" | "normal" | "relaxed";
  };
  layout: {
    type: "one-column";
  };
  decorations: {
    borderStyle: "none" | "solid";
    borderWidth?: number;
  };

  // Extra editor-only customization settings.
  // These are not persisted to the database yet (legacy ResumeValues only stores a subset).
  customization?: {
    languageRegion?: {
      language?: string;
      dateFormat?: string;
      pageFormat?: string;
    };
    sectionOrder?: string[];
    layout?: {
      columnLayout?: "one" | "two" | "mix";
      headerPosition?: "top" | "left" | "right";
      leftColumnWidth?: number;
      rightColumnWidth?: number;
    };
    font?: {
      category?: "serif" | "sans" | "mono";
      selectedFont?: string;
    };
    spacing?: {
      lineHeight?: number;
      leftRightMargin?: number;
      topBottomMargin?: number;
      spaceBetweenEntries?: number;
    };
    sectionHeadings?: {
      headingStyle?: number;
      headingCapitalization?: "capitalize" | "uppercase";
      headingSize?: "S" | "M" | "L" | "XL";
      headingIcons?: "none" | "outline" | "filled";
    };
    entryLayout?: {
      titleSubtitleSize?: "S" | "M" | "L";
      subtitleStyle?: "normal" | "bold" | "italic";
      subtitlePlacement?: "same-line" | "next-line";
      indentBody?: boolean;
      listStyle?: "bullet" | "hyphen";
    };
    footer?: {
      showPageNumbers?: boolean;
      showEmail?: boolean;
      showName?: boolean;
    };
    advanced?: {
      linkIcon?: "none" | "icon1" | "icon2";
      reduceDateLocationOpacity?: boolean;
    };
    personalDetails?: {
      detailsAlign?: "left" | "center" | "right";
      detailsArrangement?: "icon" | "bullet" | "bar";
      detailsIconStyle?: number;
    };
    name?: {
      nameSize?: "XS" | "S" | "M" | "L" | "XL";
      nameBold?: boolean;
      nameFont?: "body" | "creative";
    };
  };
};
