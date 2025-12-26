import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionHeadingsProps {
  headingStyle: number;
  setHeadingStyle: (value: number) => void;
  headingCapitalization: "capitalize" | "uppercase";
  setHeadingCapitalization: (value: "capitalize" | "uppercase") => void;
  headingSize: "S" | "M" | "L" | "XL";
  setHeadingSize: (value: "S" | "M" | "L" | "XL") => void;
}

export default function SectionHeadings({
  headingStyle,
  setHeadingStyle,
  headingCapitalization,
  setHeadingCapitalization,
  headingSize,
  setHeadingSize,
}: SectionHeadingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Section Headings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Style */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Style</label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4, 5, 7].map((style) => (
              <button
                key={style}
                onClick={() => setHeadingStyle(style)}
                className={`flex h-12 items-center justify-center rounded-lg border-2 transition-all ${
                  headingStyle === style
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="w-full px-2">
                  {style === 0 && (
                    <div className="space-y-1">
                      <div className="h-1 w-3/4 bg-muted-foreground/40" />
                      <div className="h-1 w-1/2 bg-muted-foreground/40" />
                    </div>
                  )}
                  {style === 1 && (
                    <div className="space-y-1">
                      <div className="h-1 w-3/4 bg-primary" />
                      <div className="h-1 w-1/2 bg-muted-foreground/40" />
                    </div>
                  )}
                  {style === 2 && (
                    <div className="space-y-1">
                      <div className="h-1 w-3/4 bg-muted-foreground/40" />
                      <div className="h-0.5 w-full border-b-2 border-muted-foreground/40" />
                    </div>
                  )}
                  {style === 3 && (
                    <div className="space-y-1">
                      <div className="h-1 w-3/4 bg-muted-foreground/40" />
                      <div className="h-0.5 w-full border-b-2 border-dotted border-muted-foreground/40" />
                    </div>
                  )}
                  {style === 4 && (
                    <div className="space-y-1">
                      <div className="h-1 w-1/2 bg-muted-foreground/40" />
                    </div>
                  )}
                  {style === 5 && (
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-1/4 bg-muted-foreground/40" />
                      <div className="h-1 w-1/4 bg-muted-foreground/40" />
                    </div>
                  )}
                  {style === 7 && (
                    <div className="space-y-1">
                      <div className="h-1 w-3/4 bg-muted-foreground/40" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Capitalization */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Capitalization</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setHeadingCapitalization("capitalize")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                headingCapitalization === "capitalize"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Capitalize
            </button>
            <button
              onClick={() => setHeadingCapitalization("uppercase")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                headingCapitalization === "uppercase"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Uppercase
            </button>
          </div>
        </div>

        {/* Size */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Size</label>
          <div className="grid grid-cols-4 gap-2">
            {(["S", "M", "L", "XL"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setHeadingSize(size)}
                className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                  headingSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
