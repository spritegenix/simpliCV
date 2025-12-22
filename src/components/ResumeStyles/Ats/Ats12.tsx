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

export default function Ats12({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10px]";

  const colorHex =
    resumeData.colorHex === "#000000" ? "#000000" : resumeData.colorHex;

  const dateFormat = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <section>
        <SectionTitle title="Summary" />
        <p className="whitespace-pre-line text-justify leading-relaxed">
          {resumeData.summary}
        </p>
      </section>
    ) : null,
    educations:
      resumeData.educations && resumeData.educations.length > 0 ? (
        <section>
          <SectionTitle title="Education" />
          <div className="space-y-3">
            {resumeData.educations.map((edu, index) => (
              <div key={index} className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{edu.school}</h3>
                  <p className="italic">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {edu.startDate && safeFormatDate(edu.startDate, dateFormat)}{" "}
                    -{" "}
                    {edu.endDate
                      ? safeFormatDate(edu.endDate, dateFormat)
                      : "now"}
                  </p>
                  {edu.location && (
                    <p className="text-sm text-gray-600">{edu.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    workExperiences:
      resumeData.workExperiences && resumeData.workExperiences.length > 0 ? (
        <section>
          <SectionTitle title="Work Experience" />
          <div className="space-y-4">
            {resumeData.workExperiences.map((exp, index) => (
              <div key={index}>
                <div className="mb-1 flex items-baseline justify-between">
                  <h3
                    className="text-lg font-bold uppercase"
                    style={{ color: colorHex }}
                  >
                    {exp.company}
                  </h3>
                  <span className="text-sm font-medium">
                    {exp.startDate && safeFormatDate(exp.startDate, dateFormat)}{" "}
                    -{" "}
                    {exp.endDate
                      ? safeFormatDate(exp.endDate, dateFormat)
                      : "present"}
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold italic">{exp.position}</p>
                  {exp.jobLocation && (
                    <span className="text-sm text-gray-600">
                      {exp.jobLocation}
                    </span>
                  )}
                </div>
                <div
                  className="richTextEditorStyle text-sm leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: exp.description || "",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    projectWorks:
      resumeData.projectWorks && resumeData.projectWorks.length > 0 ? (
        <section>
          <SectionTitle title="Projects" />
          {resumeData.projectWorks.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold">{project.title}</h3>
                <span className="text-sm">
                  {project.startDate &&
                    safeFormatDate(project.startDate, dateFormat)}{" "}
                  -{" "}
                  {project.endDate
                    ? safeFormatDate(project.endDate, dateFormat)
                    : "present"}
                </span>
              </div>
              {project.links && project.links.length > 0 && (
                <div className="mb-1 text-xs text-blue-600">
                  {project.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link}
                      target="_blank"
                      className="mr-2 hover:underline"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              )}
              <div
                className="richTextEditorStyle text-sm"
                dangerouslySetInnerHTML={{
                  __html: project.description || "",
                }}
              />
            </div>
          ))}
        </section>
      ) : null,
    skills:
      resumeData.skills && resumeData.skills.length > 0 ? (
        <section>
          <SectionTitle title="Skills" />
          <div className="grid grid-cols-1 gap-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex">
                <span className="w-32 shrink-0 font-bold">{skill.title}:</span>
                <span>{skill.skillName?.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    certifications:
      resumeData.certifications && resumeData.certifications.length > 0 ? (
        <section>
          <SectionTitle title="Certifications" />
          <ul className="list-inside list-disc">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>
                <span className="font-semibold">{cert.title}</span>
                {cert.description && <span> - {cert.description}</span>}
              </li>
            ))}
          </ul>
        </section>
      ) : null,
    others:
      resumeData.others?.title || resumeData.others?.description ? (
        <section>
          <SectionTitle title={resumeData.others?.title || "Other"} />
          <div
            className="richTextEditorStyle text-sm leading-snug"
            dangerouslySetInnerHTML={{
              __html: resumeData.others?.description || "",
            }}
          />
        </section>
      ) : null,
  };

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-zinc-900",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "space-y-4 p-8 font-serif",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <header className="mb-4 border-b-2 border-gray-800 pb-4 text-center">
          <h1
            className="mb-1 text-3xl font-bold uppercase tracking-wider"
            style={{ color: colorHex }}
          >
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p className="mb-2 text-lg font-medium italic text-gray-700">
              {resumeData.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
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

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 mt-4 border-b-[1px] border-black">
      <h2 className="mb-1 text-xl font-bold uppercase tracking-widest">
        {title}
      </h2>
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
    <Link href={href} className="flex items-center gap-1 hover:underline">
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </Link>
  );
}
