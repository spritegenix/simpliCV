"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Candidate</h2>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Full Name</Label>
          <Input
            value={value.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Full name"
          />
        </div>

        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            value={value.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="email@example.com"
          />
        </div>
      </div>
    </div>
  );
}
