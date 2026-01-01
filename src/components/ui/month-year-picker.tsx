"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const MONTHS: Array<{ label: string; month: number }> = [
  { label: "Jan", month: 1 },
  { label: "Feb", month: 2 },
  { label: "Mar", month: 3 },
  { label: "Apr", month: 4 },
  { label: "May", month: 5 },
  { label: "Jun", month: 6 },
  { label: "Jul", month: 7 },
  { label: "Aug", month: 8 },
  { label: "Sep", month: 9 },
  { label: "Oct", month: 10 },
  { label: "Nov", month: 11 },
  { label: "Dec", month: 12 },
];

function toTwoDigits(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function parseYearMonth(
  value?: string | null,
): { year: number; month: number } | null {
  if (!value) return null;

  // Supports ISO-like values: YYYY-MM or YYYY-MM-DD
  const isoMatch = value.match(/^(\d{4})-(\d{2})/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    if (Number.isFinite(year) && month >= 1 && month <= 12)
      return { year, month };
  }

  // Supports display values: MM/YYYY
  const mmYYYY = value.match(/^(\d{1,2})\/(\d{4})$/);
  if (mmYYYY) {
    const month = Number(mmYYYY[1]);
    const year = Number(mmYYYY[2]);
    if (Number.isFinite(year) && month >= 1 && month <= 12)
      return { year, month };
  }

  return null;
}

function formatDisplay(year: number, month: number): string {
  return `${toTwoDigits(month)}/${year}`;
}

function toIsoDate(year: number, month: number): string {
  // Always store a real date string to keep downstream formatting consistent.
  // Day is fixed to 01 since UI is month/year.
  return `${year}-${toTwoDigits(month)}-01`;
}

interface MonthYearPickerProps {
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minYear?: number;
  maxYear?: number;
  className?: string;
}

export function MonthYearPicker({
  value,
  onChange,
  placeholder = "MM/YYYY",
  disabled,
  minYear,
  maxYear,
  className,
}: MonthYearPickerProps) {
  const parsed = React.useMemo(() => parseYearMonth(value), [value]);
  const now = React.useMemo(() => new Date(), []);

  const resolvedMinYear = minYear ?? now.getFullYear() - 50;
  const resolvedMaxYear = maxYear ?? now.getFullYear() + 6;

  const [open, setOpen] = React.useState(false);

  const [activeYear, setActiveYear] = React.useState<number>(
    parsed?.year ?? now.getFullYear(),
  );
  const [activeMonth, setActiveMonth] = React.useState<number | null>(
    parsed?.month ?? null,
  );

  React.useEffect(() => {
    if (!open) return;
    if (parsed) {
      setActiveYear(parsed.year);
      setActiveMonth(parsed.month);
    } else {
      setActiveYear(now.getFullYear());
      setActiveMonth(null);
    }
  }, [open, parsed, now]);

  const years = React.useMemo(() => {
    const list: number[] = [];
    for (let y = resolvedMaxYear; y >= resolvedMinYear; y--) list.push(y);
    return list;
  }, [resolvedMinYear, resolvedMaxYear]);

  const displayValue = parsed ? formatDisplay(parsed.year, parsed.month) : "";

  const handlePick = (year: number, month: number) => {
    onChange(toIsoDate(year, month));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled ? "true" : "false"}
          className={cn(
            "relative flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            disabled && "pointer-events-none opacity-50",
            className,
          )}
          onClick={() => {
            if (disabled) return;
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
        >
          <span className={cn(!displayValue && "text-muted-foreground")}>
            {displayValue || placeholder}
          </span>

          {displayValue ? (
            <button
              type="button"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              )}
              aria-label="Clear date"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-3" align="start">
        <div className="grid grid-cols-[1fr,96px] gap-3">
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map(({ label, month }) => {
              const selected =
                parsed?.year === activeYear && parsed?.month === month;
              const isActive = activeMonth === month;

              return (
                <button
                  key={month}
                  type="button"
                  className={cn(
                    "h-9 rounded-md text-sm font-medium transition-colors",
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    (isActive || selected) &&
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                  onClick={() => {
                    setActiveMonth(month);
                    handlePick(activeYear, month);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="max-h-52 overflow-y-auto pr-1">
            <div className="flex flex-col gap-1">
              {years.map((year) => {
                const selected = year === parsed?.year;
                const active = year === activeYear;

                return (
                  <button
                    key={year}
                    type="button"
                    className={cn(
                      "h-9 rounded-md px-2 text-sm font-medium transition-colors",
                      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      (active || selected) &&
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                    onClick={() => {
                      setActiveYear(year);
                      // Keep selection open; user picks month next.
                    }}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
