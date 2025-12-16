import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LayoutSectionProps {
  columnLayout: "one" | "two" | "mix";
  setColumnLayout: (value: "one" | "two" | "mix") => void;
  headerPosition: "top" | "left" | "right";
  setHeaderPosition: (value: "top" | "left" | "right") => void;
  leftColumnWidth: number;
  setLeftColumnWidth: (value: number) => void;
  rightColumnWidth: number;
  setRightColumnWidth: (value: number) => void;
}

export default function LayoutSection({
  columnLayout,
  setColumnLayout,
  headerPosition,
  setHeaderPosition,
  leftColumnWidth,
  setLeftColumnWidth,
  rightColumnWidth,
  setRightColumnWidth,
}: LayoutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Layout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Columns */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Columns</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setColumnLayout("one")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                columnLayout === "one"
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-12 w-full items-center justify-center rounded bg-muted/50">
                <div className="h-8 w-3/4 rounded bg-primary/30" />
              </div>
              <span className="text-xs font-medium text-primary">One</span>
            </button>
            <button
              onClick={() => setColumnLayout("two")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                columnLayout === "two"
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-12 w-full gap-1 rounded bg-muted/50 p-1">
                <div className="h-full w-1/2 rounded bg-primary/60" />
                <div className="h-full w-1/2 rounded bg-primary/30" />
              </div>
              <span className="text-xs font-medium text-primary">Two</span>
            </button>
            <button
              onClick={() => setColumnLayout("mix")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                columnLayout === "mix"
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-12 w-full gap-1 rounded bg-muted/50 p-1">
                <div className="h-full w-1/3 rounded bg-primary/60" />
                <div className="h-full w-2/3 rounded bg-primary/30" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Mix
              </span>
            </button>
          </div>
        </div>

        {/* Header Position */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Header Position</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setHeaderPosition("top")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                headerPosition === "top"
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-12 w-full flex-col gap-1 rounded bg-muted/50 p-1">
                <div className="h-1/3 w-full rounded bg-muted-foreground/40" />
                <div className="h-2/3 w-full rounded bg-muted-foreground/20" />
              </div>
              <span className="text-xs font-medium">Top</span>
            </button>
            <button
              onClick={() => setHeaderPosition("left")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                headerPosition === "left"
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-12 w-full gap-1 rounded bg-muted/50 p-1">
                <div className="h-full w-1/3 rounded bg-muted-foreground/40" />
                <div className="h-full w-2/3 rounded bg-muted-foreground/20" />
              </div>
              <span className="text-xs font-medium">Left</span>
            </button>
            <button
              onClick={() => setHeaderPosition("right")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                headerPosition === "right"
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-12 w-full gap-1 rounded bg-muted/50 p-1">
                <div className="h-full w-2/3 rounded bg-muted-foreground/20" />
                <div className="h-full w-1/3 rounded bg-primary/60" />
              </div>
              <span className="text-xs font-medium text-primary">Right</span>
            </button>
          </div>
        </div>

        {/* Column Width */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Column Width</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">
                Left {leftColumnWidth}%
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={leftColumnWidth}
                  onChange={(e) => setLeftColumnWidth(Number(e.target.value))}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  min={20}
                  max={80}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() =>
                    setLeftColumnWidth(Math.min(80, leftColumnWidth + 5))
                  }
                >
                  +
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">
                Right {rightColumnWidth}%
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={rightColumnWidth}
                  onChange={(e) => setRightColumnWidth(Number(e.target.value))}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  min={20}
                  max={80}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() =>
                    setRightColumnWidth(Math.min(80, rightColumnWidth + 5))
                  }
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
