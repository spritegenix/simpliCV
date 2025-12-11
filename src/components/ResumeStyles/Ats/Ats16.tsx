"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Link from "next/link";
import React, { useRef } from "react";
import { BiEnvelope, BiGlobe, BiPhone, BiSolidMap } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats16({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  // Classic serif styling
  const colorHex =
    resumeData.colorHex === "#000000" ? "#000000" : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-gray-900",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "space-y-5 p-12 font-serif",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header */}
        <header className="mb-6 flex flex-col items-center text-center">
          <h1
            className="mb-2 text-3xl font-extrabold tracking-wide text-gray-900"
            style={{ color: colorHex }}
          >
            {resumeData.firstName} {resumeData.lastName}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-medium text-gray-700">
            {(resumeData.city || resumeData.country) && (
              <div className="flex items-center gap-1.5">
                <BiSolidMap size={14} />
                <span>
                  {resumeData.city}
                  {resumeData.city && resumeData.country ? ", " : ""}
                  {resumeData.country}
                </span>
              </div>
            )}
            {resumeData.email && (
              <div className="flex items-center gap-1.5">
                <BiEnvelope size={14} />
                <span>{resumeData.email}</span>
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1.5">
                <BiPhone size={14} />
                <span>{resumeData.phone}</span>
              </div>
            )}
            {resumeData.portfolioLink && (
              <Link
                href={resumeData.portfolioLink}
                target="_blank"
                className="flex items-center gap-1.5 hover:text-black"
              >
                <BiGlobe size={14} />
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
                  className="flex items-center gap-1.5 hover:text-black"
                >
                  {isGithub ? (
                    <FaGithub size={14} />
                  ) : isLinkedin ? (
                    <FaLinkedin size={14} />
                  ) : (
                    <BiGlobe size={14} />
                  )}
                  <span>
                    {link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                  </span>
                </Link>
              );
            })}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
            <h3 className="mb-3 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wider">
              Summary
            </h3>
            <p className="text-justify text-sm leading-relaxed text-gray-800">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {resumeData.educations && resumeData.educations.length > 0 && (
          <section>
            <h3 className="mb-4 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-4">
              {resumeData.educations.map((edu, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-base font-bold text-gray-900">
                      {edu.school},{" "}
                      <span className="ml-1 text-sm font-normal italic text-gray-700">
                        {edu.degree}
                      </span>
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                      {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
                      {edu.endDate
                        ? ` - ${formatDate(edu.endDate, "MMM yyyy")}`
                        : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resumeData.workExperiences &&
          resumeData.workExperiences.length > 0 && (
            <section>
              <h3 className="mb-4 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wider">
                Work Experience
              </h3>
              <div className="space-y-6">
                {resumeData.workExperiences.map((exp, index) => (
                  <div key={index}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        {exp.company}
                      </h4>
                      <span className="whitespace-nowrap text-sm font-medium text-gray-600">
                        {exp.startDate && formatDate(exp.startDate, "MMM yyyy")}{" "}
                        –{" "}
                        {exp.endDate
                          ? formatDate(exp.endDate, "MMM yyyy")
                          : "Present"}
                        {exp.jobLocation && (
                          <span className="hidden sm:inline">
                            {" "}
                            | {exp.jobLocation}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <p className="font-medium italic text-gray-800">
                        {exp.position}
                      </p>
                      {/* Mobile optimization: show location here if needed, but keeping it simple for now */}
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
          )}

        {/* Skills */}
        {/* Changed title to "Technical Expertise" to match sample */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
            <h3 className="mb-3 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wider">
              Technical Expertise
            </h3>
            <div className="text-sm leading-relaxed text-gray-800">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="mb-1">
                  <span className="">{skill.skillName?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
          <section>
            <h3 className="mb-3 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wider">
              Projects
            </h3>
            <div className="space-y-4">
              {resumeData.projectWorks.map((project, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <h4 className="text-sm font-bold uppercase text-gray-900">
                      {project.title}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {project.startDate &&
                        formatDate(project.startDate, "MMM yyyy")}
                    </span>
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="mb-1 text-xs">
                      {project.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link}
                          target="_blank"
                          className="mr-2 text-blue-800 hover:underline"
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
        )}

        {/* Certifications / Awards */}
        {/* Using generic title since sample had Awards but data is Certs. Adapting. */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section>
            <h3 className="mb-3 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wider">
              Awards & Certifications
            </h3>
            <div className="space-y-2">
              {resumeData.certifications.map((cert, index) => (
                <div key={index}>
                  <h4 className="text-sm font-bold text-gray-900">
                    {cert.title}
                  </h4>
                  {cert.description && (
                    <p className="text-sm italic text-gray-700">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
