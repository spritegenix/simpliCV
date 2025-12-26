import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { usePrintPdf } from "@/hooks/usePrintPdf";

const setOpenCalls: unknown[][] = [];
const toastCalls: unknown[][] = [];

mock.module("@/components/GeneratingPdfModal", () => ({
  usePdfGeneratingModalState: () => ({
    setOpen: (...args: unknown[]) => {
      setOpenCalls.push(args);
    },
  }),
}));

mock.module("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: (...args: unknown[]) => {
      toastCalls.push(args);
    },
  }),
}));

describe("usePrintPdf", () => {
  let fetchCalls: unknown[][] = [];
  let createObjectURLCalls: unknown[][] = [];
  let clickCalls = 0;

  beforeEach(() => {
    fetchCalls = [];
    createObjectURLCalls = [];
    clickCalls = 0;
    setOpenCalls.length = 0;
    toastCalls.length = 0;

    globalThis.fetch = (async (...args: unknown[]) => {
      fetchCalls.push(args);
      return {
        ok: true,
        blob: async () => new Blob(["PDF content"], { type: "application/pdf" }),
      } as any;
    }) as any;

    globalThis.URL.createObjectURL = ((...args: unknown[]) => {
      createObjectURLCalls.push(args);
      return "mock-url";
    }) as any;

    globalThis.URL.revokeObjectURL = (() => {}) as any;

    HTMLAnchorElement.prototype.click = (() => {
      clickCalls += 1;
    }) as any;
  });

  afterEach(() => {
    // no-op; state reset in beforeEach
  });

  it("should handle successful PDF generation", async () => {
    const { result } = renderHook(() => usePrintPdf());

    await act(async () => {
      await result.current.handlePrintPdf("https://simplicv.com/");
    });

    expect(setOpenCalls.some((a) => a[0] === true)).toBe(true);

    const hasGeneratePdfCall = fetchCalls.some((args) => {
      const [url, init] = args as [unknown, any];
      return (
        url === "/api/generate-pdf" &&
        init?.method === "POST" &&
        init?.headers?.["Content-Type"] === "application/json" &&
        init?.body === JSON.stringify({ url: "https://simplicv.com/" }) &&
        init?.signal
      );
    });
    expect(hasGeneratePdfCall).toBe(true);
    expect(createObjectURLCalls.length).toBe(1);
    expect(clickCalls).toBeGreaterThan(0);
    expect(setOpenCalls.some((a) => a[0] === false)).toBe(true);
  });
});
