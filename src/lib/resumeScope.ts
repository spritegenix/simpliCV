export type ResumeScope = "ats" | "modern" | "stylish";

export const RESUME_SCOPES: readonly ResumeScope[] = [
  "ats",
  "modern",
  "stylish",
] as const;

export function deriveResumeScopeFromStyleId(styleId: string): ResumeScope {
  if (styleId.startsWith("ats")) return "ats";
  if (styleId.startsWith("modern")) return "modern";
  if (styleId.startsWith("stylish")) return "stylish";

  throw new Error(`Unknown resume scope for styleId: ${styleId}`);
}
