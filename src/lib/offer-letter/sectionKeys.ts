export const OFFER_LETTER_SECTION_KEYS = [
  "company",
  "candidate",
  "job",
  "compensation",
  "legality",
  "closingSignature",
] as const

export type OfferLetterSectionKey =
  typeof OFFER_LETTER_SECTION_KEYS[number]
