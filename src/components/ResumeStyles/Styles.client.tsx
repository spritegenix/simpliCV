"use client";

import React, { ComponentType } from "react";
import { ResumeDocument } from "@/types/resumeDocument";
import { ResumeValues } from "@/lib/validation";
import { toLegacyResumeValues } from "@/lib/resumeDocument";

import {
  Ats1,
  Ats10,
  Ats12,
  Ats13,
  Ats14,
  Ats15,
  Ats16,
  Ats2,
  Ats3,
  Ats4,
  Ats5,
  Ats6,
  Ats7,
  Ats8,
  Ats9,
  Modern1,
  Modern2,
  Modern3,
  Modern4,
  Modern5,
  Modern6,
  Modern7,
  Modern8,
  Modern9,
  Stylish1,
  Stylish2,
  Stylish3,
} from "./index";

import { resumeStyles as resumeStyleMetas, ResumeStyle } from "./Styles";

interface ResumePreviewProps {
  resumeData: ResumeDocument;
  className?: string;
}

interface LegacyResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

function fontFamilyToCss(
  fontFamily: ResumeDocument["design"]["typography"]["fontFamily"],
) {
  switch (fontFamily) {
    case "serif":
      return "serif";
    case "mono":
      return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    case "inter":
    default:
      return '"Inter", sans-serif';
  }
}

function adaptLegacyTemplateComponent(
  styleId: string,
  LegacyComponent: ComponentType<LegacyResumePreviewProps>,
): ComponentType<ResumePreviewProps> {
  function Wrapped({ resumeData, className }: ResumePreviewProps) {
    const legacy = toLegacyResumeValues(resumeData);
    const isAts = styleId.startsWith("ats");

    const sharedVars = {
      "--base-font": `${resumeData.design.typography.baseFontSize}px`,
      "--text": resumeData.design.color.text,
      "--accent": resumeData.design.color.accent,
      "--section-gap": `${resumeData.design.spacing.sectionGap}px`,
      "--resume-border-style": resumeData.design.decorations.borderStyle,
    };

    const atsVars = isAts
      ? {
          "--resume-base-font-size": `${resumeData.design.typography.baseFontSize}px`,
          "--resume-font-family": fontFamilyToCss(
            resumeData.design.typography.fontFamily,
          ),
          "--resume-text-color": resumeData.design.color.text,
          "--resume-accent-color": resumeData.design.color.accent,
          "--resume-section-gap": `${resumeData.design.spacing.sectionGap}px`,
        }
      : {};

    return (
      <div
        data-resume-design-scope={isAts ? "ats" : undefined}
        style={{ ...sharedVars, ...atsVars } as React.CSSProperties}
      >
        <LegacyComponent resumeData={legacy} className={className} />
      </div>
    );
  }

  Wrapped.displayName = `AdaptedLegacyResumeTemplate(${LegacyComponent.displayName || LegacyComponent.name || "Anonymous"})`;
  return Wrapped;
}

export type ResumeStyleWithComponent = ResumeStyle & {
  component: ComponentType<ResumePreviewProps>;
};

const legacyComponentById: Record<
  string,
  ComponentType<LegacyResumePreviewProps>
> = {
  ats1: Ats1,
  ats2: Ats2,
  ats3: Ats3,
  ats4: Ats4,
  ats5: Ats5,
  ats6: Ats6,
  ats7: Ats7,
  ats8: Ats8,
  ats9: Ats9,
  ats10: Ats10,
  ats12: Ats12,
  ats13: Ats13,
  ats14: Ats14,
  ats15: Ats15,
  ats16: Ats16,

  modern1: Modern1,
  modern2: Modern2,
  modern3: Modern3,
  modern4: Modern4,
  modern5: Modern5,
  modern6: Modern6,
  modern7: Modern7,
  modern8: Modern8,
  modern9: Modern9,

  stylish1: Stylish1,
  stylish2: Stylish2,
  stylish3: Stylish3,
};

export const resumeStyles: ResumeStyleWithComponent[] = resumeStyleMetas.map(
  (style) => {
    const LegacyComponent = legacyComponentById[style.id];
    if (!LegacyComponent) {
      throw new Error(
        `Missing resume template component for styleId: ${style.id}`,
      );
    }

    return {
      ...style,
      component: adaptLegacyTemplateComponent(style.id, LegacyComponent),
    };
  },
);
