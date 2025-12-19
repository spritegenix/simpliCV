"use client";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { cn, mapToResumeValues } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { steps } from "./steps";
import useAutoSaveResume from "./useAutoSaveResume";
import AddContentModal from "@/components/AddContentModal";
import CustomizationPanel from "./CustomizationPanel";
import { Button } from "@/components/ui/button";
import { Settings2, FileEdit } from "lucide-react";
import ResumeTemplateAside from "@/components/sideBars/ResumeTemplateAside";
import {
  createEmptyResumeDocument,
  toResumeDocument,
} from "@/lib/resumeDocument";
import { ResumeDocument } from "@/types/resumeDocument";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  // console.log(searchParams, searchParams.get("styleId"), searchParams.get("step"));
  const [resumeData, setResumeData] = useState<ResumeDocument>(() => {
    if (!resumeToEdit) return createEmptyResumeDocument();
    return toResumeDocument(mapToResumeValues(resumeToEdit));
  });

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  // const { isSaving: isSavingP, hasUnsavedChanges: hasUnsavedChangesP } =
  //   useAutoSavePhoto(resumeData, setResumeData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;
  const currentStyleId = searchParams.get("styleId") || resumeData.styleId;

  useEffect(() => {
    if (!currentStyleId || currentStyleId === resumeData.styleId) return;
    setResumeData((prev) => ({
      ...prev,
      styleId: currentStyleId,
    }));
  }, [currentStyleId, resumeData.styleId]);

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("styleId", currentStyleId);
    newSearchParams.set("step", key);

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex h-screen grow flex-col pt-20">
      <main className="relative grow font-rubik">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto px-3 pb-5 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <div className="mb-4">
              <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
              <div className="mt-4 flex items-center gap-2 px-3">
                {!showCustomization && (
                  <AddContentModal
                    onSelectSection={setStep}
                    setResumeData={setResumeData}
                  />
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="gap-2 py-4 text-base"
                >
                  {showCustomization ? (
                    <>
                      <FileEdit className="h-4 w-4" />
                      <span className="hidden sm:inline">Editorial</span>
                    </>
                  ) : (
                    <>
                      <Settings2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Customize</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            {showCustomization ? (
              <CustomizationPanel
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            ) : (
              FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <ResumeTemplateAside
        resumeData={resumeData}
        setResumeData={setResumeData}
        isSaving={isSaving}
      />
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
