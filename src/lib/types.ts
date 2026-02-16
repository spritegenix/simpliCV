import { Prisma } from "@prisma/client";
// Trigger type update
import { ResumeDocument } from "@/types/resumeDocument";

export interface EditorFormProps {
  resumeData: ResumeDocument;
  setResumeData: (data: ResumeDocument) => void;
}

export const resumeDataInclude = {
  educations: true,
  workExperiences: true,
  projectWorks: true,
  certifications: true,
  others: true,
  skills: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
