"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OfferStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { EMPTY_OFFER_LETTER_VALUES } from "@/lib/offer-letter/defaults";
import type { OfferLetterDesign } from "@/lib/offer-letter/offerLetterDesign";
import type { OfferLetterValues } from "@/lib/offer-letter/types";

export async function createOfferLetter() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const created = await prisma.offerLetter.create({
    data: {
      userId,
      status: OfferStatus.DRAFT,
      content: EMPTY_OFFER_LETTER_VALUES as any,
    },
    select: { id: true },
  });

  return created.id;
}

export async function saveOfferLetter({
  id,
  content,
  design,
  styleId,
}: {
  id: string;
  content: OfferLetterValues;
  design?: OfferLetterDesign;
  styleId?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existing = await prisma.offerLetter.findFirst({
    where: { id, userId },
    select: { id: true, status: true },
  });

  if (!existing) {
    throw new Error("Offer letter not found");
  }

  if (existing.status !== OfferStatus.DRAFT) {
    throw new Error("Cannot modify a non-draft offer letter");
  }

  await prisma.offerLetter.update({
    where: { id },
    data: {
      content: content as any,
      design: design as any,
      styleId: styleId ?? undefined,
    },
  });

  return { ok: true } as const;
}

export async function finalizeOfferLetter(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existing = await prisma.offerLetter.findFirst({
    where: { id, userId },
    select: { id: true, status: true },
  });

  if (!existing) {
    throw new Error("Offer letter not found");
  }

  // Allow finalize from DRAFT only
  if (existing.status !== OfferStatus.DRAFT) {
    throw new Error("Only drafts can be finalized");
  }

  await prisma.offerLetter.update({
    where: { id },
    data: { status: OfferStatus.FINALIZED },
  });

  return { ok: true } as const;
}

export async function deleteOfferLetter(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existing = await prisma.offerLetter.findFirst({
    where: { id, userId },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("Offer letter not found");
  }

  await prisma.offerLetter.update({
    where: { id },
    data: { status: OfferStatus.ARCHIVED },
  });

  revalidatePath("/offer-letters");

  return { ok: true } as const;
}
