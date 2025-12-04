// import ResumePreview from "@/components/ResumeStyles/ResumePreview";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";
import FullScreenPreviewButton from "./FullScreenPreviewButton";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";
import { resumeStyles } from "@/components/ResumeStyles/Styles";
import { useSearchParams } from "next/navigation";
import { env } from "@/env";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const searchParams = useSearchParams();

  const currentStyleId = searchParams.get("styleId") || "1";

  const ResumeStylePreview = resumeStyles.find(
    (style) => style.id === currentStyleId,
  )?.component;
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 z-10 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
        <FullScreenPreviewButton
          href={`/resume/${resumeData.id}?&styleId=${currentStyleId}`}
        />
        <DownloadButton
          url={`${env.NEXT_PUBLIC_BASE_URL}/resume/${resumeData.id}?&styleId=${currentStyleId}`}
        />
        <ShareButton resumeData={resumeData} />
      </div>
      <div className="relative flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <p className="absolute left-0 w-24 text-nowrap border-t border-red-600 text-[10px] text-red-600 max-md:hidden md:top-[902px]">
          Next Page
        </p>
        {ResumeStylePreview ? (
          <ResumeStylePreview
            resumeData={resumeData}
            className="max-w-2xl shadow-md"
          />
        ) : (
          <div className="text-center">You need to select a resume style</div>
        )}
      </div>
    </div>
  );
}
