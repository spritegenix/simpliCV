"use client";

import { RichTextEditor } from "@/components/RichTextEditor";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type BodySection = OfferLetterValues["body"];

export default function BodyForm({
  value,
  onChange,
}: OfferEditorFormProps<BodySection>) {
  return (
    <div className="rounded-xl bg-muted/30 p-4 sm:p-6">
      <h2 className="mb-4 text-2xl font-semibold">Letter Body</h2>
      <RichTextEditor value={value} onChange={onChange} />
    </div>
  );
}
