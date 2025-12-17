import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import {
  Award,
  Briefcase,
  CloudUpload,
  Contact,
  FileText,
  FolderGit2,
  GraduationCap,
  Heart,
  Loader2,
  User,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import SectionCard from "./SectionCard";
import { Button } from "./ui/button";

interface AddContentModalProps {
  onSelectSection: (key: string) => void;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
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
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSelect = (key: string) => {
    onSelectSection(key);
    setOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      const parsedData = await response.json();
      setResumeData((prev) => ({
        ...prev,
        ...parsedData,
      }));

      toast({
        title: "Resume imported successfully",
        description: "Your resume has been parsed and filled.",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error importing resume",
        description: "Something went wrong while parsing your resume.",
      });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
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
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx"
          />
          <Button
            variant="secondary"
            className="w-full gap-2 p-6 text-base sm:mr-10 sm:w-auto"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CloudUpload className="h-4 w-4" />
            )}
            Import Resume
          </Button>
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
