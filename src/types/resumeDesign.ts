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
