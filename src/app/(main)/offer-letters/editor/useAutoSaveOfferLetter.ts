"use client";

import { useEffect, useRef } from "react";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import { toLegacyOfferLetterValues } from "@/lib/offer-letter/transformers";
import { offerLetterDraftSchema } from "@/lib/offer-letter/vallidation";
import { saveOfferLetter } from "../actions";

interface UseAutoSaveOfferLetterProps {
  offerId?: string;
  document: OfferLetterDocument;
}

function stableSerializeDraft(document: OfferLetterDocument) {
  return JSON.stringify({
    content: document.content,
    design: document.design,
    styleId: document.styleId,
  });
}

export default function useAutoSaveOfferLetter({
  offerId,
  document,
}: UseAutoSaveOfferLetterProps) {
  const lastSavedSerializedRef = useRef<string | null>(null);

  // Reset baseline when switching offers
  useEffect(() => {
    lastSavedSerializedRef.current = offerId
      ? stableSerializeDraft(document)
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerId]);

  useEffect(() => {
    if (!offerId) return;

    const currentSerialized = stableSerializeDraft(document);

    // No save on initial mount / first observation of this offerId
    if (lastSavedSerializedRef.current === null) {
      lastSavedSerializedRef.current = currentSerialized;
      return;
    }

    // Skip if nothing changed
    if (currentSerialized === lastSavedSerializedRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      const draftPayload = {
        content: toLegacyOfferLetterValues(document),
        design: document.design,
        styleId: document.styleId,
      };

      const validation = offerLetterDraftSchema.safeParse(draftPayload.content);
      if (!validation.success) {
        console.error("Offer letter draft validation failed", validation.error);
        return;
      }

      (async () => {
        try {
          await saveOfferLetter({
            id: offerId,
            content: draftPayload.content,
            design: draftPayload.design,
            styleId: draftPayload.styleId,
          });

          // Only update the baseline after a successful save
          lastSavedSerializedRef.current = stableSerializeDraft(document);
        } catch (error) {
          // Draft-only enforcement: if server says it's not a draft anymore, silently ignore.
          const message =
            error instanceof Error ? error.message : String(error);
          if (
            message.toLowerCase().includes("non-draft") ||
            message.toLowerCase().includes("cannot modify")
          ) {
            return;
          }

          console.error("Failed to auto-save offer letter draft", error);
        }
      })();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [offerId, document.content, document.design, document.styleId]);
}
