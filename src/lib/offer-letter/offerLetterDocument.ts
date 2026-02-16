import { OfferLetterValues } from "./types";
import { OfferLetterDesign } from "./offerLetterDesign";

export interface OfferLetterDocument {
  content: OfferLetterValues;
  design?: OfferLetterDesign;
  styleId?: string;
}
