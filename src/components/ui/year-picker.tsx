import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface YearPickerProps {
  value?: string;
  onChange: (value: string) => void;
  minYear: number;
  maxYear: number;
  placeholder?: string;
  disabled?: boolean;
}

export const YearPicker = React.forwardRef<
  HTMLButtonElement,
  YearPickerProps
>(({ value, onChange, minYear, maxYear, placeholder = "Year", disabled }, ref) => {
  // Generate years in descending order (most recent first)
  const years = React.useMemo(() => {
    const yearList = [];
    for (let year = maxYear; year >= minYear; year--) {
      yearList.push(year.toString());
    }
    return yearList;
  }, [minYear, maxYear]);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger ref={ref}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[200px]">
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

YearPicker.displayName = "YearPicker";
