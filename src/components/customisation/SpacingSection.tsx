import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpacingSectionProps {
  fontSize: number;
  setFontSize: (value: number) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  spaceBetweenEntries: number;
  setSpaceBetweenEntries: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  disableSpaceBetweenEntries?: boolean;
}

export default function SpacingSection({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  spaceBetweenEntries,
  setSpaceBetweenEntries,
  borderWidth,
  setBorderWidth,
  disableSpaceBetweenEntries = false,
}: SpacingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Spacing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Font Size</label>
            <span className="text-sm text-primary">{fontSize}pt</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={8.5}
              max={16}
              step={0.5}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setFontSize(Math.max(8, fontSize - 0.5))}
              >
                −
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setFontSize(Math.min(16, fontSize + 0.5))}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Line Height */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Line Height</label>
            <span className="text-sm text-primary">{lineHeight}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={2}
              step={0.1}
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setLineHeight(Math.max(1, lineHeight - 0.1))}
              >
                −
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setLineHeight(Math.min(2, lineHeight + 0.1))}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Space between Entries */}
        <div className={`space-y-2${disableSpaceBetweenEntries ? " pointer-events-none opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Space between Entries</label>
            <span className="text-sm text-primary">
              {disableSpaceBetweenEntries ? "N/A" : `${spaceBetweenEntries}mm`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={spaceBetweenEntries}
              disabled={disableSpaceBetweenEntries}
              onChange={(e) => setSpaceBetweenEntries(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={disableSpaceBetweenEntries}
                onClick={() =>
                  setSpaceBetweenEntries(Math.max(0, spaceBetweenEntries - 1))
                }
              >
                −
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={disableSpaceBetweenEntries}
                onClick={() =>
                  setSpaceBetweenEntries(Math.min(20, spaceBetweenEntries + 1))
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Border Thickness */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Border Thickness</label>
            <span className="text-sm text-primary">{borderWidth}px</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={3}
              step={0.5}
              value={borderWidth}
              onChange={(e) => setBorderWidth(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setBorderWidth(Math.max(0, borderWidth - 1))}
              >
                −
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setBorderWidth(Math.min(4, borderWidth + 1))}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
