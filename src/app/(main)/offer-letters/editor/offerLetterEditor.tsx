"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import type { OfferLetterValues } from "@/lib/offer-letter/types";

import CompanyForm from "./forms/CompanyForm";
import CandidateForm from "./forms/CandidateForm";
import JobForm from "./forms/jobForm";
import CompensationForm from "./forms/CompensationForm";
import LegalityForm from "./forms/LegalityForm";
import ClosingSignatureForm from "./forms/ClosingSignatureForm";
import useAutoSaveOfferLetter from "./useAutoSaveOfferLetter";
import PaginatedOfferLetterPreview from "./PaginatedOfferLetterPreview";
import FullScreenPreviewButton from "../../editor/FullScreenPreviewButton";
import OfferDownloadButton from "./OfferDownloadButton";

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
  const [document, setDocument] = useState<OfferLetterDocument>(() => ({
    ...initialDocument,
    styleId: styleId ?? initialDocument.styleId ?? undefined,
  }));

  useAutoSaveOfferLetter({
    offerId,
    document,
  });

  function updateSection<K extends keyof OfferLetterValues>(
    key: K,
    value: OfferLetterValues[K],
  ) {
    setDocument((prev) => ({
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
    setDocument((prev) => {
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
      setDocument((prev) => ({
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
  useMemo(() => document, [document]);

  return (
    <div className="editor-layout mx-auto max-w-6xl gap-6 p-4 lg:grid lg:grid-cols-2">
      <div className="editor-forms space-y-8">
        <CompanyForm
          value={document.content.company}
          onChange={(v) => updateSection("company", v)}
        />

        <CandidateForm
          value={document.content.candidate}
          onChange={(v) => updateSection("candidate", v)}
        />

        <JobForm
          value={document.content.job}
          onChange={(v) => updateSection("job", v)}
        />

        <CompensationForm
          value={document.content.compensation}
          onChange={(v) => updateSection("compensation", v)}
        />

        <LegalityForm
          value={document.content.legality}
          onChange={(v) => updateSection("legality", v)}
        />

        <ClosingSignatureForm
          value={document.content.closingSignature}
          onChange={(v) => updateSection("closingSignature", v)}
        />
      </div>

      <div className="editor-preview group relative overflow-auto">
        <div className="absolute left-1 top-1 z-10 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100">
          <FullScreenPreviewButton
            href={
              document.styleId
                ? `/offer/${offerId}?styleId=${encodeURIComponent(document.styleId)}`
                : `/offer/${offerId}`
            }
          />
          <OfferDownloadButton offerId={offerId} styleId={document.styleId} />
        </div>

        <PaginatedOfferLetterPreview document={document} />
      </div>
    </div>
  );
}
