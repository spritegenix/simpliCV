export const DEFAULT_RESUME_SECTION_ORDER = [
  // Note: "general-info" and "personal-info" are editor steps but are not reorderable sections.
  "summary",
  "work-experience",
  "projects",
  "skills",
  "education",
  "certification",
  "interests",
] as const;

export type ResumeSectionKey = (typeof DEFAULT_RESUME_SECTION_ORDER)[number];

export function normalizeSectionOrder(
  customOrder: string[] | undefined,
): ResumeSectionKey[] {
  const allowed = new Set<string>(DEFAULT_RESUME_SECTION_ORDER);

  const fromCustom = (customOrder ?? []).filter(
    (key): key is ResumeSectionKey => allowed.has(key),
  );

  // Append any missing defaults to keep a total order.
  const missing = DEFAULT_RESUME_SECTION_ORDER.filter(
    (key) => !fromCustom.includes(key),
  );

  return [...fromCustom, ...missing];
}

export function createSectionOrderIndex(customOrder: string[] | undefined) {
  const normalized = normalizeSectionOrder(customOrder);
  const index = new Map<string, number>(normalized.map((key, i) => [key, i]));

  return (key: ResumeSectionKey): number => {
    // Put unknowns after knowns.
    return index.get(key) ?? normalized.length;
  };
}
