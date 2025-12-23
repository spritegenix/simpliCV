import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LayoutSectionProps {
  columnLayout: "one" | "two" | "mix";
  setColumnLayout: (value: "one" | "two" | "mix") => void;
  headerPosition: "top" | "left" | "right";
  setHeaderPosition: (value: "top" | "left" | "right") => void;
}

export default function LayoutSection({
  columnLayout,
  setColumnLayout,
  headerPosition,
  setHeaderPosition,
}: LayoutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Layout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
    </Card>
  );
}
