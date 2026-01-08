"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";

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

  // Phase 4: editor shell only (no forms/preview/persistence yet)
  return <div />;
}
