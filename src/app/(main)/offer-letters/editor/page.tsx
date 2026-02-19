import prisma from "@/lib/prisma";
import { toOfferLetterDocument } from "@/lib/offer-letter/transformers";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Layout from "@/components/layout/Layout";
import OfferLetterEditor from "./offerLetterEditor";

import { createOfferLetter } from "../actions";

interface PageProps {
  searchParams: Promise<{ offerId?: string; styleId?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { offerId, styleId } = await searchParams;

  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const redirectToEditor = (id: string) => {
    const base = `/offer-letters/editor?offerId=${encodeURIComponent(id)}`;
    return styleId ? `${base}&styleId=${encodeURIComponent(styleId)}` : base;
  };

  if (!offerId) {
    const id = await createOfferLetter();
    redirect(redirectToEditor(id));
  }

  const offer = await prisma.offerLetter.findUnique({
    where: { id: offerId },
    select: {
      id: true,
      userId: true,
      content: true,
      design: true,
      styleId: true,
    },
  });

  if (!offer) {
    const id = await createOfferLetter();
    redirect(redirectToEditor(id));
  }

  if (offer.userId !== userId) {
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
    <Layout>
      <OfferLetterEditor
        initialDocument={document}
        offerId={offerId}
        styleId={styleId}
      />
    </Layout>
  );
}
