"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import OfferLetterContent from "./OfferLetterContent";

interface PaginatedOfferLetterPreviewProps {
  document: OfferLetterDocument;
  className?: string;
  printMode?: boolean;
}

const PAGE_ASPECT_RATIO = 1 / 1.414; // width / height

// Page padding in mm - defines the text area boundaries
const PAGE_PADDING_MM = 24;

// Approximate line height in em (leading-relaxed = 1.625)
const LINE_HEIGHT_EM = 1.625;

export default function PaginatedOfferLetterPreview({
  document,
  className,
  printMode = false,
}: PaginatedOfferLetterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  const [pageCount, setPageCount] = useState(1);
  const [lineHeightPx, setLineHeightPx] = useState(0);

  const pageHeight = width ? width / PAGE_ASPECT_RATIO : 0;

  // Convert mm to pixels based on current page width (A4 is 210mm wide)
  const mmToPx = width ? width / 210 : 0;
  const paddingPx = mmToPx * PAGE_PADDING_MM;

  // The actual content area height (page height minus top and bottom padding)
  // Round down to nearest line to ensure clean breaks
  const rawContentAreaHeight = pageHeight - paddingPx * 2;
  const contentAreaHeight =
    lineHeightPx > 0
      ? Math.floor(rawContentAreaHeight / lineHeightPx) * lineHeightPx
      : rawContentAreaHeight;

  useEffect(() => {
    if (!contentRef.current || !contentAreaHeight || contentAreaHeight <= 0)
      return;

    const update = () => {
      // Get computed line height
      const computedStyle = window.getComputedStyle(contentRef.current!);
      const fontSize = parseFloat(computedStyle.fontSize);
      const computedLineHeight = fontSize * LINE_HEIGHT_EM;
      setLineHeightPx(computedLineHeight);

      const totalHeight = contentRef.current?.scrollHeight ?? 0;
      const pages = Math.ceil(totalHeight / contentAreaHeight);
      setPageCount(Math.max(1, pages));
    };

    const timer = window.setTimeout(update, 100);
    return () => window.clearTimeout(timer);
  }, [document, pageHeight, contentAreaHeight]);

  return (
    <div
      id="offerPreviewContent"
      className={cn(
        "relative flex w-full flex-col items-center",
        printMode ? "gap-0" : "gap-6",
        className,
      )}
    >
      {/* Measurement container (single source of truth; hidden, no layout impact) */}
      <div
        ref={contentRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-0 overflow-hidden leading-relaxed opacity-0"
        style={{
          width: width ? `${width - paddingPx * 2}px` : undefined,
          padding: 0,
        }}
      >
        <OfferLetterContent document={document} includePadding={false} />
      </div>

      {/* Visible paginated pages */}
      {Array.from({ length: pageCount }).map((_, pageIndex) => {
        // Each page shows contentAreaHeight worth of content
        const yOffset = pageIndex * contentAreaHeight;

        return (
          <div
            key={pageIndex}
            ref={pageIndex === 0 ? containerRef : undefined}
            className={cn(
              "offer-page relative w-full max-w-2xl overflow-hidden border border-gray-200 bg-white shadow-md",
              "aspect-[1/1.414]",
            )}
            style={{
              height: pageHeight ? `${pageHeight}px` : "297mm",
            }}
          >
            {/* Text content area - clipped at page bounds, positioned with margin offset */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: `${paddingPx}px`,
                left: `${paddingPx}px`,
                right: `${paddingPx}px`,
                height: `${contentAreaHeight}px`,
              }}
            >
              <div
                className="w-full leading-relaxed"
                style={{
                  transform: `translateY(-${yOffset}px)`,
                }}
              >
                <OfferLetterContent
                  document={document}
                  includePadding={false}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
