"use client";

import dynamic from "next/dynamic";
import { offerLettersDashboardTourSteps } from "@/data/tourSteps";

const GuidedTour = dynamic(() => import("@/components/GuidedTour"), {
  ssr: false,
});

export default function OfferLettersTour() {
  return (
    <GuidedTour
      tourKey="offer-letters-dashboard"
      steps={offerLettersDashboardTourSteps}
    />
  );
}
