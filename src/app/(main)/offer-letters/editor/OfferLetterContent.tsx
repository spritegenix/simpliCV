"use client";

import React from "react";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";

export default function OfferLetterContent({
  document,
}: {
  document: OfferLetterDocument;
}) {
  const { content } = document;

  return (
    <div className="p-[24mm] leading-relaxed">
      <section className="offer-section">
        <h1 className="text-xl font-semibold">{content.company.name}</h1>
        {content.company.email && <p>{content.company.email}</p>}
        {content.company.phone && <p>{content.company.phone}</p>}
        {content.company.website && <p>{content.company.website}</p>}
      </section>

      <section className="offer-section">
        <p>Dear {content.candidate.fullName},</p>
      </section>

      <section className="offer-section">
        <p>
          We are pleased to offer you the position of{" "}
          <strong>{content.job.title}</strong>
          {content.job.department && (
            <> in the {content.job.department} department</>
          )}
          .
        </p>

        {content.job.workLocation && (
          <p>Work location: {content.job.workLocation}</p>
        )}
        {content.job.employmentType && (
          <p>Employment type: {content.job.employmentType}</p>
        )}
        {content.job.startDate && <p>Start date: {content.job.startDate}</p>}
        {content.job.reportingTo && (
          <p>Reporting to: {content.job.reportingTo}</p>
        )}
      </section>

      <section className="offer-section">
        <p>
          Your base salary will be{" "}
          <strong>{content.compensation.baseSalary}</strong> (
          {content.compensation.salaryFrequency}).
        </p>

        {content.compensation.benefits && (
          <p>{content.compensation.benefits}</p>
        )}
        {content.compensation.incentives && (
          <p>{content.compensation.incentives}</p>
        )}
      </section>

      {content.legality.offerValidUntil && (
        <section className="offer-section">
          <p>This offer is valid until {content.legality.offerValidUntil}.</p>
        </section>
      )}

      <section className="offer-section">
        {content.closingSignature.signOff && (
          <p>{content.closingSignature.signOff}</p>
        )}
        <p>{content.closingSignature.name}</p>
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
      </section>
    </div>
  );
}
