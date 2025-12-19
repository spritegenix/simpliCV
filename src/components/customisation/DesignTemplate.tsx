"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useResumeTemplateCategoryState,
  useStyleAsideState,
} from "@/app/(main)/editor/styleAsideState";
import { resumeStyles } from "@/components/ResumeStyles/Styles";
import { Card as TemplateCard } from "@/app/(resumeSample)/templates/TemplateCard";
import { useRouter, useSearchParams } from "next/navigation";
import { ResumeDocument } from "@/types/resumeDocument";
import { cn } from "@/lib/utils";

export default function DesignTemplate({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeDocument;
  setResumeData: (data: ResumeDocument) => void;
}) {
  const { setOpen } = useStyleAsideState();
  const { selectedCategory } = useResumeTemplateCategoryState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const visibleStyles = resumeStyles
    .filter((style) => style.category?.includes(selectedCategory))
    .slice(0, 5);

  function applyTemplate(styleId: string) {
    setResumeData({
      ...resumeData,
      styleId,
    });

    // Keep URL in sync (so preview + download reflect the selected template)
    const params = new URLSearchParams(searchParams.toString());
    params.set("styleId", styleId);
    router.replace(`/editor?${params.toString()}`);
  }

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
          {visibleStyles.map((style) => (
            <div
              key={style.id}
              className={cn(
                "relative aspect-[8.5/11] cursor-pointer overflow-hidden rounded-lg border-2 border-muted transition-all hover:border-primary hover:shadow-md",
                style.id === resumeData.styleId && "border-primary",
              )}
              onClick={() => applyTemplate(style.id)}
              title={style.name}
            >
              <TemplateCard style={style} />
            </div>
          ))}
        </div>

        {/* Browse Templates Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setOpen(true)}
        >
          Browse Templates
        </Button>
      </CardContent>
    </Card>
  );
}
