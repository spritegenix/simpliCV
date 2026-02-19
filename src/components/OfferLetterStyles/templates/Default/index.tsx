"use client";

import React from "react";
import type { OfferLetterTemplateProps } from "../../types";
import {
  resolveOfferLetterTokens,
  type OfferLetterTemplateDefaults,
} from "@/lib/offer-letter/designTokens";

const TEMPLATE_DEFAULTS: OfferLetterTemplateDefaults = {
  accent: "#1a3a6b",
  fontSize: 13,
  paddingX: 20,
  paddingY: 18,
};

/**
 * OlDefault — clean, professional offer-letter layout.
 *
 * Structure (matches the reference design without the wave background):
 *   1. Two-column header  — logo + company name (left) | contact info (right)
 *   2. Accent divider
 *   3. Centred bold title — "JOB OFFER LETTER"
 *   4. Two-column row     — To / candidate (left) | date (right)
 *   5. Justified body
 *   6. Right-aligned signature block
 */
export default function OlDefault({
  document,
  includePadding = true,
}: OfferLetterTemplateProps) {
  const { content } = document;
  const t = resolveOfferLetterTokens(document.design, TEMPLATE_DEFAULTS);

  return (
    <div
      style={{
        ...t.cssVars,
        fontFamily: t.fontFamily,
        fontSize: `${t.fontSize}px`,
        lineHeight: t.lineHeight,
        color: t.bodyText,
        ...(includePadding
          ? {
              paddingLeft: `${t.paddingX}mm`,
              paddingRight: `${t.paddingX}mm`,
              paddingTop: `${t.paddingY}mm`,
              paddingBottom: `${t.paddingY}mm`,
            }
          : {}),
      }}
    >
      {/* ── 1. Header ───────────────────────────────────────────────── */}
      <section className="offer-section mb-4 flex items-start justify-between gap-4">
        {/* Left — logo + company name + website */}
        <div className="flex items-center gap-3">
          {content.company.logoUrl && (
            <img
              src={content.company.logoUrl}
              alt={`${content.company.name} logo`}
              className="h-12 w-auto max-w-[80px] object-contain"
            />
          )}
          <div>
            <p
              className="font-bold uppercase tracking-wide"
              style={{ color: t.accent, fontSize: "15px" }}
            >
              {content.company.name}
            </p>
            {content.company.website && (
              <p className="text-[11px] text-gray-500">
                {content.company.website}
              </p>
            )}
          </div>
        </div>

        {/* Right — phone / email / address */}
        <div className="text-right text-[11px] leading-[1.7] text-gray-600">
          {content.company.phone && <p>{content.company.phone}</p>}
          {content.company.email && <p>{content.company.email}</p>}
          {content.company.hiringManagerTitle && (
            <p>{content.company.hiringManagerTitle}</p>
          )}
        </div>
      </section>

      {/* ── 2. Accent divider ───────────────────────────────────────── */}
      <div
        className="offer-section mb-5 h-[2px] w-full rounded-full"
        style={{ backgroundColor: t.accent }}
      />

      {/* ── 3. Letter title ─────────────────────────────────────────── */}
      <section className="offer-section mb-6 text-center">
        <h1
          className="text-[17px] font-bold uppercase tracking-widest"
          style={{ color: t.accent }}
        >
          Job Offer Letter
        </h1>
      </section>

      {/* ── 4. To / Date row ────────────────────────────────────────── */}
      {(content.candidate.fullName || content.date) && (
        <section className="offer-section mb-5 flex items-start justify-between gap-4">
          {/* Left — recipient */}
          <div>
            {content.candidate.fullName && (
              <>
                <p className="font-semibold">To:</p>
                <p>{content.candidate.fullName}</p>
                {content.candidate.address && (
                  <p className="whitespace-pre-line text-gray-600">
                    {content.candidate.address}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Right — date */}
          {content.date && (
            <p className="shrink-0 text-right">
              {new Date(content.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </section>
      )}

      {/* ── 5. Letter body ──────────────────────────────────────────── */}
      {content.body && (
        <section
          className="offer-section ProseMirror mb-6 text-justify"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      )}

      {/* ── 6. Signature block (right-aligned) ──────────────────────── */}
      {content.closingSignature.name && (
        <section className="offer-section mt-6 flex justify-end">
          <div className="text-right">
            {/* Signature image */}
            {(content.closingSignature.signatureUrl ||
              content.closingSignature.signatureImage?.value) && (
              <div className="mb-1 flex justify-end">
                <img
                  src={
                    content.closingSignature.signatureUrl ??
                    content.closingSignature.signatureImage!.value
                  }
                  alt="Signature"
                  style={{ height: `${t.signatureHeightPx}px` }}
                  className="w-auto max-w-[180px] object-contain"
                />
              </div>
            )}
            <p className="font-bold">{content.closingSignature.name}</p>
            {content.closingSignature.title && (
              <p className="text-gray-600">{content.closingSignature.title}</p>
            )}
            {content.closingSignature.companyName && (
              <p className="font-semibold" style={{ color: t.accent }}>
                {content.closingSignature.companyName}
              </p>
            )}
            {content.closingSignature.email && (
              <p className="text-[11px] text-gray-500">
                {content.closingSignature.email}
              </p>
            )}
            {content.closingSignature.phone && (
              <p className="text-[11px] text-gray-500">
                {content.closingSignature.phone}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
