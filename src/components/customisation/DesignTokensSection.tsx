import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type DensityPreset = "compact" | "normal" | "relaxed";

interface DesignTokensSectionProps {
  headingScale: number;
  setHeadingScale: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
}

export default function DesignTokensSection({
  headingScale,
  setHeadingScale,
  borderWidth,
  setBorderWidth,
}: DesignTokensSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Design</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Heading scale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Heading scale</label>
            <span className="text-sm text-primary">
              {headingScale.toFixed(2)}×
            </span>
          </div>
          <input
            type="range"
            min={0.9}
            max={1.5}
            step={0.01}
            value={headingScale}
            onChange={(e) => setHeadingScale(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>

        {/* Border thickness */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Border thickness</label>
            <span className="text-sm text-primary">{borderWidth}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={borderWidth}
            onChange={(e) => setBorderWidth(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}
