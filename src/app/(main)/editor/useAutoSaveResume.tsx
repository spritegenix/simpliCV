import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { saveResume } from "./actions";
import { ResumeDocument } from "@/types/resumeDocument";
import { toLegacyResumeValues } from "@/lib/resumeDocument";

export default function useAutoSaveResume(resumeData: ResumeDocument) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.content.id);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  // Track photo upload status
  const photoUploadedRef = useRef(false);
  const photoUrlRef = useRef<string | null>(null);

  // Reset error state when data changes
  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);
        const legacyToSave = structuredClone(toLegacyResumeValues(newData));

        // Check if photo is a File that needs to be uploaded
        if (legacyToSave.photo instanceof File && !photoUploadedRef.current) {
          const { uploadFileToS3 } = await import("@/lib/upload-file");
          const uploadedUrl = await uploadFileToS3(legacyToSave.photo);

          // Save the uploaded URL to our ref
          photoUrlRef.current = uploadedUrl;
          photoUploadedRef.current = true;

          // Update the newData with the URL
          legacyToSave.photo = uploadedUrl;
        } else if (legacyToSave.photo instanceof File && photoUrlRef.current) {
          // If it's a File but we already uploaded it, use the cached URL
          legacyToSave.photo = photoUrlRef.current;
        }

        // Compare only if both are strings (URLs)
        const skipPhotoUpload =
          typeof toLegacyResumeValues(lastSavedData).photo === "string" &&
          typeof legacyToSave.photo === "string" &&
          toLegacyResumeValues(lastSavedData).photo === legacyToSave.photo;

        // Server Action to save Data in DataBase
        const updatedResume = await saveResume({
          ...legacyToSave,
          // Skip sending photo if it hasn't changed
          ...(skipPhotoUpload && { photo: undefined }),
          id: resumeId,
          styleId: newData.styleId,
        }, newData.design);

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
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

    function compareData() {
      // Compare the full resume document including design
      const current = structuredClone(debouncedResumeData);
      const previous = structuredClone(lastSavedData);

      // Handle photo separately since it might be a File object
      if (current.content.photo instanceof File) {
        if (!photoUploadedRef.current) {
          // If we haven't uploaded this photo yet, then yes, we have changes
          return true;
        }

        // If we've uploaded the photo, compare everything else except the photo
        current.content.photo = null;
        previous.content.photo = null;
      }

      // Standard comparison for everything including design
      return (
        JSON.stringify(current, fileReplacer) !==
        JSON.stringify(previous, fileReplacer)
      );
    }

    // Only save if we have unsaved changes and aren't already saving
    const hasUnsavedChanges = compareData();
    if (hasUnsavedChanges && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  // Reset photo upload status when photo changes
  useEffect(() => {
    // If the photo changes to a new File, reset our upload flag
    if (
      resumeData.content.photo instanceof File &&
      resumeData.content.photo !== debouncedResumeData.content.photo
    ) {
      photoUploadedRef.current = false;
      photoUrlRef.current = null;
    }
  }, [resumeData.content.photo, debouncedResumeData.content.photo]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
  };
}
