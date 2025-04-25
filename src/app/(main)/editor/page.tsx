import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import Layout from "@/components/layout/Layout";
import GeneratingPdfModal from "@/components/GeneratingPdfModal";
import ResumeTemplateAside from "@/components/sideBars/ResumeTemplateAside";

interface PageProps {
  searchParams: Promise<{ resumeId?: string; styleId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your Personalized Resume",
};

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return (
    <Layout>
      <ResumeEditor
        resumeToEdit={resumeToEdit}
      />
      <GeneratingPdfModal />
      <ResumeTemplateAside resumeToEdit={resumeToEdit} />
    </Layout>
  );
}
