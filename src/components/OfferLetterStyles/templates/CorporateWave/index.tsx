"use client";

import React from "react";
import Image from "next/image";
import type { OfferLetterTemplateProps } from "../../types";
import {
  resolveOfferLetterTokens,
  type OfferLetterTemplateDefaults,
} from "@/lib/offer-letter/designTokens";
import { corporateWaveBg } from "@/assets/offer-letter-styles";

// ── Template-level defaults ───────────────────────────────────────────────────
// Sits between BASE_DEFAULTS and the user's live design object.
// Change these to restyle the Corporate Wave template without touching other templates.

const TEMPLATE_DEFAULTS: OfferLetterTemplateDefaults = {
  accent: "#0d47a1", // deep corporate blue
  headerText: "#0d47a1",
  bodyText: "#1f2937",
  mutedText: "#6b7280",
  fontSize: 13,
  paddingX: 22, // mm — slightly wider to clear the wave edges
  paddingY: 20, // mm
  signatureBaseHeight: 56,
  signatureScale: 1,
  dividerThickness: 2,
};

// ── Page background (rendered by the paginator at the page level) ─────────────
// This sits OUTSIDE the padded/clipped content area so it covers the full page.

export function CorporateWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <Image
        src={corporateWaveBg}
        alt=""
        fill
        sizes="100%"
        className="object-cover object-center"
        priority
      />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CorporateWave({
  document,
  includePadding = true,
}: OfferLetterTemplateProps) {
  const { content } = document;
  const t = resolveOfferLetterTokens(document.design, TEMPLATE_DEFAULTS);

  return (
    <div
      className="relative h-full w-full"
      style={{
        ...t.cssVars,
        fontFamily: t.fontFamily,
        fontSize: `${t.fontSize}px`,
        lineHeight: t.lineHeight,
        color: t.bodyText,
      }}
    >
      {/* When rendered standalone (non-paginated), include the bg inline */}
      {includePadding && <CorporateWaveBackground />}

      {/* ── Content layer ───────────────────────────────────────────── */}
      <div
        className="relative z-10 flex h-full w-full flex-col"
        style={
          includePadding
            ? {
                paddingLeft: `${t.paddingX}mm`,
                paddingRight: `${t.paddingX}mm`,
                paddingTop: `${t.paddingY}mm`,
                paddingBottom: `${t.paddingY}mm`,
              }
            : undefined
        }
      >
        {/* ── 1. Header ─────────────────────────────────────────────────── */}
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
                className="text-[15px] font-bold uppercase tracking-wide"
                style={{ color: t.accent }}
              >
                {content.company.name}
              </p>
              {content.company.website && (
                <p style={{ fontSize: "11px", color: t.mutedText }}>
                  {content.company.website}
                </p>
              )}
            </div>
          </div>

          {/* Right — phone / email / address */}
          <div
            className="text-right leading-[1.7]"
            style={{ fontSize: "11px", color: t.mutedText }}
          >
            {content.company.phone && <p>{content.company.phone}</p>}
            {content.company.email && <p>{content.company.email}</p>}
            {content.company.hiringManagerTitle && (
              <p>{content.company.hiringManagerTitle}</p>
            )}
          </div>
        </section>

        {/* ── 2. Accent divider ─────────────────────────────────────────── */}
        <div
          className="offer-section mb-5 w-full"
          style={{
            height: `${t.dividerThickness}px`,
            backgroundColor: t.accent,
            borderRadius: "9999px",
          }}
        />

        {/* ── 3. Letter title ───────────────────────────────────────────── */}
        <section className="offer-section mb-6 text-center">
          <h1
            className="font-bold uppercase tracking-widest"
            style={{ fontSize: "17px", color: t.accent }}
          >
            Job Offer Letter
          </h1>
        </section>

        {/* ── 4. To / Date row ──────────────────────────────────────────── */}
        {(content.candidate.fullName || content.date) && (
          <section className="offer-section mb-5 flex items-start justify-between gap-4">
            <div>
              {content.candidate.fullName && (
                <>
                  <p className="font-semibold">To:</p>
                  <p>{content.candidate.fullName}</p>
                  {content.candidate.address && (
                    <p
                      className="whitespace-pre-line"
                      style={{ color: t.mutedText }}
                    >
                      {content.candidate.address}
                    </p>
                  )}
                </>
              )}
            </div>
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

        {/* ── 5. Letter body ────────────────────────────────────────────── */}
        {content.body && (
          <section
            className="offer-section ProseMirror mb-6 text-justify"
            dangerouslySetInnerHTML={{ __html: content.body }}
          />
        )}

        {/* ── 6. Signature block (right-aligned) ────────────────────────── */}
        {content.closingSignature.name && (
          <section className="offer-section mt-auto flex justify-end">
            <div className="text-right">
              {(content.closingSignature.signatureUrl ||
                content.closingSignature.signatureImage?.value) && (
                <div className="mb-1 flex justify-end">
                  <img
                    src={
                      content.closingSignature.signatureUrl ??
                      content.closingSignature.signatureImage!.value
                    }
                    alt="Signature"
                    style={{
                      height: `${t.signatureHeightPx}px`,
                      maxWidth: "180px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <p className="font-bold">{content.closingSignature.name}</p>
              {content.closingSignature.title && (
                <p style={{ color: t.mutedText }}>
                  {content.closingSignature.title}
                </p>
              )}
              {content.closingSignature.companyName && (
                <p className="font-semibold" style={{ color: t.accent }}>
                  {content.closingSignature.companyName}
                </p>
              )}
              {content.closingSignature.email && (
                <p style={{ fontSize: "11px", color: t.mutedText }}>
                  {content.closingSignature.email}
                </p>
              )}
              {content.closingSignature.phone && (
                <p style={{ fontSize: "11px", color: t.mutedText }}>
                  {content.closingSignature.phone}
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
