"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type CandidateSection = OfferLetterValues["candidate"];

export default function CandidateForm({
  value,
  onChange,
}: OfferEditorFormProps<CandidateSection>) {
  const update = (patch: Partial<CandidateSection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  return (
    <div className="rounded-xl bg-muted/30 p-4 sm:p-6">
      <h2 className="mb-4 text-2xl font-semibold">Candidate Details</h2>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Candidate Name</Label>
          <Input
            value={value.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Enter candidate name"
          />
        </div>

        <div className="space-y-1">
          <Label>Address</Label>
          <Textarea
            value={value.address ?? ""}
            onChange={(e) =>
              update({
                address: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="Enter candidate address"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
