"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface PhotoCropModalProps {
  file: File | null;
  onConfirm: (croppedFile: File) => void;
  onClose: () => void;
}

const VIEWPORT = 280; // px — visible crop circle size
const OUTPUT_SIZE = 400; // px — exported canvas size

export default function PhotoCropModal({
  file,
  onConfirm,
  onClose,
}: PhotoCropModalProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    mx: number;
    my: number;
    ox: number;
    oy: number;
  } | null>(null);

  // Load image when file changes
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setImgLoaded(false);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // ------------------------------------------------------------------
  // Image sizing strategy:
  //   The <img> is sized so the shorter side equals VIEWPORT at zoom=1
  //   (object-fit: cover behaviour). Zoom is applied with CSS
  //   transform: scale() which is reliable regardless of load timing.
  //   Pan offset is applied with translate() in px.
  // ------------------------------------------------------------------

  /** Base rendered size — shorter side covers VIEWPORT. */
  const getBaseDimensions = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) {
      return { baseW: VIEWPORT, baseH: VIEWPORT };
    }
    const aspect = img.naturalWidth / img.naturalHeight;
    if (aspect >= 1) {
      // Landscape — height = VIEWPORT, width overflows
      return { baseW: VIEWPORT * aspect, baseH: VIEWPORT };
    }
    // Portrait — width = VIEWPORT, height overflows
    return { baseW: VIEWPORT, baseH: VIEWPORT / aspect };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgLoaded]);

  /** Clamp offset so the viewport circle is always fully covered. */
  const clampOffset = useCallback(
    (ox: number, oy: number) => {
      const { baseW, baseH } = getBaseDimensions();
      const halfVp = VIEWPORT / 2;
      const maxX = Math.max((baseW * zoom) / 2 - halfVp, 0);
      const maxY = Math.max((baseH * zoom) / 2 - halfVp, 0);
      return {
        x: Math.max(-maxX, Math.min(maxX, ox)),
        y: Math.max(-maxY, Math.min(maxY, oy)),
      };
    },
    [getBaseDimensions, zoom],
  );

  // ── Drag (mouse) ────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartRef.current = {
      mx: e.clientX,
      my: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.mx;
      const dy = e.clientY - dragStartRef.current.my;
      setOffset(
        clampOffset(dragStartRef.current.ox - dx, dragStartRef.current.oy - dy),
      );
    },
    [clampOffset],
  );
  const onMouseUp = () => {
    dragStartRef.current = null;
  };

  // ── Drag (touch) ────────────────────────────────────────────────
  const touchStartRef = useRef<{
    tx: number;
    ty: number;
    ox: number;
    oy: number;
  } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = {
      tx: t.clientX,
      ty: t.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - touchStartRef.current.tx;
      const dy = t.clientY - touchStartRef.current.ty;
      setOffset(
        clampOffset(
          touchStartRef.current.ox - dx,
          touchStartRef.current.oy - dy,
        ),
      );
    },
    [clampOffset],
  );
  const onTouchEnd = () => {
    touchStartRef.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchMove]);

  // Clamp offset when zoom changes
  useEffect(() => {
    setOffset((prev) => clampOffset(prev.x, prev.y));
  }, [zoom, clampOffset]);

  // ── Confirm: crop visible region to canvas ──────────────────────
  const handleConfirm = async () => {
    const img = imgRef.current;
    if (!img) return;

    const { baseW, baseH } = getBaseDimensions();
    const scaledW = baseW * zoom;
    const scaledH = baseH * zoom;
    const halfVp = VIEWPORT / 2;

    // Top-left of viewport in the scaled-image coordinate space
    const cropLeft = scaledW / 2 - halfVp + offset.x;
    const cropTop = scaledH / 2 - halfVp + offset.y;

    // Map to natural image pixels
    const natScaleX = img.naturalWidth / scaledW;
    const natScaleY = img.naturalHeight / scaledH;

    const srcX = cropLeft * natScaleX;
    const srcY = cropTop * natScaleY;
    const srcW = VIEWPORT * natScaleX;
    const srcH = VIEWPORT * natScaleY;

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d")!;

    // No circle clip — export a square crop so the template's
    // borderStyle (square / circle / squircle) controls the shape.
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], file?.name ?? "photo.jpg", {
          type: "image/jpeg",
        });
        onConfirm(croppedFile);
      },
      "image/jpeg",
      0.92,
    );
  };

  const { baseW, baseH } = getBaseDimensions();

  return (
    <Dialog
      open={!!file}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Crop your photo</DialogTitle>
        </DialogHeader>

        <p className="-mt-2 text-sm text-muted-foreground">
          Drag to reposition &bull; Use the slider to zoom
        </p>

        {/* Viewport */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative cursor-grab select-none overflow-hidden rounded-2xl border-2 border-primary active:cursor-grabbing"
            style={{ width: VIEWPORT, height: VIEWPORT }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {imageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={imageSrc}
                alt="crop preview"
                draggable={false}
                style={{
                  position: "absolute",
                  width: baseW,
                  height: baseH,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center center",
                  transform: `translate(-50%, -50%) scale(${zoom}) translate(${-offset.x / zoom}px, ${-offset.y / zoom}px)`,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                onLoad={() => setImgLoaded(true)}
              />
            )}
          </div>
        </div>

        {/* Zoom slider */}
        <div className="flex items-center gap-3 px-1">
          <ZoomOut className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
          />
          <ZoomIn className="size-4 shrink-0 text-muted-foreground" />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Apply crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
