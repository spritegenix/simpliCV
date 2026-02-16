"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResumeStyle } from "@/components/ResumeStyles/Styles";
import TemplateCard from "./TemplateCard";

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

  // For now, only show resume templates. Offer letter templates can be added later
  const displayTemplates = selectedType === "resume" ? templates : [];

  return (
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0">
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">
            {selectedType === "resume"
              ? "Start building your resume"
              : "Start building your offer letter"}
          </h1>
          <p className="mt-2 text-white/80">
            Choose a design you like. You can customize or switch it later.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {selectedType === "resume" &&
            displayTemplates.map((style) => (
              <TemplateCard
                key={style.id}
                style={style}
                canCreate={canCreate}
                isUser={isUser}
              />
            ))}
          {selectedType === "offerLetter" &&
            // Show empty grid items to maintain layout
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="group relative cursor-not-allowed rounded-sm border-0 text-center transition-all duration-300"
              >
                <div className="flex aspect-[650/650] items-center justify-center bg-white/5">
                  <p className="text-white/40">Coming Soon</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
