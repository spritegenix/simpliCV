import { OfferLetterDocument } from "./offerLetterDocument";
import { EMPTY_OFFER_LETTER_VALUES } from "./defaults";
import { OfferLetterValues } from "./types";

export function toOfferLetterDocument(dbRow: {
  content?: any;
  design?: any;
  styleId?: string;
}): OfferLetterDocument {
  const raw = dbRow.content;
  const isObject = (value: unknown): value is Record<string, unknown> =>
    !!value && typeof value === "object";

  const rawCompany =
    isObject(raw) && isObject(raw.company) ? (raw.company as any) : undefined;

  const rawCandidate =
    isObject(raw) && isObject(raw.candidate)
      ? (raw.candidate as any)
      : undefined;

  const rawClosingSignature =
    isObject(raw) && isObject(raw.closingSignature)
      ? (raw.closingSignature as any)
      : undefined;

  const rawDate =
    isObject(raw) && typeof raw.date === "string" ? raw.date : undefined;
  const rawBody =
    isObject(raw) && typeof raw.body === "string" ? raw.body : undefined;

  return {
    content: {
      company: {
        ...EMPTY_OFFER_LETTER_VALUES.company,
        ...(rawCompany ?? {}),
      },
      date: rawDate ?? EMPTY_OFFER_LETTER_VALUES.date,
      candidate: {
        ...EMPTY_OFFER_LETTER_VALUES.candidate,
        ...(rawCandidate ?? {}),
      },
      body: rawBody ?? EMPTY_OFFER_LETTER_VALUES.body,
      closingSignature: {
        ...EMPTY_OFFER_LETTER_VALUES.closingSignature,
        ...(rawClosingSignature ?? {}),
      },
    },
    design: dbRow.design ?? undefined,
    styleId: dbRow.styleId ?? undefined,
  };
}

export function toLegacyOfferLetterValues(
  document: OfferLetterDocument,
): OfferLetterValues {
  return document.content;
}
