import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FontSectionProps {
  fontCategory: "serif" | "sans" | "mono";
  setFontCategory: (value: "serif" | "sans" | "mono") => void;
  selectedFont: string;
  setSelectedFont: (value: string) => void;
}

export default function FontSection({
  fontCategory,
  setFontCategory,
  selectedFont,
  setSelectedFont,
}: FontSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Font</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Font Category */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setFontCategory("serif")}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
              fontCategory === "serif"
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50"
            }`}
          >
            <div
              className={`font-serif text-2xl ${fontCategory === "serif" ? "text-primary" : ""}`}
            >
              Aa
            </div>
            <span
              className={`text-xs font-medium ${fontCategory === "serif" ? "text-primary" : ""}`}
            >
              Serif
            </span>
          </button>
          <button
            onClick={() => setFontCategory("sans")}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
              fontCategory === "sans"
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50"
            }`}
          >
            <div
              className={`font-sans text-2xl ${fontCategory === "sans" ? "text-primary" : ""}`}
            >
              Aa
            </div>
            <span
              className={`text-xs font-medium ${fontCategory === "sans" ? "text-primary" : ""}`}
            >
              Sans
            </span>
          </button>
          <button
            onClick={() => setFontCategory("mono")}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
              fontCategory === "mono"
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50"
            }`}
          >
            <div
              className={`font-mono text-2xl ${fontCategory === "mono" ? "text-primary" : ""}`}
            >
              Aa
            </div>
            <span
              className={`text-xs font-medium ${fontCategory === "mono" ? "text-primary" : ""}`}
            >
              Mono
            </span>
          </button>
        </div>

        {/* Font Selection Grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            "Lora",
            "Source Serif Pro",
            "Zilla Slab",
            "PT Serif",
            "Literata",
            "EB Garamond",
            "Lato Modern",
            "Aleo",
            "Crimson Pro",
            "Cormorant Garamond",
            "Vollkorn",
            "Amiri",
            "Crimson Text",
            "Alegreya",
          ].map((font) => (
            <button
              key={font}
              onClick={() => setSelectedFont(font)}
              className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                selectedFont === font
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              {font}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
