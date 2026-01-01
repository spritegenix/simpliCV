import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResumeDocument } from "@/types/resumeDocument";
import {
  Award,
  Briefcase,
  Contact,
  FileText,
  FolderGit2,
  GraduationCap,
  Heart,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import SectionCard from "./SectionCard";
import { Button } from "./ui/button";

interface AddContentModalProps {
  onSelectSection: (key: string) => void;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeDocument>>;
}

const sections = [
  {
    title: "Profile",
    description:
      "Make a great first impression by presenting yourself in a few sentences.",
    icon: User,
    key: "general-info",
  },
  {
    title: "Personal Info",
    description: "Contact details and personal information.",
    icon: Contact,
    key: "personal-info",
  },
  {
    title: "Education",
    description:
      "Show off your primary education, college degrees & exchange semesters.",
    icon: GraduationCap,
    key: "education",
  },
  {
    title: "Professional Experience",
    description:
      "A place to highlight your professional experience - including internships.",
    icon: Briefcase,
    key: "work-experience",
  },
  {
    title: "Skills",
    description:
      "List your technical, managerial or soft skills in this section.",
    icon: Zap,
    key: "skills",
  },
  {
    title: "Languages",
    description:
      "You speak more than one language? Make sure to list them here.",
    icon: FileText,
    key: "languages",
  },
  {
    title: "Certificates",
    description:
      "Drivers licenses and other industry-specific certificates you have belong here.",
    icon: Award,
    key: "certification",
  },
  {
    title: "Interests",
    description:
      "Do you have interests that align with your career aspiration?",
    icon: Heart,
    key: "interests",
  },
  {
    title: "Projects",
    description:
      "Worked on a particular challenging project in the past? Mention it here.",
    icon: FolderGit2,
    key: "projects",
  },
  {
    title: "Summary",
    description: "A brief summary of your professional background.",
    icon: FileText,
    key: "summary",
  },
];

export default function AddContentModal({
  onSelectSection,
  setResumeData,
}: AddContentModalProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (key: string) => {
    onSelectSection(key);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-w3 py-4 text-base text-white hover:bg-w3"
        >
          <span className="text-lg font-bold">+</span> Add Content
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto">
        <DialogHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DialogTitle className="text-2xl font-bold">Add content</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <SectionCard
              key={section.key}
              title={section.title}
              description={section.description}
              icon={section.icon}
              onClick={() => handleSelect(section.key)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
