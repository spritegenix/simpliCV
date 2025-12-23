import prisma from "@/lib/prisma";
import {
  getUserSubscriptionLevel,
  type SubscriptionLevel,
} from "@/lib/subscription";
import { resumeDataInclude, type ResumeServerData } from "@/lib/types";
import { safeResumeCount } from "@/lib/dbSafe";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeItem from "./ResumeItem";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { PlusSquare } from "lucide-react";
import Wrapper from "@/components/Wrappers";
import GeneratingPdfModal from "@/components/GeneratingPdfModal";
// import CreateResumeButton from "./CreateResumeButton";
// import { canCreateResume } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Your Resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let resumes: ResumeServerData[] = [];
  let totalCount = 0;
  let subscriptionLevel: SubscriptionLevel = "free";

  try {
    [resumes, totalCount, subscriptionLevel] = await Promise.all([
      prisma.resume.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: resumeDataInclude,
      }),
      safeResumeCount(userId),
      getUserSubscriptionLevel(userId),
    ]);
  } catch (error) {
    console.warn(
      "[db] Failed to load resumes page; rendering empty state. " +
        "This usually means DATABASE_URL is unreachable.",
      error,
    );
  }

  return (
    <Layout>
      <Wrapper bgColor="bg-w3 pattern3 pb-20" isTop2>
        <div className="flex justify-between">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Your Resumes</h1>
            <p>Total: {totalCount}</p>
          </div>
          <Button asChild className="flex w-fit gap-2">
            <Link href={`/templates`}>
              <PlusSquare className="size-5" />
              New Resumes
            </Link>
            {/* <CreateResumeButton canCreate={canCreateResume(subscriptionLevel, totalCount)} /> */}
          </Button>
        </div>
        <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      </Wrapper>
      <GeneratingPdfModal />
    </Layout>
  );
}
