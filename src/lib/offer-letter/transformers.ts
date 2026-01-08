import { OfferLetterDocument } from "./offerLetterDocument";
import { EMPTY_OFFER_LETTER_VALUES } from "./defaults";
import { OfferLetterValues } from "./types";

export function toOfferLetterDocument(dbRow: {
  content?: any;
  design?: any;
  styleId?: string;
}): OfferLetterDocument {
  return {
    content: dbRow.content ?? EMPTY_OFFER_LETTER_VALUES,
    design: dbRow.design ?? undefined,
    styleId: dbRow.styleId ?? undefined,
  };
}

export function toLegacyOfferLetterValues(
  document: OfferLetterDocument,
): OfferLetterValues {
  return document.content;
}
