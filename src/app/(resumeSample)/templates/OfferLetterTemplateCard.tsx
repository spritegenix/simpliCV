"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { OfferLetterStyle } from "@/components/OfferLetterStyles/OfferLetterStyles";
import { createOfferLetter } from "@/app/(main)/offer-letters/actions";

interface OfferLetterTemplateCardProps {
  style: OfferLetterStyle;
}

export default function OfferLetterTemplateCard({
  style,
}: OfferLetterTemplateCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const offerId = await createOfferLetter();
      router.push(
        `/offer-letters/editor?offerId=${encodeURIComponent(offerId)}&styleId=${encodeURIComponent(style.id)}`,
      );
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="group relative w-full cursor-pointer rounded-sm border-0 text-center transition-all duration-300 disabled:cursor-wait"
    >
      {style.thumbnail ? (
        <Image
          src={style.thumbnail}
          alt={style.name || "template image"}
          width={650}
          height={650}
          className="object-contain transition-all duration-500"
        />
      ) : (
        <div className="flex aspect-[1/1.414] w-full items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-400">{style.name}</span>
        </div>
      )}

      {/* Loading overlay */}
      {isPending && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
          <Loader2 className="size-8 animate-spin text-white" />
        </div>
      )}

      {/* Hover overlay — matches resume TemplateCard style */}
      {!isPending && (
        <div
          className={cn(
            "absolute inset-x-0 top-0 z-10 flex h-0 flex-col items-center justify-center overflow-hidden bg-black/70 text-white transition-all duration-500 group-hover:h-32 group-hover:p-2",
          )}
        >
          <h2 className="text-base font-medium">{style.name}</h2>
          {style.desc && <p className="line-clamp-4 text-sm">{style.desc}</p>}
        </div>
      )}
    </button>
  );
}
