
// import { useEffect, useState } from "react";
import { useRef } from "react";
import { useToast } from "./use-toast";
import { usePdfGeneratingModalState } from "@/components/GeneratingPdfModal";

export function usePrintPdf() {
  const controllerRef = useRef<AbortController | null>(null);
  const { setOpen } = usePdfGeneratingModalState()
  const { toast } = useToast();

  async function handlePrintPdf(url: string) {
    const controller = new AbortController();
    controllerRef.current = controller;
    setOpen(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      // Abort may have been called while waiting for the response
      if (controller.signal.aborted) return;

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      if (controller.signal.aborted) return;
      const pdfUrl = URL.createObjectURL(blob);
      // Only open if still not aborted
      window.open(pdfUrl, "_self");

      // Clean up after a short delay
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
      // console.log(pdfUrl)
      //--------- Open the PDF in a new tab -----------//
      // window.open(pdfUrl, "_blank");
      //--------- Download the PDF -----------//
      // const link = document.createElement("a");
      // link.href = pdfUrl;
      // link.download = "resume.pdf";
      // link.click();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AbortError") {
        toast({
          variant: "destructive",
          description: "PDF generation cancelled by user.",
        })
      } else {
        console.error("Print error:", error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setOpen(false);
      controllerRef.current = null;
    }
  }
  const abortPdfGeneration = () => {
    console.log("Abort triggered");
    controllerRef.current?.abort();
    console.log("Current controller", controllerRef.current);
    setOpen(false);
  };
  return { handlePrintPdf, abortPdfGeneration };
}
