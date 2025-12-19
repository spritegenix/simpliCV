export type ResumeDesign = {
  color: {
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: "inter" | "serif" | "mono";
    baseFontSize: number;
    headingWeight: number;
  };
  spacing: {
    sectionGap: number;
    itemGap: number;
  };
  layout: {
    type: "one-column";
  };
  decorations: {
    borderStyle: "none" | "solid";
  };
};
