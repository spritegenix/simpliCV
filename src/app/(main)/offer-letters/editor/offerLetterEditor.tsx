"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import { cn } from "@/lib/utils";

import CompanyForm from "./forms/CompanyForm";
import DateForm from "./forms/DateForm";
import CandidateForm from "./forms/CandidateForm";
import BodyForm from "./forms/BodyForm";
import ClosingSignatureForm from "./forms/ClosingSignatureForm";
import useAutoSaveOfferLetter from "./useAutoSaveOfferLetter";
import OfferLetterPreviewSection from "./OfferLetterPreviewSection";

interface OfferLetterEditorProps {
  initialDocument: OfferLetterDocument;
  offerId: string;
  styleId?: string;
}

export default function OfferLetterEditor({
  initialDocument,
  offerId,
  styleId,
}: OfferLetterEditorProps) {
  const [offerDocument, setOfferDocument] = useState<OfferLetterDocument>(
    () => ({
      ...initialDocument,
      styleId: styleId ?? initialDocument.styleId ?? undefined,
    }),
  );

  useAutoSaveOfferLetter({
    offerId,
    document: offerDocument,
  });

  function updateSection<K extends keyof OfferLetterValues>(
    key: K,
    value: OfferLetterValues[K],
  ) {
    setOfferDocument((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }));
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Keep local state in sync when the server updates props (e.g., refresh or URL edits)
  useEffect(() => {
    setOfferDocument((prev) => {
      const nextStyleId = styleId ?? initialDocument.styleId ?? undefined;
      if (prev === initialDocument && prev.styleId === nextStyleId) {
        return prev;
      }

      return {
        ...initialDocument,
        styleId: nextStyleId,
      };
    });
  }, [initialDocument, styleId]);

  const setStyleId = useCallback(
    (nextStyleId?: string) => {
      setOfferDocument((prev) => ({
        ...prev,
        styleId: nextStyleId,
      }));

      const params = new URLSearchParams(searchParams.toString());
      params.set("offerId", offerId);

      if (nextStyleId && nextStyleId.trim().length > 0) {
        params.set("styleId", nextStyleId);
      } else {
        params.delete("styleId");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [offerId, pathname, router, searchParams],
  );

  // Keep the helper referenced to avoid unused lint errors later
  useMemo(() => setStyleId, [setStyleId]);
  useMemo(() => offerDocument, [offerDocument]);

  // Prevent body scroll - only editor panel should scroll
  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex h-screen flex-col pt-20">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left editor panel */}
        <div className="flex w-full flex-col md:w-1/2">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="mx-auto max-w-3xl space-y-8 py-6">
              <CompanyForm
                value={offerDocument.content.company}
                onChange={(v) => updateSection("company", v)}
              />

              <DateForm
                value={offerDocument.content.date}
                onChange={(v) => updateSection("date", v)}
              />

              <CandidateForm
                value={offerDocument.content.candidate}
                onChange={(v) => updateSection("candidate", v)}
              />

              <BodyForm
                value={offerDocument.content.body}
                onChange={(v) => updateSection("body", v)}
              />

              <ClosingSignatureForm
                value={offerDocument.content.closingSignature}
                onChange={(v) => updateSection("closingSignature", v)}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block md:border-r" />

        {/* Right preview panel */}
        <OfferLetterPreviewSection
          document={offerDocument}
          offerId={offerId}
          className="hidden md:flex md:w-1/2"
        />
      </div>
    </div>
  );
}
