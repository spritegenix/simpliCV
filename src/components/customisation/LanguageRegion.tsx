import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MMM yyyy">MMM YYYY</SelectItem>
                <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                <SelectItem value="dd.MM.yyyy">DD.MM.YYYY</SelectItem>
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
