"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";

// Only users created on/after this timestamp are eligible for tours.
// This prevents existing SimpliCV accounts from seeing tours after rollout.
// Update this date when you re-rollout onboarding.
const TOUR_ROLLOUT_AT_MS = Date.parse("2026-02-25T00:00:00.000Z");

function getUserCreatedAtMs(user: ReturnType<typeof useUser>["user"]) {
  const createdAt = user?.createdAt as unknown;
  if (typeof createdAt === "number") return createdAt;
  if (createdAt && typeof (createdAt as Date).getTime === "function") {
    return (createdAt as Date).getTime();
  }
  return undefined;
}

/**
 * Hook to manage guided-tour state.
 *
 * Persists completion per tour key in the Clerk user's `unsafeMetadata`
 * so the tour is tied to the **account** — not the browser.
 * New users see tours once after sign-up; after completion/skip they
 * never appear again, even on a different device.
 */
export function useGuidedTour(tourKey: string) {
  const { user, isLoaded } = useUser();
  const [run, setRun] = useState(false);

  // Tour keys the user has already completed
  const toursCompleted: string[] = useMemo(
    () => (user?.unsafeMetadata?.toursCompleted as string[]) ?? [],
    [user?.unsafeMetadata],
  );

  const hasSeenTour = toursCompleted.includes(tourKey);

  const isEligibleUser = useMemo(() => {
    const createdAtMs = getUserCreatedAtMs(user);
    if (!createdAtMs) return false;
    return createdAtMs >= TOUR_ROLLOUT_AT_MS;
  }, [user]);

  useEffect(() => {
    // Only trigger for authenticated users who haven't seen the tour
    if (!isLoaded || !user || !isEligibleUser || hasSeenTour) return;

    // Small delay to let the page elements render before starting
    const timer = setTimeout(() => setRun(true), 600);
    return () => clearTimeout(timer);
  }, [isLoaded, user, isEligibleUser, hasSeenTour]);

  const completeTour = useCallback(async () => {
    setRun(false);
    if (!user || !isEligibleUser || hasSeenTour) return;

    const current =
      (user.unsafeMetadata?.toursCompleted as string[]) ?? [];

    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          toursCompleted: [...current, tourKey],
        },
      });
    } catch {
      // Silently fail — worst case the tour shows again next time
    }
  }, [user, tourKey, isEligibleUser, hasSeenTour]);

  return {
    /** Whether Joyride should be running right now */
    run,
    /** Mark tour as complete (persisted to Clerk account) */
    completeTour,
  };
}
