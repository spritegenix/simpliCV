"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResumeStyle } from "@/components/ResumeStyles/Styles";
import { offerLetterStyles } from "@/components/OfferLetterStyles/OfferLetterStyles";
import TemplateCard from "./TemplateCard";
import OfferLetterTemplateCard from "./OfferLetterTemplateCard";
import dynamic from "next/dynamic";
import { templatesTourSteps } from "@/data/tourSteps";

const GuidedTour = dynamic(() => import("@/components/GuidedTour"), {
  ssr: false,
});

type TemplateType = "resume" | "offerLetter";

interface TemplatesSidebarProps {
  templates: ResumeStyle[];
  canCreate: boolean;
  isUser: boolean;
}

export default function TemplatesSidebar({
  templates,
  canCreate,
  isUser,
}: TemplatesSidebarProps) {
  const [selectedType, setSelectedType] = useState<TemplateType>("resume");

  return (
    <div className="flex gap-6">
      <GuidedTour tourKey="templates" steps={templatesTourSteps} />
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0" data-tour="templates-sidebar">
        <div className="sticky top-24 space-y-2">
          <button
            onClick={() => setSelectedType("resume")}
            className={cn(
              "w-full rounded-lg px-6 py-3 text-left text-lg font-medium transition-colors",
              selectedType === "resume"
                ? "bg-white text-gray-900"
                : "text-white hover:bg-white/10",
            )}
          >
            Resume
          </button>
          <button
            onClick={() => setSelectedType("offerLetter")}
            className={cn(
              "w-full rounded-lg px-6 py-3 text-left text-lg font-medium transition-colors",
              selectedType === "offerLetter"
                ? "bg-white text-gray-900"
                : "text-white hover:bg-white/10",
            )}
          >
            Offer Letter
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6" data-tour="templates-heading">
          <h1 className="text-3xl font-bold text-white">
            {selectedType === "resume"
              ? "Start building your resume"
              : "Start building your offer letter"}
          </h1>
          <p className="mt-2 text-white/80">
            Choose a design you like. You can customize or switch it later.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          data-tour="templates-grid"
        >
          {selectedType === "resume" &&
            templates.map((style) => (
              <TemplateCard
                key={style.id}
                style={style}
                canCreate={canCreate}
                isUser={isUser}
              />
            ))}
          {selectedType === "offerLetter" &&
            offerLetterStyles.map((style) => (
              <OfferLetterTemplateCard key={style.id} style={style} />
            ))}
        </div>
      </div>
    </div>
  );
}
