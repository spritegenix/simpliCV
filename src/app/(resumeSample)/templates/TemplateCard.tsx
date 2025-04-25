"use client";

import PremiumModal from "@/components/premium/PremiumModal";
import { ResumeStyle } from "@/components/ResumeStyles/Styles";
import usePremiumModal from "@/hooks/usePremiumModal";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface TemplateCardProps {
  style: ResumeStyle;
  canCreate: boolean;
  isUser: boolean;
}

export default function TemplateCard({
  style,
  canCreate,
  isUser,
}: TemplateCardProps) {
  const premiumModal = usePremiumModal();

  if (!isUser) {
    // console.log("not user");
    return (
      <Link href={`/sign-in`}>
        <div className="cursor-pointer">
          <Card style={style} />
        </div>
      </Link>
    );
  }

  if (canCreate) {
    // console.log("can create");
    return (
      <Link href={`/editor?&styleId=${style.id}`}>
        <div className="cursor-pointer">
          <Card style={style} />
        </div>
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => premiumModal.setOpen(true)}
        className="w-full cursor-pointer"
      >
        <Card style={style} />
      </button>
      <PremiumModal />
    </>
  );
}

export function Card({
  style,
  isOnEditPage,
  isSaving
}: {
  style: ResumeStyle;
  isOnEditPage?: boolean;
  isSaving?: boolean;
}) {
  return (
    <div className="group relative cursor-pointer rounded-sm border-0 text-center transition-all duration-300">
      {style.samplePic && (
        <Image
          src={style.samplePic}
          alt={style.name || "template Image"}
          width={650}
          height={650}
          className="object-contain transition-all duration-500"
        />
      )}
     {!isSaving && <div
        className={cn(
           "absolute inset-x-0 top-0 z-10 flex h-0 flex-col items-center justify-center overflow-hidden bg-black/70 text-white transition-all duration-500 group-hover:h-32 group-hover:p-2",
          isOnEditPage && "group-hover:h-full",
        )}
      >
        <h2 className={cn("text-xl font-medium", isOnEditPage && "text-base")}>
          {style.name}
        </h2>
        <p className="line-clamp-4 font-rubik text-sm">{style.desc}</p>
      </div>}
    </div>
  );
}
