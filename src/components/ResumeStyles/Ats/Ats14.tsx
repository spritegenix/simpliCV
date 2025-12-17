"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { safeFormatDate } from "@/lib/utils";
import Link from "next/link";
import React, { useRef } from "react";
import { BiEnvelope, BiPhone, BiGlobe, BiSolidMap } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats14({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  const colorHex =
    resumeData.colorHex === "#000000" ? "#1e3a8a" : resumeData.colorHex; // Default to a deep blue if black

  // Helper to create a lighter version of the primary color for backgrounds
  // Since we can't easily manipulate hex in pure CSS variables without calc-size,
  // we'll stick to a generic light gray/blue background for the bands or try to use opacity
  // const sectionHeaderStyle = {
  //   color: "#1f2937", // Dark gray text usually looks best on light bands
  //   backgroundColor: "#f3f4f6", // tailwind gray-100
  // };

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-slate-800",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "space-y-5 p-10 font-sans",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <header className="mb-6">
          <div className="mb-3 flex items-baseline gap-4 border-b-2 border-slate-100 pb-2">
            <h1
              className="text-4xl font-extrabold tracking-tight"
              style={{ color: colorHex }}
            >
              {resumeData.firstName} {resumeData.lastName}
            </h1>
            {resumeData.jobTitle && (
              <span className="text-xl font-medium italic text-slate-600">
                {resumeData.jobTitle}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            {(resumeData.city || resumeData.country) && (
              <span className="flex items-center gap-1">
                <BiSolidMap className="text-lg" style={{ color: colorHex }} />
                <span>
                  {resumeData.city}
                  {resumeData.city && resumeData.country ? ", " : ""}
                  {resumeData.country}
                </span>
              </span>
            )}
            {resumeData.email && (
              <ContactLink
                href={`mailto:${resumeData.email}`}
                text={resumeData.email}
                icon={
                  <BiEnvelope className="text-lg" style={{ color: colorHex }} />
                }
              />
            )}
            {resumeData.phone && (
              <ContactLink
                href={`tel:${resumeData.phone}`}
                text={resumeData.phone}
                icon={
                  <BiPhone className="text-lg" style={{ color: colorHex }} />
                }
              />
            )}
            {resumeData.portfolioLink && (
              <ContactLink
                href={resumeData.portfolioLink}
                text="Portfolio"
                icon={
                  <BiGlobe className="text-lg" style={{ color: colorHex }} />
                }
              />
            )}
            {resumeData.socialLinks?.map((link, index) => (
              <ContactLink
                key={index}
                href={link}
                text={link.replace(/^https?:\/\/(www\.)?/, "")}
                icon={
                  <FaLinkedin className="text-lg" style={{ color: colorHex }} />
                }
              />
            ))}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
            <SectionHeader title="Profile" style={{ color: colorHex }} />
            <p className="whitespace-pre-line text-justify leading-relaxed text-slate-700">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.workExperiences &&
          resumeData.workExperiences.length > 0 && (
            <section>
              <SectionHeader
                title="Work Experience"
                style={{ color: colorHex }}
              />
              <div className="space-y-6">
                {resumeData.workExperiences.map((exp, index) => (
                  <div key={index}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <h4 className="text-lg font-bold text-slate-900">
                        {exp.position}
                      </h4>
                      <span className="text-sm font-medium text-slate-600">
                        {exp.startDate &&
                          safeFormatDate(exp.startDate, "MM/yyyy")}{" "}
                        –{" "}
                        {exp.endDate
                          ? safeFormatDate(exp.endDate, "MM/yyyy")
                          : "Present"}
                      </span>
                    </div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <p className="font-medium italic text-slate-700">
                        {exp.company}
                      </p>
                      {exp.jobLocation && (
                        <span className="text-sm text-slate-500">
                          {exp.jobLocation}
                        </span>
                      )}
                    </div>
                    <div
                      className="richTextEditorStyle text-sm leading-snug text-slate-700"
                      dangerouslySetInnerHTML={{
                        __html: exp.description || "",
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Education */}
        {resumeData.educations && resumeData.educations.length > 0 && (
          <section>
            <SectionHeader title="Education" style={{ color: colorHex }} />
            <div className="space-y-4">
              {resumeData.educations.map((edu, index) => (
                <div key={index}>
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-base font-bold text-slate-900">
                      {edu.degree}
                    </h4>
                    <span className="text-sm font-medium text-slate-600">
                      {edu.startDate &&
                        safeFormatDate(edu.startDate, "MM/yyyy")}{" "}
                      –{" "}
                      {edu.endDate
                        ? safeFormatDate(edu.endDate, "MM/yyyy")
                        : "Present"}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <p className="italic text-slate-700">{edu.school}</p>
                    {edu.location && (
                      <span className="text-xs text-slate-500">
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
            <SectionHeader title="Skills" style={{ color: colorHex }} />
            <div className="flex flex-col gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-baseline">
                  <span className="mr-2 text-slate-900">•</span>
                  <span className="mr-2 min-w-[120px] font-semibold text-slate-800">
                    {skill.title}:
                  </span>
                  <span className="flex-1 text-slate-600">
                    {skill.skillName?.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
          <section>
            <SectionHeader title="Projects" style={{ color: colorHex }} />
            <div className="grid grid-cols-1 gap-5">
              {resumeData.projectWorks.map((project, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <h4 className="font-bold text-slate-900">
                      {project.title}
                    </h4>
                    <span className="text-sm text-slate-600">
                      {project.startDate &&
                        safeFormatDate(project.startDate, "MM/yyyy")}{" "}
                      –{" "}
                      {project.endDate
                        ? safeFormatDate(project.endDate, "MM/yyyy")
                        : "Present"}
                    </span>
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="mb-2 flex gap-3 text-xs text-blue-600">
                      {project.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link}
                          target="_blank"
                          className="flex items-center gap-1 font-medium hover:underline"
                        >
                          <BiGlobe /> {link}
                        </Link>
                      ))}
                    </div>
                  )}
                  <div
                    className="richTextEditorStyle text-sm text-slate-700"
                    dangerouslySetInnerHTML={{
                      __html: project.description || "",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="grid grid-cols-1 gap-5">
            <section>
              <SectionHeader
                title="Certifications"
                style={{ color: colorHex }}
              />
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
                {resumeData.certifications.map((cert, index) => (
                  <li key={index}>
                    <span className="font-semibold">{cert.title}</span>
                    {cert.description && (
                      <span className="text-slate-500">
                        {" "}
                        — {cert.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  style,
}: {
  title: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="mb-4 border-b border-t border-slate-200 bg-slate-100 px-0 py-1.5 text-center">
      <h3 className="text-sm font-bold uppercase tracking-wide" style={style}>
        {title}
      </h3>
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
      {icon}
      <span>{text}</span>
    </Link>
  );
}
