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

export default function PaginatedOfferLetterPreview({
  document,
  className,
  printMode = false,
}: PaginatedOfferLetterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  const [pageCount, setPageCount] = useState(1);

  const pageHeight = width ? width / PAGE_ASPECT_RATIO : 0;

  useEffect(() => {
    if (!contentRef.current || !pageHeight) return;

    const update = () => {
      const totalHeight = contentRef.current?.scrollHeight ?? 0;
      const pages = Math.ceil(totalHeight / pageHeight);
      setPageCount(Math.max(1, pages));
    };

    const timer = window.setTimeout(update, 100);
    return () => window.clearTimeout(timer);
  }, [document, pageHeight]);

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
        className="pointer-events-none absolute left-0 top-0 h-0 overflow-hidden opacity-0"
        style={{ width: width ? `${width}px` : undefined }}
      >
        <OfferLetterContent document={document} />
      </div>

      {/* Visible paginated pages */}
      {Array.from({ length: pageCount }).map((_, pageIndex) => (
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
          <div
            className="absolute left-0 top-0 w-full"
            style={{
              transform: pageHeight
                ? `translateY(-${pageIndex * pageHeight}px)`
                : "none",
            }}
          >
            <OfferLetterContent document={document} />
          </div>
        </div>
      ))}
    </div>
  );
}
