export const RESUME_SECTION_KEYS = [
  "summary",
  "workExperiences",
  "projectWorks",
  "skills",
  "educations",
  "certifications",
  "others",
] as const;

export type ResumeSectionKey = (typeof RESUME_SECTION_KEYS)[number];

export const DEFAULT_SECTION_ORDER: ResumeSectionKey[] = [
  "summary",
  "workExperiences",
  "projectWorks",
  "skills",
  "educations",
  "certifications",
  "others",
];

export function normalizeSectionOrder(
  order: string[] | undefined | null,
): ResumeSectionKey[] {
  const seen = new Set<ResumeSectionKey>();
  const normalized: ResumeSectionKey[] = [];

  for (const key of order ?? []) {
    if ((RESUME_SECTION_KEYS as readonly string[]).includes(key)) {
      const typedKey = key as ResumeSectionKey;
      if (!seen.has(typedKey)) {
        seen.add(typedKey);
        normalized.push(typedKey);
      }
    }
  }

  for (const key of DEFAULT_SECTION_ORDER) {
    if (!seen.has(key)) {
      seen.add(key);
      normalized.push(key);
    }
  }

  return normalized;
}

export const SECTION_TITLES: Record<ResumeSectionKey, string> = {
  summary: "Summary",
  workExperiences: "Work Experience",
  projectWorks: "Projects",
  skills: "Skills",
  educations: "Education",
  certifications: "Certifications",
  others: "Other",
};

export function getSectionTitle(
  key: ResumeSectionKey,
  opts?: { othersTitle?: string | null | undefined },
): string {
  if (key === "others") {
    const title = opts?.othersTitle?.trim();
    return title ? title : SECTION_TITLES.others;
  }

  return SECTION_TITLES[key];
}
