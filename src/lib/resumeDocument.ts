import { ResumeDesign } from "@/types/resumeDesign";
import { ResumeDocument } from "@/types/resumeDocument";
import { ResumeValues } from "@/lib/validation";
import { getResumeDateFormat } from "@/lib/utils";

export const DEFAULT_STYLE_ID = "ats1";

export const defaultResumeDesign: ResumeDesign = {
  formatting: {
    // Keep current default look for most templates
    dateFormat: "MMM yyyy",
  },
  color: {
    text: "#000000",
    accent: "#41224a",
  },
  typography: {
    fontFamily: "inter",
    baseFontSize: 12,
    headingWeight: 700,
    headingScale: 1.15,
  },
  spacing: {
    sectionGap: 12,
    itemGap: 6,
    density: "normal",
  },
  layout: {
    type: "one-column",
  },
  decorations: {
    borderStyle: "solid",
    borderWidth: 1,
  },
  customization: {
    languageRegion: {
      language: "English",
      dateFormat: "MM/DD/YYYY",
      pageFormat: "A4",
    },
    // Default order follows the editor steps order.
    sectionOrder: undefined,
    layout: {
      columnLayout: "two",
      headerPosition: "right",
      leftColumnWidth: 50,
      rightColumnWidth: 50,
    },
    font: {
      category: "sans",
      selectedFont: "Lora",
    },
    spacing: {
      lineHeight: 1.3,
      leftRightMargin: 24,
      topBottomMargin: 24,
      spaceBetweenEntries: 12,
    },
    sectionHeadings: {
      headingStyle: 1,
      headingCapitalization: "uppercase",
      headingSize: "S",
      headingIcons: "filled",
    },
    entryLayout: {
      titleSubtitleSize: "S",
      subtitleStyle: "normal",
      subtitlePlacement: "next-line",
      indentBody: false,
      listStyle: "bullet",
    },
    footer: {
      showPageNumbers: true,
      showEmail: true,
      showName: true,
    },
    advanced: {
      linkIcon: "icon1",
      reduceDateLocationOpacity: false,
    },
    personalDetails: {
      detailsAlign: "center",
      detailsArrangement: "icon",
      detailsIconStyle: 0,
    },
    name: {
      nameSize: "L",
      nameBold: true,
      nameFont: "body",
    },
  },
};

export function createEmptyResumeDocument(): ResumeDocument {
  return {
    content: {},
    design: defaultResumeDesign,
    styleId: DEFAULT_STYLE_ID,
  };
}

export function deriveDesignFromLegacy(legacy: ResumeValues): ResumeDesign {
  return {
    ...defaultResumeDesign,
    formatting: {
      ...defaultResumeDesign.formatting,
      dateFormat: getResumeDateFormat(
        legacy.dateFormat,
        defaultResumeDesign.formatting.dateFormat,
      ),
    },
    color: {
      ...defaultResumeDesign.color,
      accent: legacy.colorHex || defaultResumeDesign.color.accent,
    },
    typography: {
      ...defaultResumeDesign.typography,
      baseFontSize:
        typeof legacy.baseFontSize === "number"
          ? legacy.baseFontSize
          : defaultResumeDesign.typography.baseFontSize,
    },
    decorations: {
      ...defaultResumeDesign.decorations,
      borderStyle: legacy.borderStyle ? "solid" : "none",
    },
  };
}

export function applyDesignToLegacy(
  legacy: ResumeValues,
  design: ResumeDesign,
  styleId: string,
): ResumeValues {
  const isAts = styleId.startsWith("ats");

  return {
    ...legacy,
    dateFormat: design.formatting.dateFormat,
    ...(isAts
      ? {
          colorHex: design.color.accent,
          baseFontSize: design.typography.baseFontSize,
        }
      : null),
    styleId,
  };
}

export function toLegacyResumeValues(doc: ResumeDocument): ResumeValues {
  return applyDesignToLegacy(doc.content, doc.design, doc.styleId);
}

export function toResumeDocument(legacy: ResumeValues): ResumeDocument {
  const styleId = legacy.styleId || DEFAULT_STYLE_ID;
  const design = deriveDesignFromLegacy(legacy);

  return {
    content: applyDesignToLegacy(legacy, design, styleId),
    design,
    styleId,
  };
}
