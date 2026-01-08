"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type ClosingSignatureSection = OfferLetterValues["closingSignature"];

export default function ClosingSignatureForm({
  value,
  onChange,
}: OfferEditorFormProps<ClosingSignatureSection>) {
  const update = (patch: Partial<ClosingSignatureSection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Signature</h2>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Sign-off</Label>
          <Input
            value={value.signOff ?? ""}
            onChange={(e) =>
              update({
                signOff: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder='e.g. "Sincerely"'
          />
        </div>

        <div className="space-y-1">
          <Label>Name</Label>
          <Input
            value={value.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              value={value.title ?? ""}
              onChange={(e) =>
                update({
                  title: e.target.value.trim() ? e.target.value : undefined,
                })
              }
              placeholder="e.g. HR Manager"
            />
          </div>

          <div className="space-y-1">
            <Label>Company Name</Label>
            <Input
              value={value.companyName ?? ""}
              onChange={(e) =>
                update({
                  companyName: e.target.value.trim()
                    ? e.target.value
                    : undefined,
                })
              }
              placeholder="Company"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={value.email ?? ""}
              onChange={(e) =>
                update({
                  email: e.target.value.trim() ? e.target.value : undefined,
                })
              }
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-1">
            <Label>Phone</Label>
            <Input
              value={value.phone ?? ""}
              onChange={(e) =>
                update({
                  phone: e.target.value.trim() ? e.target.value : undefined,
                })
              }
              placeholder="Phone"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
