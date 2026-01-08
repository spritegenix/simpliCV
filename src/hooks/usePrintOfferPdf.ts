import { useRef, useState } from "react";
import { usePdfGeneratingModalState } from "@/components/GeneratingPdfModal";

export function usePrintOfferPdf() {
  const controllerRef = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setOpen, setAbort } = usePdfGeneratingModalState();

  async function handlePrintOfferPdf(offerId: string, styleId?: string) {
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    // open modal
    setOpen(true);
    // register abort handler in modal store
    setAbort(() => {
      try {
        controller.abort();
      } catch (e) {
        console.error("Error aborting offer PDF generation:", e);
      }
    });

    try {
      const response = await fetch("/api/generate-offer-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offerId, styleId }),
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      if (!response.ok) {
        throw new Error("Failed to generate offer PDF");
      }

      const blob = await response.blob();
      if (controller.signal.aborted) return;

      const pdfUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `offer-${offerId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
    } finally {
      setIsLoading(false);
      controllerRef.current = null;
      // clear modal state
      setOpen(false);
      setAbort(null);
    }
  }

  const abortOfferPdfGeneration = () => {
    controllerRef.current?.abort();
    setIsLoading(false);
    setOpen(false);
    setAbort(null);
  };

  return { handlePrintOfferPdf, abortOfferPdfGeneration, isLoading };
}
