import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Wrapper from "@/components/Wrappers";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { PlusSquare } from "lucide-react";
import OfferLetterItem from "@/app/(main)/offer-letters/OfferLetterItem";
import { OfferStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Your Offer Letters",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let offerLetters: Array<{
    id: string;
    status: OfferStatus;
    content: any;
    design: any;
    styleId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  let totalCount = 0;

  try {
    [offerLetters, totalCount] = await Promise.all([
      prisma.offerLetter.findMany({
        where: {
          userId,
          status: {
            not: OfferStatus.ARCHIVED,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          status: true,
          content: true,
          design: true,
          styleId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.offerLetter.count({
        where: {
          userId,
          status: {
            not: OfferStatus.ARCHIVED,
          },
        },
      }),
    ]);
  } catch (error) {
    console.warn(
      "[db] Failed to load offer letters page; rendering empty state. " +
        "This usually means DATABASE_URL is unreachable.",
      error,
    );
  }

  return (
    <Layout>
      <Wrapper
        bgColor="bg-w3 pattern3 pb-20"
        isTop2
        containerClassName="min-h-screen"
      >
        <div className="flex justify-between">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Your Offer Letters</h1>
            <p>Total: {totalCount}</p>
          </div>
          {offerLetters.length > 0 && (
            <Button asChild className="flex w-fit gap-2">
              <Link href="/offer-letters/editor">
                <PlusSquare className="size-5" />
                New Offer Letter
              </Link>
            </Button>
          )}
        </div>

        {offerLetters.length === 0 ? (
          <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm">
              <PlusSquare className="h-16 w-16 text-white" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">
              No offer letters yet
            </h2>
            <p className="mt-2 max-w-md text-white/80">
              Create your first offer letter to get started. Customize your
              content and export it in a clean, professional format.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href="/offer-letters/editor" className="gap-2">
                <PlusSquare className="h-5 w-5" />
                Create Your First Offer Letter
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex w-full grid-cols-2 flex-col gap-2 sm:grid md:grid-cols-3 lg:grid-cols-4">
            {offerLetters.map((offerLetter) => (
              <OfferLetterItem key={offerLetter.id} offerLetter={offerLetter} />
            ))}
          </div>
        )}
      </Wrapper>
    </Layout>
  );
}
