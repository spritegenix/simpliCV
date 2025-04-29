import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { saveResume } from "./actions";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.id);
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

        // Check if photo is a File that needs to be uploaded
        if (newData.photo instanceof File && !photoUploadedRef.current) {
          const { uploadFileToS3 } = await import("@/lib/upload-file");
          const uploadedUrl = await uploadFileToS3(newData.photo);

          // Save the uploaded URL to our ref
          photoUrlRef.current = uploadedUrl;
          photoUploadedRef.current = true;

          // Update the newData with the URL
          newData.photo = uploadedUrl;
        } else if (newData.photo instanceof File && photoUrlRef.current) {
          // If it's a File but we already uploaded it, use the cached URL
          newData.photo = photoUrlRef.current;
        }

        // Compare only if both are strings (URLs)
        const skipPhotoUpload =
          typeof lastSavedData.photo === "string" &&
          typeof newData.photo === "string" &&
          lastSavedData.photo === newData.photo;

        // Server Action to save Data in DataBase
        const updatedResume = await saveResume({
          ...newData,
          // Skip sending photo if it hasn't changed
          ...(skipPhotoUpload && { photo: undefined }),
          id: resumeId,
          styleId: searchParams.get("styleId") || "1",
        });

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
      // Special case for when photo is a File
      if (debouncedResumeData.photo instanceof File) {
        if (!photoUploadedRef.current) {
          // If we haven't uploaded this photo yet, then yes, we have changes
          return true;
        }

        // If we've uploaded the photo, compare everything else except the photo
        const current = { ...debouncedResumeData, photo: null };
        const previous = { ...lastSavedData, photo: null };

        return (
          JSON.stringify(current, fileReplacer) !==
          JSON.stringify(previous, fileReplacer)
        );
      }

      // Standard comparison for everything else
      return (
        JSON.stringify(debouncedResumeData, fileReplacer) !==
        JSON.stringify(lastSavedData, fileReplacer)
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
      resumeData.photo instanceof File &&
      resumeData.photo !== debouncedResumeData.photo
    ) {
      photoUploadedRef.current = false;
      photoUrlRef.current = null;
    }
  }, [resumeData.photo, debouncedResumeData.photo]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
  };
}
