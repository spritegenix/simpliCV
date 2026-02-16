"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type DateSection = OfferLetterValues["date"];

export default function DateForm({
  value,
  onChange,
}: OfferEditorFormProps<DateSection>) {
  return (
    <div className="rounded-xl bg-muted/30 p-4 sm:p-6">
      <h2 className="mb-4 text-2xl font-semibold">Date</h2>
      <div className="space-y-1">
        <Label>Date</Label>
        <Input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Select date"
        />
      </div>
    </div>
  );
}
