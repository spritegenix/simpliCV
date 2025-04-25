import { EditorFormProps } from "@/lib/types";
import EducationForm from "./forms/EducationForm";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import InterestForm from "./forms/InterestForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Your Projects",
    component: ProjectsForm,
    key: "projects",
  },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Academics", component: EducationForm, key: "education" },
  { title: "Certifications", component: CertificationsForm, key: "certification" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
  {
    title: "Interests",
    component: InterestForm,
    key: "interests",
  }
];
