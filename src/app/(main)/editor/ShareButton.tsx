import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { Share2 } from "lucide-react";
import React from "react";
import { RWebShare } from "react-web-share";
import { ResumeDocument } from "@/types/resumeDocument";

export default function ShareButton({
  resumeData,
}: {
  resumeData: ResumeDocument;
}) {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/resume/${resumeData.content.id}?styleId=${resumeData.styleId}`;
  return (
    <RWebShare
      data={{
        title:
          (resumeData.content.firstName || "") +
          " " +
          (resumeData.content.lastName || ""),
        text: "Check out my resume!",
        url: url,
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <Button variant="outline" size="icon" title="Share Your Resume">
        <Share2 className="size-5" />
      </Button>
    </RWebShare>
  );
}
