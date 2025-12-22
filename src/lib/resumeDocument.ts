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
    baseFontSize: 10,
    headingWeight: 700,
  },
  spacing: {
    sectionGap: 12,
    itemGap: 6,
  },
  layout: {
    type: "one-column",
  },
  decorations: {
    borderStyle: "solid",
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
