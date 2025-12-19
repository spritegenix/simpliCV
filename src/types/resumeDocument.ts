import { ResumeValues } from "@/lib/validation";
import { ResumeDesign } from "./resumeDesign";

export type ResumeDocument = {
  content: ResumeValues;
  design: ResumeDesign;
  styleId: string;
};
