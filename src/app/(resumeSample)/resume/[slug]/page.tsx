import React from "react";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { Metadata } from "next";
import { resumeStyles } from "@/components/ResumeStyles/Styles";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export const metadata: Metadata = {
  title: "Personalized Resume",
};

export default async function FullScreenResumePreview({
  params,
  searchParams,
}: Props) {
  const searchParam = await searchParams;
  const currentStyleId = searchParam.styleId || "pankaj-prajapat";
  const resumeId = (await params).slug;
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId },
        include: resumeDataInclude,
      })
    : null;
  const resumeData = resumeToEdit ? mapToResumeValues(resumeToEdit) : {};

  const ResumeStylePreview = resumeStyles.find(
    (style) => style.id === currentStyleId.toString(),
  )?.component;

  return (
    <>
      {ResumeStylePreview ? (
        <ResumeStylePreview
          resumeData={resumeData}
          className="w-full"
        />
      ) : (
        <div className="text-center">Incorrect URL</div>
      )}
    </>
  );
}
