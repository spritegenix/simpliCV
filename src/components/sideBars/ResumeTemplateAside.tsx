"use client";
import { useStyleAsideState } from "@/app/(main)/editor/Footer";
import React, { useState } from "react";
import { Sidebar } from "./SideBar";
import {
  resumeCategories,
  ResumeCategory,
  resumeStyles,
} from "../ResumeStyles/Styles";
import { Card } from "@/app/(resumeSample)/templates/TemplateCard";
import { ResumeValues } from "@/lib/validation";
import { cn, mapToResumeValues } from "@/lib/utils";
import { ResumeServerData } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import useAutoSaveResume from "@/app/(main)/editor/useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { CircleX, Loader2 } from "lucide-react";
import TabsScroll from "../TabsScroll";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeTemplateAside({
  resumeToEdit,
}: ResumeEditorProps) {
  const { open, setOpen } = useStyleAsideState();
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );
  const [selectedCat, setSelectedCat] = useState<ResumeCategory>(
    resumeCategories[0],
  );

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  // useEffectAfterFirst(() => {
  //   if (!isSaving) {
  //     window.location.reload();
  //   }
  // }, [isSaving]);

  // useEffect(() => {
  //   console.log(isSaving, "isA");
  //   if (!isSaving) {
  //     window.location.reload();
  //   }
  // }, [isSaving]);

  useUnloadWarning(hasUnsavedChanges);
  const router = useRouter();
  const searchParams = useSearchParams();
  async function handleSelectResumeTemplate(styleId: string) {
    setResumeData({ ...resumeData, styleId });
    // Update styleId in URL without losing other query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("styleId", styleId);
    router.replace(`/editor?${params.toString()}`);
  }
  return (
    <Sidebar
      isOpen={open}
      onClose={() => setOpen(false)}
      className="bg-w3/80 p-4 md:w-[26rem]"
    >
      <button
        className="float-right text-white transition-all duration-300 hover:text-red-600"
        onClick={() => setOpen(false)}
      >
        <CircleX />
      </button>
      <h2 className="mb-4 text-center text-lg font-medium text-white">
        Change Resume Style
      </h2>
      {/* tabs  */}
      <TabsScroll
        className="my-4 gap-x-2"
        NavigationButtonClassName="bg-w3 text-white"
      >
        {resumeCategories.map((category, index) => (
          <Tabs
            key={index}
            onClick={() => setSelectedCat(category)}
            isActive={selectedCat === category}
          >
            {category}
          </Tabs>
        ))}
      </TabsScroll>
      {/* Search  */}
      {/* Templates  */}
      <div className="grid grid-cols-2 items-start gap-4 md:h-[calc(100vh-7.2rem)] overflow-y-auto">
        {resumeStyles
          .filter((style) => style.category?.includes(selectedCat))
          .map((style) => (
            <div
              key={style.id}
              className={cn(
                "relative cursor-pointer",
                style.id === resumeData.styleId &&
                  "h-min border-4 border-w1 p-1",
              )}
              onClick={() => handleSelectResumeTemplate(style.id)}
            >
              {isSaving && style.id === resumeData.styleId && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-w3/50">
                  <Loader2 className="size-5 animate-spin" />
                </div>
              )}
              <Card style={style} isOnEditPage isSaving={isSaving} />
            </div>
          ))}
      </div>
    </Sidebar>
  );
}

function Tabs({
  children,
  onClick,
  isActive,
}: {
  children: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "cursor-pointer text-nowrap rounded-lg bg-w1 p-1 px-2 text-w3",
        isActive && "border-2 border-w1 bg-w3 text-white",
      )}
    >
      {children}
    </li>
  );
}
