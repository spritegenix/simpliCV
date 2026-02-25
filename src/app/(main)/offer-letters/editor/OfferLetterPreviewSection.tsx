"use client";

import { cn } from "@/lib/utils";
import FullScreenPreviewButton from "../../editor/FullScreenPreviewButton";
import OfferDownloadButton from "./OfferDownloadButton";
import PaginatedOfferLetterPreview from "./PaginatedOfferLetterPreview";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";

interface OfferLetterPreviewSectionProps {
  document: OfferLetterDocument;
  offerId: string;
  className?: string;
}

export default function OfferLetterPreviewSection({
  document,
  offerId,
  className,
}: OfferLetterPreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
      data-tour="offer-preview"
    >
      <div className="absolute left-1 top-1 z-10 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-1 lg:top-3 xl:opacity-100">
        <FullScreenPreviewButton
          href={
            document.styleId
              ? `/offer/${offerId}?styleId=${encodeURIComponent(document.styleId)}`
              : `/offer/${offerId}`
          }
        />
        <OfferDownloadButton offerId={offerId} styleId={document.styleId} />
      </div>
      <div className="relative flex w-full flex-col gap-6 overflow-auto bg-secondary p-6">
        <PaginatedOfferLetterPreview document={document} />
      </div>
    </div>
  );
}
