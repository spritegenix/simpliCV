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
import {
  EMPLOYMENT_TYPES,
  WORK_LOCATIONS,
  type EmploymentType,
  type OfferLetterValues,
  type WorkLocation,
} from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type JobSection = OfferLetterValues["job"];

export default function JobForm({
  value,
  onChange,
}: OfferEditorFormProps<JobSection>) {
  const update = (patch: Partial<JobSection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Job</h2>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Job Title</Label>
          <Input
            value={value.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Software Engineer"
          />
        </div>

        <div className="space-y-1">
          <Label>Department</Label>
          <Input
            value={value.department ?? ""}
            onChange={(e) =>
              update({
                department: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="e.g. Engineering"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Employment Type</Label>
            <Select
              value={value.employmentType}
              onValueChange={(next) =>
                update({ employmentType: next as EmploymentType })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Work Location</Label>
            <Select
              value={value.workLocation}
              onValueChange={(next) =>
                update({ workLocation: next as WorkLocation })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select work location" />
              </SelectTrigger>
              <SelectContent>
                {WORK_LOCATIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={value.startDate}
              onChange={(e) => update({ startDate: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Reporting To</Label>
            <Input
              value={value.reportingTo ?? ""}
              onChange={(e) =>
                update({
                  reportingTo: e.target.value.trim()
                    ? e.target.value
                    : undefined,
                })
              }
              placeholder="e.g. Engineering Manager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
