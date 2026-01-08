"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type LegalitySection = OfferLetterValues["legality"];

export default function LegalityForm({
  value,
  onChange,
}: OfferEditorFormProps<LegalitySection>) {
  const update = (patch: Partial<LegalitySection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Legality</h2>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Offer Valid Until</Label>
          <Input
            type="date"
            value={value.offerValidUntil ?? ""}
            onChange={(e) =>
              update({
                offerValidUntil: e.target.value.trim()
                  ? e.target.value
                  : undefined,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
