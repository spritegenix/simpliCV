"use client";

import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  TooltipRenderProps,
} from "react-joyride";
import { useGuidedTour } from "@/hooks/useGuidedTour";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Custom Tooltip                                                     */
/* ------------------------------------------------------------------ */

function TourTooltip({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  size,
  isLastStep,
  skipProps,
}: TooltipRenderProps) {
  return (
    <div
      {...tooltipProps}
      className="relative max-w-sm rounded-xl bg-white p-5 shadow-2xl dark:bg-zinc-900"
    >
      {/* Close button */}
      <button
        {...closeProps}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Title */}
      {step.title && (
        <h3 className="mb-1 pr-6 text-base font-semibold text-gray-900 dark:text-white">
          {step.title as string}
        </h3>
      )}

      {/* Body */}
      <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {step.content}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        {/* Step counter */}
        <span className="text-xs text-gray-400">
          {index + 1} / {size}
        </span>

        <div className="flex items-center gap-2">
          {/* Skip */}
          {!isLastStep && (
            <button
              {...skipProps}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Skip tour
            </button>
          )}

          {/* Back */}
          {index > 0 && (
            <button
              {...backProps}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              Back
            </button>
          )}

          {/* Next / Finish */}
          {continuous && (
            <button
              {...primaryProps}
              className="rounded-md bg-[#0c56db] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0946b5]"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GuidedTour Component                                               */
/* ------------------------------------------------------------------ */

interface GuidedTourProps {
  /** Unique key per page, used for Clerk metadata persistence */
  tourKey: string;
  /** Joyride step definitions */
  steps: Step[];
}

export default function GuidedTour({ tourKey, steps }: GuidedTourProps) {
  const { run, completeTour } = useGuidedTour(tourKey);

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      completeTour();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      scrollToFirstStep
      disableOverlayClose
      spotlightClicks
      callback={handleCallback}
      tooltipComponent={TourTooltip}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip tour",
      }}
      styles={{
        options: {
          zIndex: 10000,
          arrowColor: "#fff",
          overlayColor: "rgba(0, 0, 0, 0.55)",
        },
        spotlight: {
          borderRadius: 12,
        },
      }}
      floaterProps={{
        disableAnimation: false,
      }}
    />
  );
}
