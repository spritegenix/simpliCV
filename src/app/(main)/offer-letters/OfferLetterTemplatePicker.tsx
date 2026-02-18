"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  offerLetterStyles,
  offerLetterCategories,
  type OfferLetterCategory,
} from "@/components/OfferLetterStyles/OfferLetterStyles";
import { createOfferLetter } from "./actions";

export default function OfferLetterTemplatePicker() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] =
    React.useState<OfferLetterCategory>("All");
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const filtered =
    selectedCategory === "All"
      ? offerLetterStyles
      : offerLetterStyles.filter((s) => s.category?.includes(selectedCategory));

  function handleSelect(styleId: string) {
    setLoadingId(styleId);
    startTransition(async () => {
      const offerId = await createOfferLetter();
      router.push(
        `/offer-letters/editor?offerId=${encodeURIComponent(offerId)}&styleId=${encodeURIComponent(styleId)}`,
      );
    });
  }

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div>
        <h2 className="text-xl font-bold text-white">Choose a Template</h2>
        <p className="text-sm text-white/70">
          Pick a design to start your offer letter
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {offerLetterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selectedCategory === cat
                ? "bg-white text-w3"
                : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-white/50">No templates in this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((style) => {
            const isLoading = isPending && loadingId === style.id;

            return (
              <button
                key={style.id}
                onClick={() => handleSelect(style.id)}
                disabled={isPending}
                className={cn(
                  "group relative rounded-lg border-2 bg-white/5 text-left transition-all",
                  "hover:border-white hover:bg-white/10",
                  isLoading ? "border-white" : "border-transparent",
                  isPending && !isLoading && "opacity-50",
                )}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[1/1.414] w-full overflow-hidden rounded-md bg-white">
                  {style.thumbnail ? (
                    <Image
                      src={style.thumbnail}
                      alt={style.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    /* Fallback placeholder when no thumbnail is available */
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <span className="text-xs text-gray-400">
                        {style.name}
                      </span>
                    </div>
                  )}

                  {/* Loading overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="size-6 animate-spin text-white" />
                    </div>
                  )}

                  {/* Hover overlay */}
                  {!isLoading && (
                    <div className="absolute inset-0 flex items-end justify-center bg-black/0 pb-3 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800">
                        Use this template
                      </span>
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="px-1 py-2">
                  <p className="truncate text-sm font-semibold text-white">
                    {style.name}
                  </p>
                  {style.price && (
                    <span className="text-xs text-white/60">{style.price}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
