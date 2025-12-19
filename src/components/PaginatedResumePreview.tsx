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
}

export default function PaginatedResumePreview({
  resumeData,
  styleId,
  className,
  onPageClick,
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
    if (!containerRef.current || !width) return;

    const element = containerRef.current;

    const updatePageCount = () => {
      if (element) {
        const scrollWidth = element.scrollWidth;
        // We use a slightly larger buffer or just ceil
        const pages = Math.ceil(scrollWidth / width);
        setTotalPages(Math.max(1, pages));
      }
    };

    // Initial check
    // setTimeout to allow layout to settle
    const timer = setTimeout(updatePageCount, 100);

    return () => clearTimeout(timer);
  }, [width, resumeData, styleId]);

  if (!ResumeStylePreview) {
    return null;
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
            "relative w-full max-w-2xl shrink-0 bg-white shadow-md",
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
                top: width ? "20px" : 0,
                left: 0,
              } as React.CSSProperties
            }
          >
            <ResumeStylePreview
              resumeData={resumeData}
              className={cn(
                width > 0 &&
                  "h-[calc(var(--page-height)-40px)] [column-fill:auto] [column-gap:0px] [column-rule:none] [column-width:var(--page-width)]",
                "!p-0 [&>#resumePreviewContent]:p-6",
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
