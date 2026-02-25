// import ResumePreview from "@/components/ResumeStyles/ResumePreview";
"use client";
import { cn } from "@/lib/utils";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";
import FullScreenPreviewButton from "./FullScreenPreviewButton";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";
import { resumeStyles } from "@/components/ResumeStyles/Styles.client";
import { useSearchParams } from "next/navigation";
import { env } from "@/env";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import PaginatedResumePreview from "@/components/PaginatedResumePreview";
import { ResumeDocument } from "@/types/resumeDocument";

interface ResumePreviewSectionProps {
  resumeData: ResumeDocument;
  setResumeData: (data: ResumeDocument) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const searchParams = useSearchParams();

  const currentStyleId = searchParams.get("styleId") || resumeData.styleId;

  const ResumeStylePreview = resumeStyles.find(
    (style) => style.id === currentStyleId,
  )?.component;

  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
      data-tour="editor-preview"
    >
      <div
        className="absolute left-1 top-1 z-10 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-1 lg:top-3 xl:opacity-100"
        data-tour="editor-quick-tools"
      >
        <ColorPicker
          color={resumeData.design.color.accent || undefined}
          onChange={(color) =>
            setResumeData({
              ...resumeData,
              design: {
                ...resumeData.design,
                color: {
                  ...resumeData.design.color,
                  accent: color.hex,
                },
              },
            })
          }
        />
        <BorderStyleButton
          borderStyle={
            resumeData.content.borderStyle === null
              ? undefined
              : resumeData.content.borderStyle
          }
          onChange={(borderStyle) =>
            setResumeData({
              ...resumeData,
              content: {
                ...resumeData.content,
                borderStyle,
              },
              design: {
                ...resumeData.design,
                decorations: {
                  ...resumeData.design.decorations,
                  borderStyle: borderStyle === "square" ? "none" : "solid",
                },
              },
            })
          }
        />
        <FullScreenPreviewButton
          href={`/resume/${resumeData.content.id}?styleId=${currentStyleId}`}
        />
        <DownloadButton
          url={`${env.NEXT_PUBLIC_BASE_URL}/resume/${resumeData.content.id}?styleId=${currentStyleId}`}
        />
        <ShareButton resumeData={resumeData} />
      </div>
      <div className="relative flex w-full flex-col gap-6 overflow-auto bg-secondary p-6">
        {ResumeStylePreview ? (
          <PaginatedResumePreview
            resumeData={resumeData}
            styleId={currentStyleId}
            onPageClick={() => setPreviewOpen(true)}
          />
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
