"use client";

import { cn } from "@/lib/utils";
import React from "react";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import OfferLetterContent from "./OfferLetterContent";

interface OfferLetterPreviewProps {
  document: OfferLetterDocument;
  className?: string;
}

export default function OfferLetterPreview({
  document,
  className,
}: OfferLetterPreviewProps) {
  return (
    <div
      id="offerPreviewContent"
      className={cn(
        "relative flex w-full flex-col items-center gap-6",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-2xl border border-gray-200 bg-white shadow-md",
          "aspect-[1/1.414]",
        )}
      >
        <OfferLetterContent document={document} />
      </div>
    </div>
  );
}
