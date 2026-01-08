"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type CompanySection = OfferLetterValues["company"];

export default function CompanyForm({
  value,
  onChange,
}: OfferEditorFormProps<CompanySection>) {
  const update = (patch: Partial<CompanySection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Company</h2>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Company Name</Label>
          <Input
            value={value.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Company name"
          />
        </div>

        <div className="space-y-1">
          <Label>Company Logo URL</Label>
          <Input
            value={value.logoUrl ?? ""}
            onChange={(e) =>
              update({
                logoUrl: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="https://..."
          />
        </div>

        <div className="space-y-1">
          <Label>Hiring Manager Title</Label>
          <Input
            value={value.hiringManagerTitle ?? ""}
            onChange={(e) =>
              update({
                hiringManagerTitle: e.target.value.trim()
                  ? e.target.value
                  : undefined,
              })
            }
            placeholder="e.g. Head of Engineering"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Company Email</Label>
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
            <Label>Company Phone</Label>
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

        <div className="space-y-1">
          <Label>Company Website</Label>
          <Input
            type="url"
            value={value.website ?? ""}
            onChange={(e) =>
              update({
                website: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="https://company.com"
          />
        </div>
      </div>
    </div>
  );
}
