"use client";

import React from "react";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import OfferLetterDebugContent from "./OfferLetterDebugContent";
import { offerLetterTemplateMap } from "@/components/OfferLetterStyles";
import Default from "@/components/OfferLetterStyles/templates/Default";

/**
 * OfferLetterContent — template dispatcher.
 *
 * Resolves `document.styleId` to the registered template component and renders
 * it. Falls back to OlDefault when the styleId is unknown or absent.
 *
 * The `includePadding` flag is forwarded to the template so the paginator can
 * suppress per-template padding and control it externally instead.
 */
export default function OfferLetterContent({
  document,
  includePadding = true,
}: {
  document: OfferLetterDocument;
  includePadding?: boolean;
}) {
  // Reserved debug styleId — bypasses the template system entirely
  if (document.styleId === "debug") {
    return <OfferLetterDebugContent document={document} />;
  }

  const styleId = document.styleId ?? "default";
  const TemplateComponent = offerLetterTemplateMap[styleId] ?? Default;

  return (
    <TemplateComponent document={document} includePadding={includePadding} />
  );
}
