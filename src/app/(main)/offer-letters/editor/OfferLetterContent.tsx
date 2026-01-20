"use client";

import React from "react";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import OfferLetterDebugContent from "./OfferLetterDebugContent";

export default function OfferLetterContent({
  document,
}: {
  document: OfferLetterDocument;
}) {
  const { content } = document;

  if (document.styleId === "debug") {
    return <OfferLetterDebugContent document={document} />;
  }

  return (
    <div className="p-[24mm] leading-relaxed">
      {/* Company Header */}
      <section className="offer-section mb-6">
        {content.company.logoUrl && (
          <div className="mb-3">
            <img
              src={content.company.logoUrl}
              alt={`${content.company.name} logo`}
              className="h-10 w-auto max-w-full object-contain"
            />
          </div>
        )}
        <h1 className="text-xl font-semibold">{content.company.name}</h1>
        {content.company.hiringManagerTitle && (
          <p>{content.company.hiringManagerTitle}</p>
        )}
        {content.company.email && <p>{content.company.email}</p>}
        {content.company.phone && <p>{content.company.phone}</p>}
        {content.company.website && <p>{content.company.website}</p>}
      </section>

      {/* Date */}
      {content.date && (
        <section className="offer-section mb-6">
          <p>
            {new Date(content.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </section>
      )}

      {/* Candidate Details */}
      {content.candidate.fullName && (
        <section className="offer-section mb-6">
          <p className="font-semibold">{content.candidate.fullName}</p>
          {content.candidate.address && (
            <p className="whitespace-pre-line">{content.candidate.address}</p>
          )}
        </section>
      )}

      {/* Letter Body */}
      {content.body && (
        <section
          className="offer-section ProseMirror mb-6"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      )}

      {/* Closing & Signature */}
      {content.closingSignature.name && (
        <section className="offer-section">
          <div>
            {(content.closingSignature.signatureUrl ||
              content.closingSignature.signatureImage?.value) && (
              <div className="mb-4">
                <img
                  src={
                    content.closingSignature.signatureUrl ??
                    content.closingSignature.signatureImage!.value
                  }
                  alt="Signature"
                  className="h-12 w-auto max-w-full object-contain"
                />
              </div>
            )}
            <p className="font-semibold">{content.closingSignature.name}</p>
            {content.closingSignature.title && (
              <p>{content.closingSignature.title}</p>
            )}
            {content.closingSignature.companyName && (
              <p>{content.closingSignature.companyName}</p>
            )}
            {content.closingSignature.email && (
              <p>{content.closingSignature.email}</p>
            )}
            {content.closingSignature.phone && (
              <p>{content.closingSignature.phone}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
