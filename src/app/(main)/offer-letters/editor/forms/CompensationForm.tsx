"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  SALARY_FREQUENCIES,
  type OfferLetterValues,
  type SalaryFrequency,
} from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type CompensationSection = OfferLetterValues["compensation"];

export default function CompensationForm({
  value,
  onChange,
}: OfferEditorFormProps<CompensationSection>) {
  const update = (patch: Partial<CompensationSection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Compensation</h2>
      </div>

      <div className="grid gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Base Salary</Label>
            <Input
              type="number"
              value={Number.isFinite(value.baseSalary) ? value.baseSalary : 0}
              onChange={(e) => {
                const raw = e.target.value;
                update({ baseSalary: raw === "" ? 0 : Number(raw) });
              }}
            />
          </div>

          <div className="space-y-1">
            <Label>Salary Frequency</Label>
            <Select
              value={value.salaryFrequency}
              onValueChange={(next) =>
                update({ salaryFrequency: next as SalaryFrequency })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {SALARY_FREQUENCIES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1">
          <Label>Benefits</Label>
          <Textarea
            value={value.benefits ?? ""}
            onChange={(e) =>
              update({
                benefits: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="Benefits details"
          />
        </div>

        <div className="space-y-1">
          <Label>Incentives</Label>
          <Textarea
            value={value.incentives ?? ""}
            onChange={(e) =>
              update({
                incentives: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="Incentives details"
          />
        </div>
      </div>
    </div>
  );
}
