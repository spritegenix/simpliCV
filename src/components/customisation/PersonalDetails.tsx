import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalDetailsProps {
  detailsAlign: "left" | "center" | "right";
  setDetailsAlign: (value: "left" | "center" | "right") => void;
  detailsArrangement: "icon" | "bullet" | "bar";
  setDetailsArrangement: (value: "icon" | "bullet" | "bar") => void;
  detailsIconStyle: number;
  setDetailsIconStyle: (value: number) => void;
}

export default function PersonalDetails({
  detailsAlign,
  setDetailsAlign,
  detailsArrangement,
  setDetailsArrangement,
  detailsIconStyle,
  setDetailsIconStyle,
}: PersonalDetailsProps) {
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
              onClick={() => setDetailsAlign("left")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                detailsAlign === "left"
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
              onClick={() => setDetailsAlign("center")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                detailsAlign === "center"
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
              onClick={() => setDetailsAlign("right")}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                detailsAlign === "right"
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

        {/* Arrangement */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Arrangement</label>
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
              + Bullet
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

        {/* Icon Style */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Icon Style</label>
          <div className="grid grid-cols-7 gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((style) => (
              <button
                key={style}
                onClick={() => setDetailsIconStyle(style)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all ${
                  detailsIconStyle === style
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted text-muted-foreground hover:border-primary/50"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {style === 0 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  )}
                  {style === 1 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  )}
                  {style === 2 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  )}
                  {style === 3 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  )}
                  {style === 4 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  )}
                  {style === 5 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  )}
                  {style === 6 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
