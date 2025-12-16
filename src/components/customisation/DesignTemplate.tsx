import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DesignTemplate() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Apply a design template
        </CardTitle>
        <p className="mt-2 text-sm text-muted-foreground">
          Update your entire resume design with one click 🎨
        </p>
      </CardHeader>
      <CardContent>
        {/* Template Preview Grid */}
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((template) => (
            <div
              key={template}
              className="group relative aspect-[8.5/11] cursor-pointer overflow-hidden rounded-lg border-2 border-muted transition-all hover:border-primary hover:shadow-md"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Template</div>
                  <div className="text-2xl font-bold text-muted-foreground/50">
                    {template}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse Templates Button */}
        <Button variant="outline" className="w-full">
          Browse Templates
        </Button>
      </CardContent>
    </Card>
  );
}
