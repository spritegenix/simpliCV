"use client";

import { cn } from "@/lib/utils";
import { resumeStyles } from "@/components/ResumeStyles/Styles.client";
import useDimensions from "@/hooks/useDimensions";
import React, { useEffect, useRef, useState } from "react";
import { ResumeDocument } from "@/types/resumeDocument";

interface PaginatedResumePreviewProps {
  resumeData: ResumeDocument;
  styleId: string;
  className?: string;
  onPageClick?: () => void;
  printMode?: boolean;
}

export default function PaginatedResumePreview({
  resumeData,
  styleId,
  className,
  onPageClick,
  printMode = false,
}: PaginatedResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const [totalPages, setTotalPages] = useState(1);

  const ResumeStylePreview = resumeStyles.find(
    (style) => style.id === styleId,
  )?.component;

  // Calculate A4 page height based on current width (Aspect Ratio 1:1.414)
  const pageHeight = width ? width * 1.414 : 0;

  useEffect(() => {
    if (!containerRef.current || !width || !pageHeight) return;

    const element = containerRef.current;

    const updatePageCount = () => {
      if (element) {
        // Find the resume content element (the one with column layout)
        const resumeContent = element.querySelector('[data-resume-preview-page-inner]')?.firstElementChild;
        if (resumeContent) {
          // The resume content is using CSS columns
          // scrollWidth represents the total width needed for all columns
          // Divide by page width to get number of pages
          const scrollWidth = resumeContent.scrollWidth;
          const pages = Math.ceil(scrollWidth / width);
          setTotalPages(Math.max(1, pages));
        }
      }
    };

    // Initial check
    // setTimeout to allow layout to settle
    const timer = setTimeout(updatePageCount, 100);

    return () => clearTimeout(timer);
  }, [width, resumeData, styleId, pageHeight]);

  if (!ResumeStylePreview) {
    return null;
  }

  // Print mode: render content once without pagination wrapper
  if (printMode) {
    return (
      <div
        className={cn("w-full bg-white", className)}
        data-resume-preview="print"
        ref={containerRef}
      >
        <ResumeStylePreview
          resumeData={resumeData}
          className={cn(
            "print-resume",
            "[&.resume-root]:!p-0 [&>.resume-root]:!p-0"
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center gap-6",
        className,
      )}
      data-resume-preview="paginated"
    >
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          className={cn(
            "relative aspect-[1/1.414] w-full max-w-2xl shrink-0 bg-white shadow-md",
            pageIndex === 0 && onPageClick
              ? "cursor-pointer"
              : "pointer-events-none",
          )}
          data-resume-preview-page
          style={{
            height: width ? `${pageHeight}px` : "auto",
            minHeight: width ? "unset" : "297mm",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            padding: 0,
            margin: 0,
          }}
          onClick={() => pageIndex === 0 && onPageClick?.()}
          ref={pageIndex === 0 ? containerRef : null}
        >
          <div
            data-resume-preview-page-inner
            style={
              {
                "--page-height": `${pageHeight}px`,
                "--page-width": `${width}px`,
                transform: width
                  ? `translateX(-${pageIndex * width}px)`
                  : "none",
                width: width ? `${width}px` : "100%",
                position: width ? "absolute" : "relative",
                top: 0,
                left: 0,
              } as React.CSSProperties
            }
          >
            <ResumeStylePreview
              resumeData={resumeData}
              className={cn(
                "h-[var(--page-height)] [column-fill:auto] [column-gap:0px] [column-rule:none] [column-width:var(--page-width)]",
                "[&.resume-root]:!p-0 [&>.resume-root]:!p-0",
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
