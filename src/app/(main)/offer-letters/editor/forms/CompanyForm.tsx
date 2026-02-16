"use client";

import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";
import CompanyHeaderSection from "../company-details/CompanyHeaderSection";

type CompanySection = OfferLetterValues["company"];

export default function CompanyForm({
  value,
  onChange,
}: OfferEditorFormProps<CompanySection>) {
  return <CompanyHeaderSection value={value} onChange={onChange} />;
}
