"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn, getResumeDateFormat, safeFormatDate } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";
import Link from "next/link";
import React, { useRef } from "react";
import { BiSolidMap } from "react-icons/bi";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats13({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const colorHex = "var(--accent)";

  const dateFormat = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <section>
        <h3
          data-resume-section-heading
          className="mb-2 text-sm font-bold tracking-widest text-gray-400"
          style={{ color: colorHex }}
        >
          Summary
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.summary || "",
          }}
          className="richTextEditorStyle !m-0 whitespace-pre-line pt-1 text-justify leading-relaxed text-gray-700"
        />
      </section>
    ) : null,
    workExperiences:
      resumeData.workExperiences && resumeData.workExperiences.length > 0 ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-4 pb-1 text-sm font-bold tracking-widest text-gray-400"
            style={{ color: colorHex }}
          >
            Experience
          </h3>
          <div className="space-y-5">
            {resumeData.workExperiences.map((exp, index) => (
              <div key={index}>
                <div className="mb-1 flex items-baseline justify-between">
                  <h4>
                    <span
                      data-resume-entry-title
                      className="text-lg font-bold"
                      style={{ color: colorHex }}
                    >
                      {exp.company}
                    </span>
                    {exp.position && (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="inline"
                        className="font-semibold text-gray-700"
                      >
                        {exp.position}
                      </span>
                    )}
                  </h4>
                  <span className="rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">
                    {exp.startDate && safeFormatDate(exp.startDate, dateFormat)}{" "}
                    -{" "}
                    {exp.endDate
                      ? safeFormatDate(exp.endDate, dateFormat)
                      : "present"}
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  {exp.position ? (
                    <p
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="newline"
                      className="font-semibold text-gray-700"
                    >
                      {exp.position}
                    </p>
                  ) : (
                    <span />
                  )}
                  {exp.jobLocation && (
                    <span className="text-xs text-gray-400">
                      {exp.jobLocation}
                    </span>
                  )}
                </div>
                <div
                  className="richTextEditorStyle text-sm leading-snug text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: exp.description || "",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    educations:
      resumeData.educations && resumeData.educations.length > 0 ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-4 pb-1 text-sm font-bold tracking-widest text-gray-400"
            style={{ color: colorHex }}
          >
            Education
          </h3>
          <div className="space-y-4">
            {resumeData.educations.map((edu, index) => (
              <div key={index} className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold">{edu.school}</h4>
                  <p className="text-gray-600">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">
                    {edu.startDate && safeFormatDate(edu.startDate, "yyyy")} -{" "}
                    {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "now"}
                  </p>
                  {edu.location && (
                    <p className="text-xs text-gray-400">{edu.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    projectWorks:
      resumeData.projectWorks && resumeData.projectWorks.length > 0 ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-4 pb-1 text-sm font-bold tracking-widest text-gray-400"
            style={{ color: colorHex }}
          >
            Projects
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {resumeData.projectWorks.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-100 pl-4">
                <div className="flex items-baseline justify-between">
                  <h4>
                    <span data-resume-entry-title className="font-bold">
                      {project.title}
                    </span>
                    {project.company && (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="inline"
                        className="italic"
                      >
                        {project.company}
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {project.startDate &&
                      safeFormatDate(project.startDate, dateFormat)}{" "}
                    -{" "}
                    {project.endDate
                      ? safeFormatDate(project.endDate, dateFormat)
                      : "present"}
                  </span>
                </div>
                {project.company && (
                  <div className="mb-1">
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="newline"
                      className="italic"
                    >
                      {project.company}
                    </span>
                  </div>
                )}
                {project.links && project.links.length > 0 && (
                  <div className="mb-1 text-xs text-blue-500">
                    {project.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link}
                        target="_blank"
                        className="mr-3 font-medium hover:underline"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                )}
                <div
                  className="richTextEditorStyle mt-1 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: project.description || "",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    skills:
      resumeData.skills && resumeData.skills.length > 0 ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-3 pb-1 text-sm font-bold tracking-widest text-gray-400"
            style={{ color: colorHex }}
          >
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <div
                key={index}
                className="w-full rounded bg-gray-50 px-3 py-2 text-sm sm:w-auto"
              >
                <span className="mr-2 font-bold text-gray-700">
                  {skill.title}:
                </span>
                <span className="text-gray-600">
                  {skill.skillName?.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    certifications:
      resumeData.certifications && resumeData.certifications.length > 0 ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-3 pb-1 text-sm font-bold tracking-widest text-gray-400"
            style={{ color: colorHex }}
          >
            Certifications
          </h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>
                <span className="font-semibold">{cert.title}</span>
                {cert.description && (
                  <span className="text-gray-500"> — {cert.description}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null,
    others:
      resumeData.others?.title || resumeData.others?.description ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-3 pb-1 text-sm font-bold tracking-widest text-gray-400"
            style={{ color: colorHex }}
          >
            {resumeData.others?.title || "Other"}
          </h3>
          <div
            className="richTextEditorStyle text-sm leading-snug text-gray-600"
            dangerouslySetInnerHTML={{
              __html: resumeData.others?.description || "",
            }}
          />
        </section>
      ) : null,
  };

  return (
    <div
      className={cn("aspect-[210/297] h-fit w-full bg-white", className)}
      style={{
        color: "var(--text)",
      }}
      ref={containerRef}
    >
      <style>
        {`
          #resumePreviewContent [data-resume-section-heading],
          #resumePreviewContent [data-resume-entry-title],
          #resumePreviewContent [data-resume-header] .font-extrabold,
          #resumePreviewContent [data-resume-header] .font-bold {
            font-family: var(--font-montserrat) !important;
            font-weight: 700 !important;
            font-style: normal !important;
          }

          #resumePreviewContent [data-resume-entry-subtitle],
          #resumePreviewContent [data-resume-header] .font-medium {
            font-family: var(--font-montserrat) !important;
            font-weight: 500 !important;
            font-style: normal !important;
          }
        `}
      </style>
      <div
        className={cn("space-y-5 p-10", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <header
          className="border-b-[1px] border-gray-300 pb-5"
          data-resume-header
        >
          <h1
            className="mb-1 font-extrabold uppercase tracking-tight"
            style={{
              color: colorHex,
              fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
            }}
          >
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p
              className="mb-3 font-medium text-gray-600"
              style={{
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {resumeData.jobTitle}
            </p>
          )}

          <div
            className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-gray-500"
            data-resume-personal-details
          >
            {resumeData.email && (
              <ContactLink
                href={`mailto:${resumeData.email}`}
                text={resumeData.email}
                icon="✉"
              />
            )}
            {resumeData.phone && (
              <ContactLink
                href={`tel:${resumeData.phone}`}
                text={resumeData.phone}
                icon="☏"
              />
            )}
            {(resumeData.city || resumeData.country) && (
              <span className="flex items-center gap-1">
                <BiSolidMap className="inline" />
                {resumeData.city}
                {resumeData.city && resumeData.country ? ", " : ""}
                {resumeData.country}
              </span>
            )}
            {resumeData.portfolioLink && (
              <ContactLink
                href={resumeData.portfolioLink}
                text="Portfolio"
                icon="🌐"
              />
            )}
            {resumeData.socialLinks?.map((link, index) => (
              <ContactLink
                key={index}
                href={link}
                text={link.replace(/^https?:\/\/(www\.)?/, "")}
              />
            ))}
          </div>
        </header>

        {orderedSections.map((key) => (
          <React.Fragment key={key}>{sections[key]}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ContactLink({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 transition-colors hover:text-black"
    >
      {icon && <span className="opacity-70">{icon}</span>}
      <span>{text}</span>
    </Link>
  );
}
