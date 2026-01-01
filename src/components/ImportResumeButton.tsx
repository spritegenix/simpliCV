"use client";

import { useRef, useState } from "react";
import { CloudUpload, Loader2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import type { ResumeDocument } from "@/types/resumeDocument";

interface ImportResumeButtonProps {
  setResumeData: React.Dispatch<React.SetStateAction<ResumeDocument>>;
  className?: string;
}

export default function ImportResumeButton({
  setResumeData,
  className,
}: ImportResumeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      // Don't let the parser overwrite system fields.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        id: _id,
        styleId: _styleId,
        design: _design,
        ...safeParsedData
      } = (parsedData ?? {}) as Record<string, unknown>;
      setResumeData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          ...safeParsedData,
        },
      }));

      toast({
        title: "Resume imported successfully",
        description: "Your resume has been parsed and filled.",
      });
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
    <>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx"
      />

      <Button
        variant="secondary"
        className={className}
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
    </>
  );
}
