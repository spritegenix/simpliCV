"use client";

import dynamic from "next/dynamic";
import { resumesDashboardTourSteps } from "@/data/tourSteps";

const GuidedTour = dynamic(() => import("@/components/GuidedTour"), {
  ssr: false,
});

export default function ResumesTour() {
  return (
    <GuidedTour tourKey="resumes-dashboard" steps={resumesDashboardTourSteps} />
  );
}
