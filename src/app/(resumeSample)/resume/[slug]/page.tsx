import PaginatedResumePreview from "@/components/PaginatedResumePreview";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { DEFAULT_STYLE_ID, toResumeDocument } from "@/lib/resumeDocument";
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
  const currentStyleId = searchParam.styleId || DEFAULT_STYLE_ID;
  const isPrintMode = searchParam.print === "true";
  const resumeId = (await params).slug;
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId },
        include: resumeDataInclude,
      })
    : null;
  const resumeData = resumeToEdit
    ? toResumeDocument(mapToResumeValues(resumeToEdit))
    : null;

  // We don't need to find the component here, PaginatedResumePreview does it by ID
  // But we need to check if it exists to show error
  const styleExists = resumeStyles.some(
    (style) => style.id === currentStyleId.toString(),
  );

  return (
    <div
      className="flex min-h-screen w-full justify-center bg-secondary p-8"
      data-resume-preview-root
    >
      {styleExists && resumeData ? (
        <PaginatedResumePreview
          resumeData={resumeData}
          styleId={currentStyleId.toString()}
          className="max-w-3xl" // Slightly wider container for full screen
          printMode={isPrintMode}
        />
      ) : (
        <div className="text-center">Incorrect URL</div>
      )}
    </div>
  );
}
