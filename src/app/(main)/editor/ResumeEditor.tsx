"use client";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { cn, mapToResumeValues } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import dynamic from "next/dynamic";
import { steps } from "./steps";
import useAutoSaveResume from "./useAutoSaveResume";
import AddContentModal from "@/components/AddContentModal";
import ImportResumeButton from "@/components/ImportResumeButton";
import CustomizationPanel from "./CustomizationPanel";
import { Button } from "@/components/ui/button";
import { Settings2, FileEdit } from "lucide-react";
import ResumeTemplateAside from "@/components/sideBars/ResumeTemplateAside";
import {
  createEmptyResumeDocument,
  toResumeDocument,
} from "@/lib/resumeDocument";
import { ResumeDocument } from "@/types/resumeDocument";

// Client-only resume preview to avoid hydration mismatch from dynamic styles
const ResumePreviewSection = dynamic(() => import("./ResumePreviewSection"), {
  ssr: false,
});

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

  const { isSaving, hasUnsavedChanges, resumeId } =
    useAutoSaveResume(resumeData);
  // const { isSaving: isSavingP, hasUnsavedChanges: hasUnsavedChangesP } =
  //   useAutoSavePhoto(resumeData, setResumeData);

  useUnloadWarning(hasUnsavedChanges);

  // Prevent body scroll - only editor panel should scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Ensure newly created resumes (including imported ones) get their DB id
  // into state, so preview/download URLs don't become /resume/undefined.
  useEffect(() => {
    if (!resumeId) return;
    if (resumeData.content.id === resumeId) return;
    setResumeData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        id: resumeId,
      },
    }));
  }, [resumeId, resumeData.content.id]);

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
    <div className="flex h-screen flex-col pt-20">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left editor panel */}
        <div
          className={cn(
            "flex w-full flex-col md:w-1/2",
            showSmResumePreview && "hidden md:flex",
          )}
        >
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-3 pb-6">
            <div className="mb-4">
              <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
              <div className="mt-4 flex items-center gap-2 px-3">
                {!showCustomization && (
                  <AddContentModal
                    onSelectSection={setStep}
                    setResumeData={setResumeData}
                  />
                )}

                <div className="ml-auto flex items-center gap-2">
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
                  {!showCustomization && (
                    <ImportResumeButton
                      setResumeData={setResumeData}
                      className="gap-2 py-4 text-base"
                    />
                  )}
                </div>
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
        </div>

        {/* Divider */}
        <div className="hidden md:block md:border-r" />

        {/* Right preview panel */}
        <ResumePreviewSection
          resumeData={resumeData}
          setResumeData={setResumeData}
          className={cn(
            "hidden md:flex md:w-1/2",
            showSmResumePreview && "flex w-full",
          )}
        />
      </div>

      {/* Fixed Footer - outside scroll */}
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />

      {/* Template Aside */}
      <ResumeTemplateAside
        resumeData={resumeData}
        setResumeData={setResumeData}
        isSaving={isSaving}
      />
    </div>
  );
}
