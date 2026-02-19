import { OfferLetterValues } from "./types";

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export const EMPTY_OFFER_LETTER_VALUES: OfferLetterValues = {
  company: { name: "" },
  date: getTodayDateString(),
  candidate: { fullName: "" },
  body: "<p>Dear ______,</p><p></p><p>Sincerely,</p>",
  closingSignature: { name: "" },
};
