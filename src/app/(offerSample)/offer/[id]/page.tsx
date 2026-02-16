import prisma from "@/lib/prisma";
import { toOfferLetterDocument } from "@/lib/offer-letter/transformers";
import { notFound } from "next/navigation";
import PaginatedOfferLetterPreview from "@/app/(main)/offer-letters/editor/PaginatedOfferLetterPreview";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OfferLetterPrintPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const searchParam = await searchParams;

  const printMode = searchParam.print === "true";
  const styleId =
    typeof searchParam.styleId === "string" ? searchParam.styleId : undefined;

  const offer = await prisma.offerLetter.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      design: true,
      styleId: true,
    },
  });

  if (!offer) {
    notFound();
  }

  const baseDocument = toOfferLetterDocument({
    content: offer.content,
    design: offer.design,
    styleId: offer.styleId ?? undefined,
  });

  const document = {
    ...baseDocument,
    styleId: styleId ?? baseDocument.styleId ?? undefined,
  };

  return (
    <div
      className={
        printMode
          ? "print-mode"
          : "flex min-h-screen w-full justify-center bg-secondary p-8"
      }
      data-offer-preview-root
    >
      <PaginatedOfferLetterPreview
        document={document}
        printMode={printMode}
        className={printMode ? undefined : "max-w-3xl"}
      />
    </div>
  );
}
