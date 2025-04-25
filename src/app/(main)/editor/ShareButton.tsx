import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { ResumeValues } from "@/lib/validation";
import { Share2 } from "lucide-react";
import React from "react";
import { RWebShare } from "react-web-share";

export default function ShareButton({
  resumeData,
}: {
  resumeData: ResumeValues;
}) {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/resume/${resumeData.id}?styleId=${resumeData.styleId}`;
  return (
    <RWebShare
      data={{
        title: resumeData.firstName + " " + resumeData.lastName,
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
