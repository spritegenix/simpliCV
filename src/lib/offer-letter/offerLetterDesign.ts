export interface OfferLetterDesign {
  [key: string]: unknown;

  typography?: {
    /** Font family key, e.g. "Inter", "Lora", "Merriweather" */
    fontFamily?: string;
    /** Base font size in px. Default: 14 */
    fontSize?: number;
    /** Line-height multiplier. Default: 1.6 */
    lineHeight?: number;
  };

  signature?: {
    /**
     * Multiplier for the rendered signature image height.
     * 0.5 = small  |  1 = default (h-12)  |  2 = large  |  3 = very large
     */
    scale?: number;
  };

  colors?: {
    /** Primary accent color — used for dividers, headings, wave tints. */
    accent?: string;
    /** Text color inside branded header bands. */
    headerText?: string;
  };
}
