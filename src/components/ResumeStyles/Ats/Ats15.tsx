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
import { BiEnvelope, BiGlobe, BiPhone, BiSolidMap } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats15({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // The template uses a classic Serif font (looks like Georgia or Times)
  // We'll use font-serif.
  const colorHex = "var(--accent)";

  const dateFormatNumeric = getResumeDateFormat(
    resumeData.dateFormat,
    "MM/yyyy",
  );

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <section>
        <h3
          data-resume-section-heading
          className="mb-2 text-sm font-bold"
          style={{ borderColor: colorHex }}
        >
          Profile
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.summary || "",
          }}
          className="richTextEditorStyle !m-0 whitespace-pre-line text-justify text-sm leading-relaxed text-gray-800 pt-1"
        />
      </section>
    ) : null,
    workExperiences:
      resumeData.workExperiences && resumeData.workExperiences.length > 0 ? (
        <section>
          <h3
            data-resume-section-heading
            className="mb-3 text-sm font-bold"
            style={{ borderColor: colorHex }}
          >
            Professional Experience
          </h3>
          <div className="space-y-4">
            {resumeData.workExperiences.map((exp, index) => (
              <div key={index}>
                <div className="flex items-baseline justify-between">
                  <h4>
                    <span
                      data-resume-entry-title
                      className="italic text-gray-700"
                    >
                      {exp.company}
                    </span>
                    {exp.position && (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="inline"
                        className="text-base font-bold text-gray-900"
                      >
                        {exp.position}
                      </span>
                    )}
                  </h4>
                  <span className="text-sm font-medium text-gray-600">
                    {exp.startDate &&
                      safeFormatDate(exp.startDate, dateFormatNumeric)}{" "}
                    –{" "}
                    {exp.endDate
                      ? safeFormatDate(exp.endDate, dateFormatNumeric)
                      : "present"}
                  </span>
                </div>
                <div className="mb-1 flex items-baseline justify-between">
                  {exp.position ? (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="newline"
                      className="text-base font-bold text-gray-900"
                    >
                      {exp.position}
                    </span>
                  ) : (
                    <span />
                  )}
                  {exp.jobLocation && (
                    <span className="text-xs text-gray-500">
                      {exp.jobLocation}
                    </span>
                  )}
                </div>
                <div
                  className="richTextEditorStyle text-sm leading-snug text-gray-800"
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
            className="mb-3 text-sm font-bold"
            style={{ borderColor: colorHex }}
          >
            Education
          </h3>
          <div className="space-y-3">
            {resumeData.educations.map((edu, index) => (
              <div key={index}>
                <div className="flex items-baseline justify-between">
                  <h4 className="text-base font-bold text-gray-900">
                    {edu.degree}
                  </h4>
                  <span className="text-sm font-medium text-gray-600">
                    {edu.startDate && safeFormatDate(edu.startDate, "yyyy")} –{" "}
                    {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "now"}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="italic text-gray-700">{edu.school}</span>
                  {edu.location && (
                    <span className="text-xs text-gray-500">
                      {edu.location}
                    </span>
                  )}
                </div>
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
            className="mb-2 text-sm font-bold"
            style={{ borderColor: colorHex }}
          >
            Skills
          </h3>
          <div className="text-sm leading-relaxed">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="mb-1">
                <span className="font-bold text-gray-900">
                  • {skill.title}:
                </span>{" "}
                <span className="text-gray-800">
                  {skill.skillName?.join(", ")}
                </span>
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
            className="mb-3 text-sm font-bold"
            style={{ borderColor: colorHex }}
          >
            Projects
          </h3>
          <div className="space-y-3">
            {resumeData.projectWorks.map((project, index) => (
              <div key={index}>
                <div className="flex items-baseline justify-between">
                  <h4>
                    <span
                      data-resume-entry-title
                      className="font-bold text-gray-900"
                    >
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
                  <span className="text-sm text-gray-600">
                    {project.startDate &&
                      safeFormatDate(project.startDate, dateFormatNumeric)}
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
                  <div className="mb-1 text-xs">
                    {project.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link}
                        target="_blank"
                        className="mr-2 text-blue-700 hover:underline"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                )}
                <div
                  className="richTextEditorStyle text-sm text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: project.description || "",
                  }}
                />
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
            className="mb-2 text-sm font-bold"
            style={{ borderColor: colorHex }}
          >
            Awards & Certifications
          </h3>
          <ul className="list-none space-y-1 text-sm text-gray-800">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>
                <span className="font-bold">{cert.title}</span>
                {cert.description && (
                  <span className="block pl-2 italic text-gray-600">
                    {cert.description}
                  </span>
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
            className="mb-2 text-sm font-bold"
            style={{ borderColor: colorHex }}
          >
            {resumeData.others?.title || "Other"}
          </h3>
          <div
            className="richTextEditorStyle text-sm leading-snug text-gray-800"
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
      <div
        className={cn(
          "space-y-6 px-12 py-10 font-serif", // Changed to font-serif
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {/* Header */}
        <header
          className="flex flex-col items-center text-center"
          data-resume-header
        >
          <h1
            className="mb-1 font-bold text-gray-900"
            style={{
              color: colorHex,
              fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
            }}
          >
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p
              className="mb-2 italic text-gray-700"
              style={{
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {resumeData.jobTitle}
            </p>
          )}

          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-600"
            data-resume-personal-details
          >
            {(resumeData.city || resumeData.country) && (
              <div className="flex items-center gap-1">
                <BiSolidMap className="opacity-70" />
                <span>
                  {resumeData.city}
                  {resumeData.city && resumeData.country ? ", " : ""}
                  {resumeData.country}
                </span>
              </div>
            )}
            {resumeData.email && (
              <div className="flex items-center gap-1">
                <BiEnvelope className="opacity-70" />
                <span className="underline decoration-dotted">
                  {resumeData.email}
                </span>
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <BiPhone className="opacity-70" />
                <span>{resumeData.phone}</span>
              </div>
            )}
            {resumeData.portfolioLink && (
              <Link
                href={resumeData.portfolioLink}
                target="_blank"
                className="flex items-center gap-1 hover:text-gray-900"
              >
                <BiGlobe className="opacity-70" />
                <span>Portfolio</span>
              </Link>
            )}
            {resumeData.socialLinks?.map((link, index) => {
              const isGithub = link.toLowerCase().includes("github");
              const isLinkedin = link.toLowerCase().includes("linkedin");
              return (
                <Link
                  key={index}
                  href={link}
                  target="_blank"
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  {isGithub ? (
                    <FaGithub className="opacity-70" />
                  ) : isLinkedin ? (
                    <FaLinkedin className="opacity-70" />
                  ) : (
                    <BiGlobe className="opacity-70" />
                  )}
                  <span>
                    {link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                  </span>
                </Link>
              );
            })}
          </div>
        </header>

        {orderedSections.map((key) => (
          <React.Fragment key={key}>{sections[key]}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
