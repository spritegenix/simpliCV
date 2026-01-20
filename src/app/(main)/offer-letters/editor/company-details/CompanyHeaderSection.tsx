"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Camera,
  ExternalLink,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { uploadFileToS3 } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import type { CompanyHeaderValues } from "./types";

interface CompanyHeaderSectionProps {
  value: CompanyHeaderValues;
  onChange: (next: CompanyHeaderValues) => void;
}

export default function CompanyHeaderSection({
  value,
  onChange,
}: CompanyHeaderSectionProps) {
  const [isUploading, setIsUploading] = useState(false);

  const normalizeWebsiteUrl = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return "";

    // If user already provided a scheme, keep it.
    if (/^https?:\/\//i.test(trimmed)) return trimmed;

    // Otherwise, treat it as a domain/path and default to https.
    return `https://${trimmed}`;
  };

  const update = (patch: Partial<CompanyHeaderValues>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  const website = value.website?.trim() ?? "";
  const websiteHref = normalizeWebsiteUrl(website);

  const logoPreviewUrl = useMemo(() => {
    if (value.companyLogo?.type === "upload" && value.companyLogo.value) {
      return value.companyLogo.value;
    }
    return undefined;
  }, [value.companyLogo]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles?.[0];
      if (!file) return;

      try {
        setIsUploading(true);
        const uploadedUrl = await uploadFileToS3(file);
        update({
          companyLogo: { type: "upload", value: uploadedUrl },
          // Keep legacy logoUrl in sync for existing preview/PDF code.
          logoUrl: uploadedUrl,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description:
            error instanceof Error
              ? error.message
              : "Failed to upload logo. Please try again.",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [value, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".svg"],
    },
    disabled: isUploading,
  });

  return (
    <div className="rounded-xl bg-muted/30 p-4 sm:p-6">
      <h2 className="mb-4 text-2xl font-semibold">Company Details</h2>
      <div className="grid gap-6 lg:grid-cols-[1fr_200px] lg:items-start">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Company name</Label>
            <Input
              value={value.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Enter company name"
            />
          </div>

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
              placeholder="Enter email"
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
              placeholder="Enter phone"
            />
          </div>

          <div className="space-y-1">
            <Label>Website</Label>
            <div className="relative">
              <Input
                type="url"
                value={value.website ?? ""}
                onChange={(e) =>
                  update({
                    website: e.target.value.trim() ? e.target.value : undefined,
                  })
                }
                placeholder="Enter website"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() => {
                  if (!websiteHref) return;
                  window.open(websiteHref, "_blank", "noopener,noreferrer");
                }}
                disabled={!websiteHref}
                aria-label="Open website"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="space-y-3">
            <Label>Company logo</Label>

            <div className="relative">
              <div
                {...getRootProps()}
                className={cn(
                  "group relative flex h-40 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-muted/30 transition-colors",
                  isDragActive && "border-primary bg-primary/10",
                  isUploading && "cursor-not-allowed opacity-70",
                )}
                aria-label="Company logo upload"
              >
                <input {...getInputProps()} />

                {logoPreviewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoPreviewUrl}
                    alt="Company logo"
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

                {value.companyLogo?.value && !isUploading && (
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
                          companyLogo: undefined,
                          logoUrl: undefined,
                        });
                      }}
                      aria-label="Remove logo"
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
