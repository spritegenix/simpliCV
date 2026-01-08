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
// NOTE: modal uses shared Zustand store for abort handling set by print hooks

// Zustand store
interface PdfGeneratingModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  // optional abort handler set by the active print hook
  abort?: (() => void) | null;
  setAbort: (fn: (() => void) | null) => void;
}

export const usePdfGeneratingModalState = create<PdfGeneratingModalState>(
  (set) => ({
    open: false,
    abort: null,
    setOpen: (open: boolean) => {
      console.log("PDF Generating Modal State Changed:", open);
      set({ open });
    },
    setAbort: (fn: (() => void) | null) => {
      console.log("PDF Generating Modal Abort Handler Set:", !!fn);
      set({ abort: fn });
    },
  }),
);

// Component
export default function GeneratingPdfModal() {
  const { open, setOpen, abort } = usePdfGeneratingModalState();

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // call the shared abort handler if present
      try {
        abort?.();
      } catch (e) {
        console.error("Error calling abort handler:", e);
      }
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
