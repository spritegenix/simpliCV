import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NameSectionProps {
  nameSize: "XS" | "S" | "M" | "L" | "XL";
  setNameSize: (value: "XS" | "S" | "M" | "L" | "XL") => void;
  nameBold: boolean;
  setNameBold: (value: boolean) => void;
}

export default function NameSection({
  nameSize,
  setNameSize,
  nameBold,
  setNameBold,
}: NameSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Size</label>
          <div className="grid grid-cols-5 gap-2">
            {(["XS", "S", "M", "L", "XL"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setNameSize(size)}
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

        {/* Name bold checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="name-bold"
            checked={nameBold}
            onChange={(e) => setNameBold(e.target.checked)}
            className="h-4 w-4 rounded border-primary accent-primary"
          />
          <label
            htmlFor="name-bold"
            className="cursor-pointer text-sm text-primary"
          >
            Name bold
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
