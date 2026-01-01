import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format as formatDate } from "date-fns";

const MONTH_YEAR_DATE_FORMATS = [
  "MMM yyyy",
  "MM/yyyy",
  "yyyy-MM",
  "MM.yyyy",
] as const;
type MonthYearDateFormat = (typeof MONTH_YEAR_DATE_FORMATS)[number];

const DATE_FORMAT_OPTIONS: Array<{
  value: MonthYearDateFormat;
  label: string;
}> = [
  { value: "MMM yyyy", label: "MMM YYYY" },
  { value: "MM/yyyy", label: "MM/YYYY" },
  { value: "yyyy-MM", label: "YYYY-MM" },
  { value: "MM.yyyy", label: "MM.YYYY" },
];

function safeFormatExample(date: Date, fmt: string): string {
  try {
    return formatDate(date, fmt);
  } catch {
    return "";
  }
}

function normalizeToMonthYearDateFormat(value: string): MonthYearDateFormat {
  const v = (value || "").trim();

  // Known legacy / day-inclusive formats (including Moment-style tokens)
  switch (v) {
    case "MM/dd/yyyy":
    case "dd/MM/yyyy":
    case "MM/DD/YYYY":
      return "MM/yyyy";
    case "yyyy-MM-dd":
      return "yyyy-MM";
    case "dd.MM.yyyy":
      return "MM.yyyy";
    default:
      break;
  }

  if ((MONTH_YEAR_DATE_FORMATS as readonly string[]).includes(v)) {
    return v as MonthYearDateFormat;
  }

  // If it looks like it includes day tokens, force a safe month-year default.
  if (/[dD]/.test(v)) {
    return "MMM yyyy";
  }

  // Unknown custom value -> default to a safe month-year format.
  return "MMM yyyy";
}

interface LanguageRegionProps {
  language: string;
  setLanguage: (value: string) => void;
  dateFormat: string;
  setDateFormat: (value: string) => void;
  pageFormat: string;
  setPageFormat: (value: string) => void;
}

export default function LanguageRegion({
  language,
  setLanguage,
  dateFormat,
  setDateFormat,
  pageFormat,
  setPageFormat,
}: LanguageRegionProps) {
  const normalizedDateFormat = normalizeToMonthYearDateFormat(dateFormat);
  const previewDate = new Date(2026, 0, 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Language & Region
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Format Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Format</label>
            <Select
              value={normalizedDateFormat}
              onValueChange={(value) =>
                setDateFormat(normalizeToMonthYearDateFormat(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent className="w-[260px]">
                {DATE_FORMAT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <span className="flex w-full items-center justify-between gap-4">
                      <span>{opt.label}</span>
                      <span className="text-muted-foreground">
                        {safeFormatExample(previewDate, opt.value)}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page Format Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Page Format</label>
            <Select value={pageFormat} onValueChange={setPageFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select page format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
