"use client";

import { Loader } from "lucide-react";
import { create } from "zustand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { usePrintPdf } from "@/hooks/usePrintPdf";

// Zustand store
interface PdfGeneratingModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const usePdfGeneratingModalState = create<PdfGeneratingModalState>(
  (set) => ({
    open: false,
    setOpen: (open: boolean) => {
      console.log("PDF Generating Modal State Changed:", open);
      set({ open });
    },
  }),
);

// Component
export default function GeneratingPdfModal() {
  const { open , setOpen } = usePdfGeneratingModalState();
  const { abortPdfGeneration } = usePrintPdf();

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      abortPdfGeneration(); // 👈 abort when user closes
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Generating Your Resume</DialogTitle>
          <DialogDescription>
            We are generating your PDF. This may take a moment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <Loader className="mr-2 h-6 w-6 animate-spin" />
        </div>
      </DialogContent>
    </Dialog>
  );
}