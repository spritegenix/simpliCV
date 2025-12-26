import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalDetailsProps {
  detailsAlign: "left" | "center" | "right";
  setDetailsAlign: (value: "left" | "center" | "right") => void;
  detailsArrangement: "icon" | "bullet" | "bar";
  setDetailsArrangement: (value: "icon" | "bullet" | "bar") => void;
}

export default function PersonalDetails({
  detailsAlign,
  setDetailsAlign,
  detailsArrangement,
  setDetailsArrangement,
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
      </CardContent>
    </Card>
  );
}
