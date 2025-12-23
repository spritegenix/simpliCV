import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FontSectionProps {
  selectedFont: string;
  setSelectedFont: (value: string) => void;
}

export default function FontSection({
  selectedFont,
  setSelectedFont,
}: FontSectionProps) {
  const fontVarByLabel: Record<string, string> = {
    Lora: "var(--font-lora)",
    "Source Serif Pro": "var(--font-source-serif)",
    "Zilla Slab": "var(--font-zilla-slab)",
    "PT Serif": "var(--font-pt-serif)",
    Literata: "var(--font-literata)",
    "EB Garamond": "var(--font-eb-garamond)",
    "Lato Modern": "var(--font-lato)",
    Aleo: "var(--font-aleo)",
    "Crimson Pro": "var(--font-crimson-pro)",
    "Cormorant Garamond": "var(--font-cormorant-garamond)",
    Vollkorn: "var(--font-vollkorn)",
    Amiri: "var(--font-amiri)",
    "Crimson Text": "var(--font-crimson-text)",
    Alegreya: "var(--font-alegreya)",
  };

  const fontLabelList = [
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
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Font</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Font Selection Grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {fontLabelList.map((font) => (
            <button
              key={font}
              onClick={() => setSelectedFont(font)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                selectedFont === font
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
              style={{
                fontFamily: fontVarByLabel[font] ?? undefined,
              }}
            >
              <div className="text-[1.05em] leading-none">Aa</div>
              <div className="mt-1 text-xs leading-tight">{font}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
