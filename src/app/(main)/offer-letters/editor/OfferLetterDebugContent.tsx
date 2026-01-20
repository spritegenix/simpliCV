"use client";
//this is just for testing
import React from "react";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";

function formatDebugValue(value: unknown): string {
  if (value === undefined) return "<undefined>";
  if (value === null) return "<null>";
  if (typeof value === "string") return value.trim().length ? value : "<empty>";
  if (typeof value === "number")
    return Number.isFinite(value) ? String(value) : "<non-finite>";
  if (typeof value === "boolean") return value ? "true" : "false";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export default function OfferLetterDebugContent({
  document,
}: {
  document: OfferLetterDocument;
}) {
  const { content, styleId, design } = document;

  const rows: Array<[string, unknown]> = [
    ["styleId", styleId],

    ["company.name", content.company.name],
    ["company.logoUrl", content.company.logoUrl],
    ["company.hiringManagerTitle", content.company.hiringManagerTitle],
    ["company.email", content.company.email],
    ["company.phone", content.company.phone],
    ["company.website", content.company.website],
  ];

  return (
    <div className="p-[24mm] leading-relaxed">
      <section className="offer-section">
        <h1 className="text-xl font-semibold">Offer Letter Debug Template</h1>
        <p className="text-sm text-muted-foreground">
          This template prints every offer-letter field so you can verify form →
          state → preview wiring.
        </p>
      </section>

      <section className="offer-section">
        <div className="rounded-md border border-gray-200">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 text-sm">
            {rows.map(([key, value]) => (
              <React.Fragment key={key}>
                <div className="font-mono text-xs">{key}</div>
                <div className="font-mono text-xs">
                  {formatDebugValue(value)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-section">
        <h2 className="text-base font-semibold">Raw content</h2>
        <pre className="mt-2 whitespace-pre-wrap break-words rounded-md border border-gray-200 p-4 text-xs">
          {JSON.stringify(content, null, 2)}
        </pre>
      </section>

      <section className="offer-section">
        <h2 className="text-base font-semibold">Raw design</h2>
        <pre className="mt-2 whitespace-pre-wrap break-words rounded-md border border-gray-200 p-4 text-xs">
          {JSON.stringify(design ?? null, null, 2)}
        </pre>
      </section>
    </div>
  );
}
