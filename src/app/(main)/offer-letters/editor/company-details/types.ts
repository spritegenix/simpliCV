import type {
  CompanyLogoSource,
  OfferLetterValues,
} from "@/lib/offer-letter/types";

export type CompanyHeaderValues = OfferLetterValues["company"];

export type CompanyLogoValue = CompanyLogoSource | undefined;
