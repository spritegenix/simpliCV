import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EntryLayoutProps {
  titleSubtitleSize: "S" | "M" | "L";
  setTitleSubtitleSize: (value: "S" | "M" | "L") => void;
  subtitleStyle: "normal" | "bold" | "italic";
  setSubtitleStyle: (value: "normal" | "bold" | "italic") => void;
  subtitlePlacement: "same-line" | "next-line";
  setSubtitlePlacement: (value: "same-line" | "next-line") => void;
  listStyle: "bullet" | "hyphen";
  setListStyle: (value: "bullet" | "hyphen") => void;
}

export default function EntryLayout({
  titleSubtitleSize,
  setTitleSubtitleSize,
  subtitleStyle,
  setSubtitleStyle,
  subtitlePlacement,
  setSubtitlePlacement,
  listStyle,
  setListStyle,
}: EntryLayoutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Entry Layout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Title & subtitle size */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Title & subtitle size</label>
          <div className="grid grid-cols-3 gap-3">
            {(["S", "M", "L"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setTitleSubtitleSize(size)}
                className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                  titleSubtitleSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Subtitle style */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Subtitle style</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSubtitleStyle("normal")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                subtitleStyle === "normal"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSubtitleStyle("bold")}
              className={`rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all ${
                subtitleStyle === "bold"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Bold
            </button>
            <button
              onClick={() => setSubtitleStyle("italic")}
              className={`rounded-lg border-2 px-4 py-2 text-sm italic transition-all ${
                subtitleStyle === "italic"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Italic
            </button>
          </div>
        </div>

        {/* Subtitle placement */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Subtitle placement</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSubtitlePlacement("same-line")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                subtitlePlacement === "same-line"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Try Same Line
            </button>
            <button
              onClick={() => setSubtitlePlacement("next-line")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                subtitlePlacement === "next-line"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              Next Line
            </button>
          </div>
        </div>

        {/* List style */}
        <div className="space-y-3">
          <label className="text-sm font-medium">List style</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setListStyle("bullet")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                listStyle === "bullet"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              • Bullet
            </button>
            <button
              onClick={() => setListStyle("hyphen")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                listStyle === "hyphen"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              − Hyphen
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
