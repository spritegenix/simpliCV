"use client";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { cn, mapToResumeValues } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { steps } from "./steps";
import useAutoSaveResume from "./useAutoSaveResume";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  // console.log(searchParams, searchParams.get("styleId"), searchParams.get("step"));
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(
    resumeData,
    setResumeData,
  );
  // const { isSaving: isSavingP, hasUnsavedChanges: hasUnsavedChangesP } =
  //   useAutoSavePhoto(resumeData, setResumeData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;
  const currentStyleId = searchParams.get("styleId") || "1";

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
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
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

// -------------------------------------- //
// export function useAutoSavePhoto(
//   resumeData: ResumeValues,
//   setResumeData: (data: ResumeValues) => void,
// ) {
//   const { toast } = useToast();

//   const { photo } = resumeData;

//   const [isSaving, setIsSaving] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState(resumeData);

//   const hasUnsavedChanges =
//     JSON.stringify(resumeData.photo) !== JSON.stringify(lastSavedData.photo);

//   useEffect(() => {
//     async function save() {
//       try {
//         setIsSaving(true);
//         setIsError(false);

//         let updatedPhoto = photo;

//         // 👉 Upload photo to S3 if it's a new file
//         if (photo instanceof File) {
//           const { uploadFileToS3 } = await import("@/lib/upload-file");
//           updatedPhoto = await uploadFileToS3(photo);

//           // ✅ Update resumeData with new uploaded photo URL
//           setResumeData({
//             ...resumeData,
//             photo: updatedPhoto,
//           });
//         }

//         // ✅ Save to database
//         await saveResume({
//           id: resumeData.id,
//           photo: updatedPhoto,
//         });

//         // ✅ Update last saved data
//         setLastSavedData({
//           ...resumeData,
//           photo: updatedPhoto,
//         });
//       } catch (error) {
//         setIsError(true);
//         console.error(error);
//         const { dismiss } = toast({
//           variant: "destructive",
//           description: (
//             <div className="space-y-3">
//               <p>Could not save changes.</p>
//               <Button
//                 variant="secondary"
//                 onClick={() => {
//                   dismiss();
//                   save();
//                 }}
//               >
//                 Retry
//               </Button>
//             </div>
//           ),
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     }

//     if (hasUnsavedChanges && !isSaving && !isError) {
//       save();
//     }
//   }, [photo, resumeData.photo, isSaving, isError, toast, setResumeData]);

//   return {
//     isSaving,
//     hasUnsavedChanges,
//   };
// }

/*
  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        let updatedPhoto = photo;

        // 👉 Upload photo to S3 if it's a new file
        if (photo instanceof File) {
          const { uploadFileToS3 } = await import("@/lib/upload-file");
          updatedPhoto = await uploadFileToS3(photo);

          // ✅ Update resumeData with new uploaded photo URL
          setResumeData({
            ...resumeData,
            photo: updatedPhoto,
          });
        }

        // ✅ Save to database
        await saveResume({
          id: resumeData.id,
          photo: updatedPhoto,
        });

        // ✅ Update last saved data
        setLastSavedData({
          ...resumeData,
          photo: updatedPhoto,
        });
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    if (!isSaving && !isError) {
      save();
    }
  }, [photo, resumeData.photo, isSaving, isError, toast]);
*/
