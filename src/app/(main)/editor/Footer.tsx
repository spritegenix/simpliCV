import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  FileUser,
  FileUserIcon,
  PenLineIcon,
} from "lucide-react";
import { steps } from "./steps";
import { Link } from "next-view-transitions";
import { create } from "zustand";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  const { setOpen } = useStyleAsideState();
  return (
    <footer className="w-full border-t px-3 py-2">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="premium"
             className="!text-sm"
            onClick={() => setOpen(true)}
            title={"Change Style"}
          >
             <span className="hidden sm:inline">Change Resume Style</span>
             <FileUser className="inline sm:hidden" />
          </Button>
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            {/* Text on desktop, hidden on mobile */}
            <span className="hidden sm:inline">Previous step</span>
            {/* Icon on mobile, hidden on desktop */}
            <ChevronLeft className="inline sm:hidden" />
          </Button>

          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            <span className="hidden sm:inline">Next step</span>
            <ChevronRight className="inline sm:hidden" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100",
            )}
          >
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
}

// Zustand store
interface StyleAsideState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useStyleAsideState = create<StyleAsideState>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    console.log("Style Aside State Changed:", open);
    set({ open });
  },
}));
