"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Loader2, Trash2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { uploadFileToS3 } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import type { OfferLetterValues } from "@/lib/offer-letter/types";
import type { OfferEditorFormProps } from "./types";

type ClosingSignatureSection = OfferLetterValues["closingSignature"];

export default function ClosingSignatureForm({
  value,
  onChange,
}: OfferEditorFormProps<ClosingSignatureSection>) {
  const [isUploading, setIsUploading] = useState(false);

  const update = (patch: Partial<ClosingSignatureSection>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  const signaturePreviewUrl = useMemo(() => {
    if (value.signatureImage?.type === "upload" && value.signatureImage.value) {
      return value.signatureImage.value;
    }
    if (value.signatureUrl) {
      return value.signatureUrl;
    }
    return undefined;
  }, [value.signatureImage, value.signatureUrl]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles?.[0];
      if (!file) return;

      try {
        setIsUploading(true);
        const uploadedUrl = await uploadFileToS3(file);
        update({
          signatureImage: { type: "upload", value: uploadedUrl },
          signatureUrl: uploadedUrl,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description:
            error instanceof Error
              ? error.message
              : "Failed to upload signature. Please try again.",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [update],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    disabled: isUploading,
  });

  return (
    <div className="rounded-xl bg-muted/30 p-4 sm:p-6">
      <h2 className="mb-4 text-2xl font-semibold">Closing & Signature</h2>
      <div className="grid gap-6 lg:grid-cols-[1fr_200px] lg:items-start">
        <div className="grid gap-3">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={value.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={value.title ?? ""}
                onChange={(e) =>
                  update({
                    title: e.target.value.trim() ? e.target.value : undefined,
                  })
                }
                placeholder="e.g. HR Manager"
              />
            </div>

            <div className="space-y-1">
              <Label>Company Name</Label>
              <Input
                value={value.companyName ?? ""}
                onChange={(e) =>
                  update({
                    companyName: e.target.value.trim()
                      ? e.target.value
                      : undefined,
                  })
                }
                placeholder="Company"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={value.email ?? ""}
                onChange={(e) =>
                  update({
                    email: e.target.value.trim() ? e.target.value : undefined,
                  })
                }
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                value={value.phone ?? ""}
                onChange={(e) =>
                  update({
                    phone: e.target.value.trim() ? e.target.value : undefined,
                  })
                }
                placeholder="Phone"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="space-y-3">
            <Label>Signature</Label>

            <div className="relative">
              <div
                {...getRootProps()}
                className={cn(
                  "group relative flex h-40 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-muted/30 transition-colors",
                  isDragActive && "border-primary bg-primary/10",
                  isUploading && "cursor-not-allowed opacity-70",
                )}
                aria-label="Signature upload"
              >
                <input {...getInputProps()} />

                {signaturePreviewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={signaturePreviewUrl}
                    alt="Signature"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Camera className="h-8 w-8" />
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <UploadCloud className="h-4 w-4" />
                      <span>Drop or click</span>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                )}

                {signaturePreviewUrl && !isUploading && (
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        update({
                          signatureImage: undefined,
                          signatureUrl: undefined,
                        });
                      }}
                      aria-label="Remove signature"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
