import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdvancedSectionProps {
  linkIcon: "none" | "icon1" | "icon2";
  setLinkIcon: (value: "none" | "icon1" | "icon2") => void;
  reduceDateLocationOpacity: boolean;
  setReduceDateLocationOpacity: (value: boolean) => void;
}

export default function AdvancedSection({
  linkIcon,
  setLinkIcon,
  reduceDateLocationOpacity,
  setReduceDateLocationOpacity,
}: AdvancedSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Advanced</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Link icon */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Link icon</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setLinkIcon("none")}
              className={`rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                linkIcon === "none"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              None
            </button>
            <button
              onClick={() => setLinkIcon("icon1")}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                linkIcon === "icon1"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
            <button
              onClick={() => setLinkIcon("icon2")}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                linkIcon === "icon2"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Date and Location opacity */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Date and Location opacity
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="reduce-opacity"
              checked={reduceDateLocationOpacity}
              onChange={(e) => setReduceDateLocationOpacity(e.target.checked)}
              className="h-4 w-4 rounded border-muted"
            />
            <label htmlFor="reduce-opacity" className="cursor-pointer text-sm">
              Reduce opacity of dates and locations
            </label>
          </div>
        </div>

        {/* More coming soon */}
        <div className="text-center text-sm text-muted-foreground">
          More coming soon 😊
        </div>
      </CardContent>
    </Card>
  );
}
