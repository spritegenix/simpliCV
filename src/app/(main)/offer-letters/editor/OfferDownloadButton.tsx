"use client";

import React from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrintOfferPdf } from "@/hooks/usePrintOfferPdf";

export default function OfferDownloadButton({
  offerId,
  styleId,
}: {
  offerId: string;
  styleId?: string;
}) {
  const { handlePrintOfferPdf, isLoading } = usePrintOfferPdf();

  return (
    <Button
      variant="outline"
      size="icon"
      title="Download Offer Letter"
      disabled={isLoading}
      onClick={() => handlePrintOfferPdf(offerId, styleId)}
    >
      <Printer className="size-5" />
    </Button>
  );
}
