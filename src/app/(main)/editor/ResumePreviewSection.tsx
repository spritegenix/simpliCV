// import ResumePreview from "@/components/ResumeStyles/ResumePreview";
"use client";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";
import FullScreenPreviewButton from "./FullScreenPreviewButton";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";
import { resumeStyles } from "@/components/ResumeStyles/Styles";
import { useSearchParams } from "next/navigation";
import { env } from "@/env";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useDimensions from "@/hooks/useDimensions";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const searchParams = useSearchParams();

  const currentStyleId = searchParams.get("styleId") || "1";

  const ResumeStylePreview = resumeStyles.find(
    (style) => style.id === currentStyleId,
  )?.component;

  const [previewOpen, setPreviewOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(containerRef);

  // Calculate A4 page height based on current width (Aspect Ratio 1:1.414)
  const pageHeight = width ? width * 1.414 : 0;

  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 z-10 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-1 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
        <FullScreenPreviewButton
          href={`/resume/${resumeData.id}?&styleId=${currentStyleId}`}
        />
        <DownloadButton
          url={`${env.NEXT_PUBLIC_BASE_URL}/resume/${resumeData.id}?&styleId=${currentStyleId}`}
        />
        <ShareButton resumeData={resumeData} />
      </div>
      <div className="relative flex w-full justify-center overflow-auto bg-secondary p-3">
        {ResumeStylePreview ? (
          <div
            onClick={() => setPreviewOpen(true)}
            className="relative w-full max-w-2xl cursor-pointer shadow-md"
            ref={containerRef}
            style={{
              "--page-height": `${pageHeight}px`,
              "--page-width": `${width}px`,
            } as React.CSSProperties}
          >
            <ResumeStylePreview
              resumeData={resumeData}
              className={cn(
                width > 0 && "h-[var(--page-height)] [column-width:var(--page-width)] [column-gap:20px] [column-fill:auto] [column-rule:1px_dashed_#d1d5db] overflow-x-auto"
              )}
            />
          </div>
        ) : (
          <div className="text-center">You need to select a resume style</div>
        )}
      </div>
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="scrollbar-hide max-h-[90vh] w-auto max-w-none overflow-y-auto border-none bg-transparent p-0 [&>.absolute]:hidden">
          <VisuallyHidden>
            <DialogTitle>Resume Preview</DialogTitle>
          </VisuallyHidden>
          <div className="scrollbar-hide mx-auto aspect-[1/1.414] w-[894px] overflow-y-auto rounded-sm bg-white shadow-2xl">
            {ResumeStylePreview && (
              <ResumeStylePreview
                resumeData={resumeData}
                className="h-full w-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
