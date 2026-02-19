"use client";

import { useEffect } from "react";

export default function DevSwUnregister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const run = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((r) => r.unregister()));

        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch {
        // best-effort cleanup only
      }
    };

    void run();
  }, []);

  return null;
}
