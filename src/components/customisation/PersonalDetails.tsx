import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalDetailsProps {
  detailsAlign: "left" | "center" | "right";
  setDetailsAlign: (value: "left" | "center" | "right") => void;
  detailsLayout: "stacked" | "compact";
  setDetailsLayout: (value: "stacked" | "compact") => void;
  detailsArrangement: "icon" | "bullet" | "bar";
  setDetailsArrangement: (value: "icon" | "bullet" | "bar") => void;

  // UI-only: name styling controls (may be no-ops depending on wiring).
  nameSize?: "XS" | "S" | "M" | "L" | "XL";
  setNameSize?: (value: "XS" | "S" | "M" | "L" | "XL") => void;
  nameBold?: boolean;
  setNameBold?: (value: boolean) => void;

  styleId?: string;
}

export default function PersonalDetails({
  detailsAlign,
  setDetailsAlign,
  detailsLayout,
  setDetailsLayout,
  detailsArrangement,
  setDetailsArrangement,
  nameSize,
  setNameSize,
  nameBold,
  setNameBold,
  styleId,
}: PersonalDetailsProps) {
  const showNameControls =
    styleId?.startsWith("ats") ||
    (typeof nameSize !== "undefined" &&
      typeof nameBold !== "undefined" &&
      typeof setNameSize === "function" &&
      typeof setNameBold === "function");

  const isStackedDisabled =
    styleId === "ats1" ||
    styleId === "ats8" ||
    styleId === "ats10" ||
    styleId === "ats14" ||
    styleId === "ats15";
  const isCompactDisabled =
    styleId === "ats4" ||
    styleId === "ats5" ||
    styleId === "ats6" ||
    styleId === "ats7";
  const isLeftAlignDisabled = styleId === "ats14" || styleId === "ats15";
  const isCenterAlignDisabled = styleId === "ats5" || styleId === "ats10";
  const isRightAlignDisabled =
    styleId === "ats5" ||
    styleId === "ats10" ||
    styleId === "ats14" ||
    styleId === "ats15";
  const isCompactArrangementDisabled = styleId === "ats5";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Align */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Align</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => !isLeftAlignDisabled && setDetailsAlign("left")}
              disabled={isLeftAlignDisabled}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                isLeftAlignDisabled
                  ? "cursor-not-allowed border-muted bg-muted/20 opacity-50"
                  : detailsAlign === "left"
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-full items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                    <div className="h-1 w-8 bg-muted-foreground/40" />
                  </div>
                  <div className="h-1 w-12 bg-muted-foreground/40" />
                </div>
              </div>
              <span className="text-xs font-medium">Left</span>
            </button>
            <button
              onClick={() =>
                !isCenterAlignDisabled && setDetailsAlign("center")
              }
              disabled={isCenterAlignDisabled}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                isCenterAlignDisabled
                  ? "cursor-not-allowed border-muted bg-muted/20 opacity-50"
                  : detailsAlign === "center"
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-full items-center justify-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary/60" />
                    <div className="h-1 w-8 bg-primary/40" />
                  </div>
                  <div className="mx-auto h-1 w-12 bg-primary/40" />
                </div>
              </div>
              <span className="text-xs font-medium text-primary">Center</span>
            </button>
            <button
              onClick={() => !isRightAlignDisabled && setDetailsAlign("right")}
              disabled={isRightAlignDisabled}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                isRightAlignDisabled
                  ? "cursor-not-allowed border-muted bg-muted/20 opacity-50"
                  : detailsAlign === "right"
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-full items-center justify-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                    <div className="h-1 w-8 bg-muted-foreground/40" />
                  </div>
                  <div className="ml-auto h-1 w-12 bg-muted-foreground/40" />
                </div>
              </div>
              <span className="text-xs font-medium">Right</span>
            </button>
          </div>
        </div>

        {/* Arrangement (Layout) */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Arrangement</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => !isStackedDisabled && setDetailsLayout("stacked")}
              disabled={isStackedDisabled}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                isStackedDisabled
                  ? "cursor-not-allowed border-muted bg-muted/20 opacity-50"
                  : detailsLayout === "stacked"
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-full flex-col justify-center gap-1 rounded bg-muted/50 p-2">
                <div className="h-1 w-1/2 rounded bg-muted-foreground/40" />
                <div className="h-1 w-3/4 rounded bg-muted-foreground/30" />
                <div className="h-1 w-2/3 rounded bg-muted-foreground/30" />
              </div>
              <span className="text-xs font-medium">Stacked</span>
            </button>

            <button
              onClick={() => !isCompactDisabled && setDetailsLayout("compact")}
              disabled={isCompactDisabled}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                isCompactDisabled
                  ? "cursor-not-allowed border-muted bg-muted/20 opacity-50"
                  : detailsLayout === "compact"
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex h-10 w-full flex-wrap items-center justify-center gap-1 rounded bg-muted/50 p-2">
                <div className="h-1 w-1/3 rounded bg-muted-foreground/40" />
                <div className="h-1 w-1/4 rounded bg-muted-foreground/30" />
                <div className="h-1 w-1/4 rounded bg-muted-foreground/30" />
              </div>
              <span className="text-xs font-medium">Compact</span>
            </button>
          </div>
        </div>

        {/* Icon / Bullet / Bar */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Style</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setDetailsArrangement("icon")}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                detailsArrangement === "icon"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Icon
            </button>
            <button
              onClick={() => setDetailsArrangement("bullet")}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                detailsArrangement === "bullet"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              • Bullet
            </button>
            <button
              onClick={() => setDetailsArrangement("bar")}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                detailsArrangement === "bar"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              | Bar
            </button>
          </div>
        </div>

        {showNameControls ? (
          <>
            <div className="h-px w-full bg-border" />
            <div className="space-y-3">
              <div className="text-sm font-medium">Name</div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Size</label>
                <div className="grid grid-cols-5 gap-2">
                  {(["XS", "S", "M", "L", "XL"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setNameSize?.(size)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                        nameSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="name-bold"
                  checked={nameBold}
                  onChange={(e) => setNameBold?.(e.target.checked)}
                  className="h-4 w-4 rounded border-primary accent-primary"
                />
                <label
                  htmlFor="name-bold"
                  className="cursor-pointer text-sm text-primary"
                >
                  Name bold
                </label>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
