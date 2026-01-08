import { OfferLetterValues } from "./types";

export const EMPTY_OFFER_LETTER_VALUES: OfferLetterValues = {
  company: { name: "" },
  candidate: { fullName: "", email: "" },
  job: {
    title: "",
    employmentType: "full-time",
    workLocation: "onsite",
    startDate: "",
  },
  compensation: {
    baseSalary: 0,
    salaryFrequency: "annual",
  },
  legality: {},
  closingSignature: { name: "" },
};
